<?php

require_once('lib/bones.php');
require_once('lib/custom-post-type.php');


require_once locate_template('/lib/utils.php');           // Utility functions
require_once locate_template('/lib/init.php');            // Initial theme setup and constants
// require_once locate_template('/lib/wrapper.php');         // Theme wrapper class
require_once locate_template('/lib/config.php');          // Configuration
require_once locate_template('/lib/titles.php');          // Page titles
require_once locate_template('/lib/cleanup.php');         // Cleanup
require_once locate_template('/lib/nav.php');             // Custom nav modifications
require_once locate_template('/lib/gallery.php');         // Custom [gallery] modifications
// require_once locate_template('/lib/relative-urls.php');   // Root relative URLs
require_once locate_template('/lib/widgets.php');         // Sidebars and widgets
require_once locate_template('/lib/scripts.php');         // Scripts and stylesheets
require_once locate_template('/lib/admin.php');          // Custom functions

/*
 * Profile template redirect
 */
function emdr_flush_rules() {
    global $wp_rewrite;
    $wp_rewrite->flush_rules();
}

add_action('init', 'emdr_flush_rules');

function emdr_create_rules() {
    global $wp_rewrite;
    $template_page_name = "user-profile";

    $new_rules = array(
        'therapists/(.*?)/?$' => 'index.php?pagename=profile&therapist='.$wp_rewrite->preg_index(1)
    );

    // Always add your rules to the top, to make sure your rules have priority
    $wp_rewrite->rules = $new_rules + $wp_rewrite->rules;
}

add_action('generate_rewrite_rules', 'emdr_create_rules');

//This is the solution to our infinite redirect issue

function custom_rewrite_basic() {
	//task_id=38516
    // add_rewrite_rule('^([a-z]+)\.([a-z]+)/?$', 'index.php?pagename=profile&therapist=$matches[0].$matches[1]', 'top');
    add_rewrite_rule('^([0-9]+)\-([a-z0-9]+)\.(.*?)/?$', 'index.php?pagename=profile&therapist=$matches[0]', 'top');
}
add_action('init', 'custom_rewrite_basic');
function prefix_register_query_var($public_query_vars) {

    $public_query_vars[] = "therapist";
    return $public_query_vars;
}

add_filter('query_vars', 'prefix_register_query_var');

/*
 * search Therapists
 */

function call_api_getTherapists() {
    $params = array(
        'action' => 'emdr3Therapists',
        'parameters' => $_POST['parameters']
    );

    $result = call_api($params);

    echo json_encode($result);
    exit();
}

add_action('wp_ajax_api_getTherapists', 'call_api_getTherapists');
add_action('wp_ajax_nopriv_api_getTherapists', 'call_api_getTherapists');

/*
 * get Therapist profile
 */

function call_api_getTherapist($therapist_url) {

    $params = array(
        'action' => 'emdr3Therapist',
        'therapist' => $therapist_url
    );

    $result = call_api($params);

    return $result;
}

/*
 * call api
 */

function call_api($params = array()) {
    $api_url = $_SERVER['HTTP_HOST'].'/api';

    $result = array();
    if (empty($params)) {
        $result = array("status" => "error", "errorMsg" => "No request has been sent");
    } else {
        $post = http_build_query($params);
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $api_url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
        curl_setopt($ch, CURLOPT_TIMEOUT, 5000);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        

        $result = array();
        try {
            $data = curl_exec($ch);
            //DHDEBUG, comment out the exit line to see what is actually being returned via vardumps/etc
            //exit($data);

            curl_close($ch);
            $data = json_decode($data, true);


            if (isset($data['error'])) {
                $result = array("status" => "error", "errorMsg" => $data['error']);
            } else {
                $result = array("status" => "succ", "data" => $data);
            }
        } catch (Exception $e) {
            $result = array("status" => "error", "errorMsg" => $e->getMessage());
        }
    }

    // var_dump($result);
    // die();

    return $result;
}

/*
 * CAPTCHA html
 */

function sendemail_to_Terapist() {
    if (!$_SESSION)
        session_start();

    $error = '';
    $emails_responded_business_days = '0';
    if (empty($_REQUEST['security_code']) || empty($_SESSION['6_letters_code']) || strcasecmp($_SESSION['6_letters_code'], $_REQUEST['security_code']) != 0) {
        $error = "The captcha code does not match!";
    } else {

        $terapist_url = $_REQUEST['terapist_url'];
        $api_result = call_api_getTherapist($terapist_url);

        if(empty($api_result) || empty($api_result['data'])) {
            $error = "It can't get email from friendly url";
        }
        else {
            $emails_responded_business_days = $api_result['data']['emails_responded_business_days'];
            $therapist = $api_result['data'];
            $to = $therapist['email'];
            //$subject = 'Email Request from '.$_REQUEST['contact_name'];
            $subject = 'Referral from '.$_REQUEST['contact_name'].' from EMDR Therapist Network';

            
            
            //$headers  = 'MIME-Version: 1.0' . "\r\n";
            //$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
            //$headers .= 'To: '. $therapist['firstname'].' '.$therapist['lastname'] .' <'. $therapist['email']. '>' . "\r\n";
            //$headers .= 'From: ' . $_REQUEST['contact_name'] . '<' . $_REQUEST['contact_mail1'] . '>' . "\r\n";
            //$headers .= 'Cc: ron@unseenrevolution.com' . "\r\n";
            //$headers .= 'Bcc: ron@unseenrevolution.com' . "\r\n";

            $message = '<p>'.$_REQUEST['message'].'</p>';
            $message .= '<p>' . $_REQUEST['contact_name'] . '</>';
            $message .= '<p>' . $_REQUEST['contact_mail1'] . '</p>';
            $message .= '<p>' . $_REQUEST['contact_phone'] . '</p>';
            
            //$result = wp_mail($to, $subject, nl2br($message), $headers);
            //$data = array($to, $subject, $message, $headers);

            
            $result = sendEmail($to,$subject,$message);
            
            if ($result !== true) {
                $error = "It has failed to send email, please try again";
            }
        }
    }

    if ($error == "") {
        die(json_encode(array("result" => "success", 'emails_responded_business_days' => $emails_responded_business_days)));
    } else {
        die(json_encode(array("result" => "error", "error_msg" => $error)));
    }
}

add_action('wp_ajax_sendemail_to_Terapist', 'sendemail_to_Terapist');
add_action('wp_ajax_nopriv_sendemail_to_Terapist', 'sendemail_to_Terapist');

/*
 * breadcrumb
 */
/*
function emdr_breadcrumb($before = '', $after = '') {
    global $post;

    if ($post->ID == '995' || $post->post_title == 'Profile') {
        echo $before . '<span xmlns:v="http://rdf.data-vocabulary.org/#">
			<span typeof="v:Breadcrumb"><a href="http://emdr.unseenrevolution.info" rel="v:url" property="v:title">Home</a></span>  /
			<span typeof="v:Breadcrumb"><span class="breadcrumb_last" property="v:title">Profile</span></span>
		</span>' . $after;
    } elseif (function_exists('yoast_breadcrumb')) {
        yoast_breadcrumb($before, $after);
    }
}
*/
/*
 * page title
 */
/*
function emdr_title() {
    global $post;

    if ($post->ID == '995' || $post->post_title == 'Profile') {
        echo 'Profile - EMDR Therapist Network';
    } else {
        wp_title('');
    }
}
*/

// Tuyenvv -TEST REWRITE URL FOR SEARCH PAGE

function rewriteSearchPage() {
	$key1 = substr( md5( time() . rand() ), 0, 16 );
	$key2 = substr( md5( time() . rand() ), 0, 16 );
    //url: /therapist/city-state-postalCode
    add_rewrite_rule('^therapist/(.*)/(.*)/(.*)/?', 'index.php?page_id=1923&fancy=true&route=$matches[1]&distance=$matches[2]&no_location=$matches[3]&token='.$key1, 'top');
    add_rewrite_rule('^consultants/(.*)/(.*)/(.*)/?', 'index.php?page_id=1927&fancy=true&route=$matches[1]&distance=$matches[2]&no_location=$matches[3]&search_consultant=true&token='.$key2, 'top');
}
add_action('init', 'rewriteSearchPage', 99999999, 1);

add_filter( 'query_vars', 'registerSearchPageVars', 1 );//task 28821
function registerSearchPageVars( $vars ) {
    array_push( $vars, 'fancy' );
    array_push( $vars, 'route' );
    array_push( $vars, 'no_location' );
    array_push( $vars, 'search_consultant' );
    array_push( $vars, 'distance' );
    array_push( $vars, 'token' );
    return $vars;
}

function boru_search($route,$distance,$consultant=FALSE,$token,$no_location=0)
{
    $listParam = explode('-', $route);
    $city = $listParam[0];
    $state = $listParam[1];
    $zip = $listParam[2];
    $distance = in_array($distance,array(25,50,100)) ? $distance : 25;// task  28821
    $parameters['token'] = $token;
    $parameters['search'] = $city;
    $parameters['narrow'] = '';
    $parameters['insurance'] = '';
    $parameters['othertherapy'] = '';
    $parameters['performance'] = '';
    $parameters['situation'] = '';
    $parameters['setting'] = '';
    $parameters['traumatic'] = '';
    $parameters['gender'] = '';
    $parameters['consultation_fee'] = '';
    $parameters['language'] = '';
    $parameters['practice_yrs'] = '';
    $parameters['profession'] = '';
    $parameters['distance'] = $distance;
    $parameters['consultant'] = $consultant;
    $parameters['pagenumber'] = 1;
    $parameters['rowsperpage'] = '';
    $parameters['country'] = '';
    $parameters['state'] = '';
    $parameters['city'] = '';
    $parameters['postal'] = '';
    $parameters['ages'] = '';
    $parameters['modalities'] = '';
    $parameters['population'] = '';
    $parameters['specialtiesconditions'] = '';
    $parameters['religious'] = '';
    $parameters['emdr_yrs'] = '';
    $parameters['transportation'] = 0;
    $parameters['accessible'] = 0;
    $parameters['consultation'] = 0;
    $parameters['emdr_ceu'] = 0;
    $parameters['clinical_supervision'] = 0;
    $parameters['emdr_basic_training'] = 0;
    $parameters['face'] = 0;
    $parameters['phone'] = 0;
    $parameters['email'] = 0;
    $parameters['skype'] = 0;
    $parameters['forum'] = 0;
    $parameters['trainee'] = 0;
    $parameters['individual'] = 0;
    $parameters['group'] = 0;
    $parameters['specifypopulation'] = 0;
    $parameters['emdria_cert'] = 0;
    $parameters['studygroup'] = 0;
    $parameters['non_training_oppty'] = 0;
    $parameters['no_location'] = $no_location;

    $params = array(
        'action' => 'emdr3Therapists',
        'parameters' => $parameters
    );

    $result = call_api($params);
    return $result;
}


function sendEmail($to,$subject,$body) {
    // connect to vtiger db
    $uri = 'http://' . $_SERVER['HTTP_HOST'];
    require_once('/var/www/vtiger/config.inc.php');
    require_once('/var/www/vtiger/form2mapping.php');
    $link = mysql_connect($dbconfig['db_server'], $dbconfig['db_username'], $dbconfig['db_password']);
    if (!$link) {
        die('Not connected : ' . mysql_error());
    }
    $db_selected = mysql_select_db($dbconfig['db_name'], $link);
    if (!$db_selected) {
        die ('Can\'t use foo : ' . mysql_error());
    }

    //global $adb;
    //$adb = PearDatabase::getInstance();
    //SEND MAIL
    $rs = mysql_query("SELECT * FROM `vtiger_systems` WHERE 1 LIMIT 1");
    $row = mysql_fetch_assoc($rs);
    include_once("/var/www/vtiger/modules/Emails/class.phpmailer.php");
    $mail = new PHPMailer();
    $mail->IsSMTP();
    $mail->SMTPAuth = true; // authentication enabled
//                        $mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for Gmail
    $mail->Host = $row['server'] ? $row['server'] : 'smtp.1and1.com';
    if (!empty($row['server']) && strpos($row['server'],'gmail')!==false){
            if (strpos($row['server'],'://')!==false){
                    $arrHost = explode('://',$row['server']);
                    $protocol  = $arrHost[0];
                    $host = $arrHost[1];
                    $mail->SMTPSecure = $protocol;
                    $mail->Port = 465;
                    $arrHost2 = explode(':',$host);
                    if (count($arrHost2)>2){
                            $mail->Host = $arrHost2[0];
                            $mail->Port = $arrHost2[1];
                    }
            }else{
                    $mail->SMTPSecure='ssl';
                    $mail->Port = 465;
            }
            $mail->Host = 'smtp.gmail.com';
    }
    $mail->SMTPAuth = true;
    $mail->Username = $row['server_username'] ? $row['server_username'] : 'reports@boruapps.com';
    $mail->Password = $row['server_password'] ? $row['server_password'] : 'kingboru';
    $mail->From = $row['from_email_field'] ? $row['from_email_field'] : 'reports@boruapps.com';
    //$mail->FromName = $row['from_email_field'] ? $row['from_email_field'] : 'reports@boruapps.com';
    $mail->AddAddress($to);
    //$mail->addCustomHeader("Bcc: ron@unseenrevolution.com");
    //$mail->addCustomHeader("Cc: ron@unseenrevolution.com");
    $mail->Subject = $subject;
    $mail->Body = $body;

    $mail->IsHTML(true);

    $mail_sent = $mail->Send();

    if ($mail_sent) {
        //echo "We have sent the password reset link to your  email id <b>" . $to . "</b>";
        //echo ("<script>location.href='http://ic.borugroup.com?state=login'</script>");
        return true;
    } else {
        //var_dump($mail->ErrorInfo);
        return false;
    }
}

?>
