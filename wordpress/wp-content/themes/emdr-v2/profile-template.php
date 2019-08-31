<?php
function formatPhoneNumberUSA($phone = '',$primaryPhoneEx='') {
        $phoneNumber = '';
        $phone = preg_replace('/\D/', '', $phone);

        if (strlen($phone) > 3) {
                $areaCode = substr($phone, 0, 3);
                $nextThree = substr($phone, 3, 3);
                $lastFour = substr($phone, 6, 4);
                $primaryPhone = '(' . $areaCode . ')' . $nextThree . '-' . $lastFour;
        } else {
                $primaryPhone = $phone;
        }
        $phoneNumber= $primaryPhone;

        if ($primaryPhoneEx != 0 && $primaryPhoneEx!='') {
                $primaryPhoneEx = preg_replace('/\D/', '', $primaryPhoneEx);
                if (strlen($primaryPhoneEx) > 3) {
                        $areaCode = substr($primaryPhoneEx, 0, 3);
                        $nextThree = substr($primaryPhoneEx, 3, 3);
                        $lastFour = substr($primaryPhoneEx, 6, 4);
                        $primaryPhoneEx = '(' . $areaCode . ')' . $nextThree . '-' . $lastFour;
                } else {
                        $primaryPhoneEx = $primaryPhoneEx;
                }

                $phoneNumber.= ' x ' . $primaryPhoneEx;
        }
        return $phoneNumber;
}

// Template Name: Profile
$request_uri = $_SERVER['REQUEST_URI'];
//$request_uri = str_replace('/therapists/', '', $request_uri);
$query_vars = explode('/', $request_uri);
$therapist_url = isset($query_vars[1])? trim($query_vars[1]): "";
$result = array();
$therapist = array();

if($therapist_url != '') {
  // update view count in VT
  // echo '<pre>';print_r($_SERVER);echo '</pre>';
  $contact_name = str_replace('.', '_', $therapist_url);
  /*if($_SERVER['HTTP_REFERER'] != '') {
    if(!isset($_COOKIE[$contact_name])) {
      $view_mode = 'view_count_5';
      setcookie($contact_name, 1, 2147483647);
    } elseif(isset($_SERVER['HTTP_CACHE_CONTROL'])) {
      $view_mode = 'view_count_1';
    } else {
      $view_mode = 'view_count_3';
    }
    unset($_SERVER['HTTP_REFERER']);
  } else {
    $view_mode = 'view_count_1';
  }*/
  $view_mode = 'view_count_1';
  file_get_contents(site_url().'/vtiger/updateViewCount.php?contact_name='.$therapist_url.'&view_mode='.$view_mode);

  // get data from VT
  $result = call_api_getTherapist(urldecode($therapist_url));
  //echo '<pre>';print_r($result);exit;
  if(isset($result['data']) && !empty($result['data'])) {
    $therapist = $result['data'];
  }//echo '<pre>';print_r($therapist);exit;
}

function location_icon($therapist){
	$out = '';
	if($therapist['weelChairAccessible'] == 1){
		$out .= '<img style="
    height: 15px !important;
    margin-left: 10px;
" src="'. get_bloginfo( 'template_directory', 'display' ) .'/assets/img/icn-wheelchair.png" alt="">';
	}
	if($therapist['twoBlocksFromPublicTransport'] == 1){
		$out .= '<img style="
    height: 15px !important;
    margin-left: 10px;
" src="'.get_bloginfo( 'template_directory', 'display' ).'/assets/img/icn-bus.png" alt="">';
	}
	return $out; 
}

// echo '<pre>' . var_export($therapist, true) . '</pre>'; die();

$therapist_url_arr = explode('.', $therapist_url);
$therapist_first = ucfirst($therapist_url_arr[0]);
$therapist_last = ucfirst($therapist_url_arr[1]);
$therapist_url_pretty = "$therapist_first" . ' ' . "$therapist_last";
?>

<script type="text/javascript">

  //public urls;
  var template_directory = "<?php bloginfo('template_directory'); ?>";
  var admin_ajax_url = '<?php echo admin_url( 'admin-ajax.php' ); ?>';

</script>

<?php
global $post;

$page = get_page_by_title( 'Profile' );

if ( !empty($page)) {
  $post = $page;
  setup_postdata($post);
}

get_header();
?>

<section id="profile" class="container">
  <div class="row">

    <?php if(empty($therapist)) { ?>
      <div class="alert text-center">
        <?php echo $therapist_url_pretty; ?>'s profile cannot be found or is currently disabled. <br> <a href="../../search-results/">Click here to search.<a> <br /><?php echo $result['errorMsg']; ?>
      </div>
    <?php } ?>

    <div class="col-12">
      <?php get_template_part( 'templates/snippet', 'breadcrumbs' ); ?>

      <div class="section-divider">
        <div class="section-icon"></div>
      </div>

    </div>

  </div>

  <?php if(!empty($therapist)) { ?>

    <script type="text/javascript">
      jQuery(document).ready(function($) {
        if(findFavorites('<?php echo $therapist['name']; ?>')) {
          $(".btn-favorite").addClass("favorites-active");
          $(".btn-favorite").html('<span class="icn-star favorite_result"></span> Favorite');
        }
      });
    </script>

    <header class="row profile-header">

      <div class="col-lg-2">

        <?php if($therapist['imagename']=='') { ?>
          <div class="profile-image" style="background-image: url(<?php bloginfo('template_directory'); ?>/assets/img/gfx-portal_2.png);">
            <img class="img-responsive" src="<?php bloginfo('template_directory'); ?>/assets/img/gfx-portal.png" alt="<?php echo $therapist['name']; ?>" />
          <?php } else { ?>
            <div class="profile-image" style="background-image: url(<?php bloginfo('url'); ?>/profilebuilder/img/avatar/<?php echo $therapist['imagename']; ?>);">
              <img class="img-responsive" src="<?php bloginfo('template_directory'); ?>/assets/img/gfx-portal.png" alt="<?php echo $therapist['name']; ?>" />
            <?php } ?>
          </div>
        </div>
        <?php //echo "<pre>"; print_r($therapist); die;?>
        <div class="col-lg-7">
          <h1 class="profile-name">
            <?php if(isset($therapist['title'])){
              echo $therapist['title']." ";
            }
            echo $therapist['name']." ";
            if(isset($therapist['suffix'])){
              echo $therapist['suffix']." ";
            }?>
            <?php if(isset($therapist['credentials'])){ ?>
              <small><?php echo implode(", ", $therapist['credentials']); ?></small>
            <?php }?>
            <?php if(isset($therapist['verified_all']) && $therapist['verified_all']=='1') { ?>
              <div class="verified">Verified</div>
            <?php } ?>
          </h1>
          <div style="text-align: left; margin-top: -25px;">
            <?php
                /*if(isset($therapist['profession'])){
                  echo $therapist['profession'][0] ["profession"];
                }*/
                if(isset($therapist['subheading'])) {
                  echo $therapist['subheading'];
                }
                ?>
              </div>

              <div class="table sans">
           <!-- <?php if(isset($therapist['verified']) && $therapist['verified']=='1') { ?>
              <div class="col-sm-2 cell verified-status"><div class="verified">Verified</div></div>
            <?php } ?>
            <?php if(isset($therapist['occupation']) && $therapist['occupation']!='') { ?>
              <div class="col-sm-3 cell occupation"><small>Occupation:</small> <?php echo $therapist['occupation']; ?></div>
              <?php } ?> -->
              <?php if(isset($therapist['practiceLength']) && $therapist['practiceLength']!='') { ?>
                <div class="col-sm-2 cell practice"><small>In Practice For:</small> <?php echo date('Y') - intval($therapist['practiceLength']); ?> Years</div>
              <?php } ?>
              <?php if(isset($therapist['usingEMDR']) && $therapist['usingEMDR']!='') { ?>
                <div class="col-sm-2 cell using-emdr"><small>Using EMDR for:</small> <?php echo $therapist['usingEMDR']; ?> Years</div>
              <?php } ?>
              <?php if(isset($therapist['gender']) && $therapist['gender']!='') { ?>
                <div class="col-sm-2 cell occupation"><small>Gender:</small> <?php if(strtolower(substr($therapist['gender'],0,1)) == "m") {echo "Male";}else{echo "Female";}  ?></div>
              <?php } ?>
              <div class="col-sm-3 cell cell-social">
                <div class="social-btns btn-group">

                  <a <?php if($therapist['websiteurl']){ ?>id="website-popup-link"  <?php } else { ?>style="opacity: 0.2" <?php } ?> href="javascript: void(0)" onclick="javascript:visitWebsite('<?php echo $therapist_url; ?>','<?php echo $therapist['websiteurl']; ?>');" class="btn btn-default"><span class="icn-website text-hide">On Website</span></a>



                  <?php if(isset($therapist['socials']) && $therapist['socials']!='') {

                    $array_social = $array_social_name = array();

                    foreach($therapist['socials'] as $socials){
                      $array_social[] = $socials['accountName'];
                      $array_social_name[$socials['accountName']] =trim($socials['accountID'] );
                    }

                    ?>

                  <?php }
                  if( in_array('twitter' , $array_social)){ ?>
                    <a target="_blank" href="https://www.twitter.com/<?=$array_social_name['twitter']?>" class="btn btn-default"><span class="icn-twitter text-hide">On Twitter</span></a>
                  <?php }
                  else {
                    ?><a class="grey btn btn-default"><span class="icn-twitter text-hide">On Twitter</span></a><?php
                  }
                  if(  in_array('facebook' , $array_social) ){  ?>
                    <a target="_blank" href="https://www.facebook.com/<?=$array_social_name['facebook']?>" class="btn btn-default"><span class="icn-facebook grey text-hide">On Facebook</span></a>
                  <?php }
                  else {
                    ?><a class="grey btn btn-default"><span class="icn-facebook text-hide">On Facebook</span></a><?php
                  }
                  if(  in_array('linkedin' , $array_social)  ){?>
                    <a target="_blank" href="https://www.linkedin.com/in/<?=$array_social_name['linkedin']?>" class="btn btn-default"><span class="icn-linkedin grey text-hide">On LinkedIn</span></a>
                  <?php }
                  else {
                    ?><a class="grey btn btn-default"><span class="icn-linkedin text-hide">On LinkedIn</span></a><?php
                  }

                  ?>
              <!--  <a target="_blank"  class="btn btn-default"><span class="icn-google text-hide">On Google+</span></a>
                <a  class="btn btn-default"><span class="icn-blog text-hide">EMDR Blog</span></a> -->
              </div>
            </div>
          </div>
        </div><!-- .col-sm-7 -->

        <div class="col-lg-2 col-offset-1 btn-group-contact">

          <?php if(isset($therapist['primaryPhone']) && $therapist['primaryPhone']!='') { ?>
            <?php 
            if (strlen($therapist['primaryPhone']) > 3) {
              $areaCode = substr($therapist['primaryPhone'], 0, 3);
              $nextThree = substr($therapist['primaryPhone'], 3, 3);
              $lastFour = substr($therapist['primaryPhone'], 6, 4);
              $primaryPhone = '(' . $areaCode . ')' . $nextThree . '-' . $lastFour;
            } else {
              $primaryPhone  = $therapist['primaryPhone'];
            }       
            ?>

            <a href="javascript:void(0)" class="btn btn-primary btn-block btn-small website-link">Call Me <br> <?php  echo $primaryPhone; ?></a>
          <?php } ?>


          <?php if(isset($therapist['email']) && $therapist['email']!='' && isset($therapist['credentials'])) {
            $therapist_title = $therapist['name']. ', '. implode(", ", $therapist['credentials']);
            ?>
            <a href="javascript:void(0)" class="btn btn-primary btn-block btn-small email-link" onclick="javascript:sendEmailModal('<?php echo $therapist_url; ?>','<?php echo $therapist['name']; ?>','<?php echo $therapist_title; ?>');">Email Me</a>
          <?php } ?>
          
          <a href="javascript:void(0)" class="btn btn-primary btn-block btn-small hidden-sm btn-favorite" data-toggle="button" onclick="javascript:toggleFavorite('<?php echo $therapist['name']; ?>', this, true);">Add to Favorites</a>
        </div>

        <hr class="col-12"/>

      </header><!-- .row -->

      <div class="row">
        <div class="profile-sidebar col-lg-3" role="complementary">
          <div class="well">
            <section>

             <div class="sidebar-name-soc">
              <span class="specialist-name">
                <?php
                echo $therapist['name']." ";
                ?>
              </span>
               <!--  <div class="social-btns btn-group">
            <?php if(isset($therapist['socials']) && $therapist['socials']!='') {

              $array_social = $array_social_name = array();

                    foreach($therapist['socials'] as $socials){
                        $array_social[] = $socials['accountName'];
                        $array_social_name[$socials['accountName']] =trim($socials['accountID'] );
                    }


                ?>

            <?php }

if( in_array('twitter' , $array_social)){ ?>
                    <a target="_blank" href="https://www.twitter.com/<?=$array_social_name['twitter']?>" class="btn btn-default"><span class="icn-twitter text-hide">On Twitter</span></a>
                <?php }
                else {
                  ?><a class="grey btn btn-default"><span class="icn-twitter text-hide">On Twitter</span></a><?php
                                        }
                if(  in_array('facebook' , $array_social) ){  ?>
                    <a target="_blank" href="https://www.facebook.com/<?=$array_social_name['facebook']?>" class="btn btn-default"><span class="icn-facebook grey text-hide">On Facebook</span></a>
                <?php }
                else {
                  ?><a class="grey btn btn-default"><span class="icn-facebook text-hide">On Facebook</span></a><?php
                                        }
                if(  in_array('linkedin' , $array_social)  ){?>
                    <a target="_blank" href="https://www.linkedin.com/in/<?=$array_social_name['linkedin']?>" class="btn btn-default"><span class="icn-linkedin grey text-hide">On LinkedIn</span></a>
                <?php }
                else {
                  ?><a class="grey btn btn-default"><span class="icn-linkedin text-hide">On LinkedIn</span></a><?php
                }

            ?>
          </div> -->


        </div>


        <h3 class="business-name"><?php echo $therapist['businessName']; ?></h3>
        <div class="row">
          <p class="col-6 col-lg-12 phone-fax">

            <?php if($therapist['primaryPhone'] != '') { //task_id=29571 ?>
              <span class="small-title" style="margin-right: 0px;">Phone:</span> <a href="tel:<?php echo $therapist['primaryPhone']; 
              if($therapist['primaryPhoneEx'] != 0){ echo ' x '.$therapist['primaryPhoneEx']; }?>"><?php 
              $therapist['primaryPhone'] = preg_replace('/\D/', '', $therapist['primaryPhone']); 

              if (strlen($therapist['primaryPhone']) > 3) {
                $areaCode = substr($therapist['primaryPhone'], 0, 3);
                $nextThree = substr($therapist['primaryPhone'], 3, 3);
                $lastFour = substr($therapist['primaryPhone'], 6, 4);
                $primaryPhone = '(' . $areaCode . ')' . $nextThree . '-' . $lastFour;
              } else {
                $primaryPhone  = $therapist['primaryPhone'];
              }
              echo $primaryPhone; 

              if($therapist['primaryPhoneEx'] != 0){ 
                $therapist['primaryPhoneEx'] = preg_replace('/\D/', '', $therapist['primaryPhoneEx']);
                if (strlen($therapist['primaryPhoneEx']) > 3) {
                  $areaCode = substr($therapist['primaryPhoneEx'], 0, 3);
                  $nextThree = substr($therapist['primaryPhoneEx'], 3, 3);
                  $lastFour = substr($therapist['primaryPhoneEx'], 6, 4);
                  $primaryPhoneEx = '(' . $areaCode . ')' . $nextThree . '-' . $lastFour;
                } else {
                  $primaryPhoneEx  = $therapist['primaryPhoneEx'];
                }

                echo ' x '.$primaryPhoneEx; }?></a><br />
              <?php } ?>
              <?php if($therapist['primaryFax'] != '') { ?>
                <span class="small-title" style="margin-right: 0px;">Fax:</span> <a href="tel: <?php echo $therapist['primaryFax']; ?>">
                  <?php 
                  $therapist['primaryFax'] = preg_replace('/\D/', '', $therapist['primaryFax']);
                  if (strlen($therapist['primaryFax']) > 3) {
                    $areaCode = substr($therapist['primaryFax'], 0, 3);
                    $nextThree = substr($therapist['primaryFax'], 3, 3);
                    $lastFour = substr($therapist['primaryFax'], 6, 4);
                    $primaryFax = '(' . $areaCode . ')' . $nextThree . '-' . $lastFour;
                  } else {
                    $primaryFax  = $therapist['primaryFax'];
                  }

                  echo $primaryFax; ?></a>
                <?php } ?>
              </p>
              <p class="col-6 col-lg-12 address">

                <?php if(!empty($therapist['Settings'])): ?>
                 <span class="small-title">Deliver/Settings:</span>
                 <br/>
                 <?php foreach($therapist['Settings'] as $row_item) { ?>
                  <?php echo $row_item; ?><br/>
                <?php } ?> 
                <br/>
              <?php endif; ?> 

              <?php

              $full_address = $therapist['mailingstreet']." ".$therapist['mailingcity']." ".$therapist['mailingstate']." ".$therapist['mailingzip'];

              $full_address2 = '';
              $full_address3 = '';
              $full_address4 = '';
              $full_address5 = '';

              if(!empty($therapist['company_name_dba']) || !empty($therapist['companyname2']) ||!empty($therapist['companyname3'])||!empty($therapist['companyname4'])||!empty($therapist['companyname5'])) {
                ?>
                <span class="small-title">Locations:</span>
                <br> 
                <br>
                <?php 
                if($therapist['company_name_dba'] != ''){
                  echo "<b>".$therapist['company_name_dba']."</b>".location_icon($therapist)."<br/>";  
                }
                else if($therapist['primaryAddress2'][0]['businessName'] != ''){
                 echo "<b>".$therapist['primaryAddress2'][0]['businessName']."</b><br/>";
               } 
               if($therapist['mailingstreet']){
                 echo stripslashes($therapist['mailingstreet'] ) ."<br/>";
               }
               if(!empty($therapist['mailingpobox'])) {
                echo $therapist['mailingpobox']."<br/>";
              }
              if($therapist['mailingcity'] || $therapist['mailingstate'] || $therapist['mailingzip']){
                echo $therapist['mailingcity'] . ' ' . $therapist['mailingstate'] . ' ' . $therapist['mailingzip'] . "<br/>";
              }
              if($therapist['phone']){
               echo '<span class="small-title" style="margin-right: 0px;">Phone:</span> <a href="tel:'.$therapist['phone'].'"> '.formatPhoneNumberUSA($therapist['phone']).'</a></span><br/>';
             }
             if($therapist['fax']){
              echo '<span class="small-title" style="margin-right: 0px;">FAX:</span> <a href="tel:'.$therapist['fax'].'"> '.formatPhoneNumberUSA($therapist['fax']).'</a></span><br/>';
            }
            }
            ?>
          </p>
            <?php if($full_address != '') { ?>
	<!--  <div class="col-6 col-lg-12 address"><a href="javascript: void(0)" class="show-hide-map" id="show-hide-map"></a></div> &nbsp; -->
          <div class=" col-6 col-lg-12 visible-lg displayShow" id="first-map"> 
            <div class="flex-video map" style="
    margin-top: 0;
">                 <iframe class="" width="200" height="115" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?f=q&source=s_q&hl=en&geocode=&q=<?php echo urlencode($full_address); ?>&hnear=<?php echo urlencode($full_address); ?>&ie=UTF8&hq=&t=m&z=14&iwloc=A&output=embed"></iframe>
             
            </div>  
            </div>   
             <?php } ?>  
          <p class="col-6 col-lg-12 address" style=" margin-top: 10px;   margin-bottom: 0px;">
          <?php 
           
           if(isset($therapist['primaryAddress2'])  && !empty($therapist['primaryAddress2']) ){
           	foreach($therapist['primaryAddress2'] as $address){
           		 
           			$full_address2 = $therapist['office2addressline1']." ".$therapist['city2']." ".$therapist['stateOrProvince2']." ".$therapist['zip2'];
           			if($therapist["companyname2"]){
           				echo '<b>'.$therapist["companyname2"]."</b>".location_icon($address)."<br/>";
           			}
           			if($address['officeAddressLine1Show']){
           				echo stripslashes($address['officeAddressLine1Show'])."<br/>";
           			}
           			if($address['officeAddressLine2Show']){
           				echo stripslashes($address['officeAddressLine2Show']) . "<br/>";
           			}
           	
           			if($address['mailingcity'] && $address['mailingzip'] && $address['mailingstate']){
           				echo $address['mailingcity'] . ' ' . $address['mailingstate'] . ' ' . $address['mailingzip'] . "<br/>";
           			}
           			if($address['city'] && $address['stateOrProvince'] && $address['zip']){
           				echo $address['city']." ".$address['stateOrProvince']." ".$address['zip']. "<br/>";
           			}
           	
           			if($address['mailingzip']){
           				echo $address['mailingzip']."<br/>";
           			}
           			if($therapist['officephone2']){
           				echo '<span class="small-title" style="margin-right: 0px;">Phone:</span> <a href="tel:'.$therapist['officephone2'].'"> '.formatPhoneNumberUSA($therapist['officephone2']).'</a></span><br/>';
           			}
           			if($therapist['fax2']){
           				echo '<span class="small-title" style="margin-right: 0px;">FAX:</span style="margin-right: 0px;"> <a href="tel:'.$therapist['fax2'].'"> '.formatPhoneNumberUSA($therapist['fax2']).'</a></span><br/>';
           			}
           		 
           	}
           }
          
        ?>
        </p>
         <?php if($full_address2 != '') { ?>
	  <div class="col-6 col-lg-12 address"><a href="javascript: void(0)" class ="show-hide-map" id="show-hide-map"></a></div> 
          <div class=" col-6 col-lg-12 visible-lg displayNone"  id="second-map"> 
            <div class="flex-video map">
             
                <iframe class="" width="200" height="115" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?f=q&source=s_q&hl=en&geocode=&q=<?php echo urlencode($full_address2); ?>&hnear=<?php echo urlencode($full_address2); ?>&ie=UTF8&hq=&t=m&z=14&iwloc=A&output=embed"></iframe>
             
            </div>  
            </div>   
             <?php } ?>   
          <p class="col-6 col-lg-12 address" style=" margin-top: 10px;   margin-bottom: 0px;">
        <?php 
        // Address3
        if(isset($therapist['primaryAddress3'])  && !empty($therapist['primaryAddress3']) ){
          $full_address3 = $therapist['office3addressline1']." ".$therapist['city3']." ".$therapist['stateOrProvince3']." ".$therapist['zip3'];
          foreach($therapist['primaryAddress3'] as $address){
        
             echo '<b>'.$therapist["companyname3"]."</b>".location_icon($address)."<br/>";
           
            if($address['officeAddressLine1']){
             echo stripslashes($address['officeAddressLine1'])."<br/>";
           }
	  if(!empty(trim($address['officeAddressLine2']))){
            echo stripslashes($address['officeAddressLine2']) . "<br/>";
          }
           if($address['mailingcity'] && $address['mailingzip'] && $address['mailingstate']){
            echo $address['mailingcity'] . ' ' . $address['mailingstate'] . ' ' . $address['mailingzip'] . "<br/>";
          }

          if($address['city'] && $address['stateOrProvince'] && $address['zip']){
            echo $address['city']." ".$address['stateOrProvince']." ".$address['zip']. "<br/>";
          }

          if($address['mailingzip']){
            echo $address['mailingzip']."<br/>";
          }

          if($therapist['officephone3']){
              echo '<span class="small-title" style="margin-right: 0px;">Phone:</span> <a href="tel:'.$therapist['officephone3'].'"> '.formatPhoneNumberUSA($therapist['officephone3']).'</a></span><br/>';
                }
          if($therapist['fax3']){
             echo '<span class="small-title" style="margin-right: 0px;">FAX:</span> <a href="tel:'.$therapist['fax3'].'"> '.formatPhoneNumberUSA($therapist['fax3']).'</a></span><br/>';
                }      
        }  
      } 
      ?>
      </p>
  <?php if($full_address3 != '' ) { ?>
    <div class="col-6 col-lg-12 address"><a href="javascript: void(0)" class="show-hide-map" id="show-hide-map"></a></div> 
    <div class=" col-6 col-lg-12 visible-lg displayNone" id="third-map"> 
  <div class="flex-video map">
      <iframe class="" width="200" height="115" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?f=q&source=s_q&hl=en&geocode=&q=<?php echo urlencode($full_address3); ?>&hnear=<?php echo urlencode($full_address3); ?>&ie=UTF8&hq=&t=m&z=14&iwloc=A&output=embed"></iframe>
  </div>
</div>
  <?php } ?>      
          <p class="col-6 col-lg-12 address" style=" margin-top: 10px;   margin-bottom: 0px;">
      <?php 
            // end  Address3     

              // Address4
      if(isset($therapist['primaryAddress4']) && !empty($therapist['primaryAddress4']) ){
         $full_address4 = $therapist['office4addressline1']." ".$therapist['city4']." ".$therapist['stateOrProvince4']." ".$therapist['zip4'];

        foreach($therapist['primaryAddress4'] as $address){

        echo '<b>'.$therapist["companyname4"]."</b>".location_icon($address)."<br/>";
         
        if($address['officeAddressLine1']){
           echo stripslashes($address['officeAddressLine1'])."<br/>";
         }
	if($address['officeAddressLine2']){
          echo stripslashes($address['officeAddressLine2']) . "<br/>";
        }
         if($address['mailingcity'] && $address['mailingzip'] && $address['mailingstate']){
          echo $address['mailingcity'] . ' ' . $address['mailingstate'] . ' ' . $address['mailingzip'] . "<br/>";
        }
        if($address['city'] && $address['stateOrProvince'] && $address['zip']){
          echo $address['city']." ".$address['stateOrProvince']." ".$address['zip']. "<br/>";
        }

        if($address['mailingzip']){
          echo $address['mailingzip']."<br/>";
        }
        if($therapist['officephone4']){
              echo '<span class="small-title" style="margin-right: 0px;">Phone:</span> <a href="tel:'.$therapist['officephone4'].'"> '.formatPhoneNumberUSA($therapist['officephone4']).'</a></span><br/>';
                }
        if($therapist['fax4']){
             echo '<span class="small-title" style="margin-right: 0px;">FAX:</span> <a href="tel:'.$therapist['fax4'].'"> '.formatPhoneNumberUSA($therapist['fax4']).'</a></span><br/>';
                }  
      }  

    } 
    ?>
    </p>
   <?php if($full_address4 != '' ) { ?>
   <div class="col-6 col-lg-12 address"><a href="javascript: void(0)" class="show-hide-map" id="show-hide-map"></a></div> 
    <div class=" col-6 col-lg-12 visible-lg displayNone" id="fourth-map"> 
      <div class="flex-video map">
          <iframe class="" width="200" height="115" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?f=q&source=s_q&hl=en&geocode=&q=<?php echo urlencode($full_address4); ?>&hnear=<?php echo urlencode($full_address4); ?>&ie=UTF8&hq=&t=m&z=14&iwloc=A&output=embed"></iframe>
      </div>
    </div>  
  <?php } ?>   
          <p class="col-6 col-lg-12 address" style=" margin-top: 10px;   margin-bottom: 0px;">
    <?php 
            // end  Address4  

              // Address5
    if(isset($therapist['primaryAddress5'])  && !empty($therapist['primaryAddress5']) ){
      $full_address5 = $therapist['office5addressline1']." ".$therapist['city5']." ".$therapist['stateOrProvince5']." ".$therapist['zip5'];
      foreach($therapist['primaryAddress5'] as $address){
           
        echo '<b>'.$therapist["companyname5"]."</b>".location_icon($address)."<br/>";
                 
        if($address['officeAddressLine1']){
         echo stripslashes($address['officeAddressLine1'])."<br/>";
       }
	if($address['officeAddressLine2']){
        echo stripslashes($address['officeAddressLine2']) . "<br/>";
      }
       if($address['mailingcity'] && $address['mailingzip'] && $address['mailingstate']){
        echo $address['mailingcity'] . ' ' . $address['mailingstate'] . ' ' . $address['mailingzip'] . "<br/>";
      }
      if($address['city'] && $address['stateOrProvince'] && $address['zip']){
        echo $address['city']." ".$address['stateOrProvince']." ".$address['zip']. "<br/>";
      }

      if($address['mailingzip']){
        echo $address['mailingzip']."<br/>";
      }
      if($therapist['officephone5']){
        echo '<span class="small-title" style="margin-right: 0px;">Phone:</span> <a href="tel:'.$therapist['officephone5'].'"> '.formatPhoneNumberUSA($therapist['officephone5']).'</a></span><br/>';
                }
      if($therapist['fax5']){
         echo '<span class="small-title" style="margin-right: 0px;">FAX:</span> <a href="tel:'.$therapist['fax5'].'"> '.formatPhoneNumberUSA($therapist['fax5']).'</a></span><br/>';
                }  
    }  
  } 
  // end  Address5   
  ?>
</p>
  <?php if($full_address5 != '' ) { ?>
   <div class="col-6 col-lg-12 address "><a href="javascript: void(0)" class="show-hide-map" id="show-hide-map"></a></div> 
    <div class=" col-6 col-lg-12 visible-lg displayNone" id="fifth-map"> 
  <div class="flex-video map">
      <iframe class="" width="200" height="115" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?f=q&source=s_q&hl=en&geocode=&q=<?php echo urlencode($full_address5); ?>&hnear=<?php echo urlencode($full_address5); ?>&ie=UTF8&hq=&t=m&z=14&iwloc=A&output=embed"></iframe>
  </div>
</div>
  <?php } ?>
</div>
</section>

<div class="visible-lg">


  <?  if($therapist['name'] == "Carol Maker") {?>
    <section>
      <h3 class="small-title">Blog Posts:</h3>
      <ul class="list-unstyled post-list">
        <?php
        $args = array( 'posts_per_page' => 3, 'orderby' => 'rand', 'author' => 2 );
        $rand_posts = get_posts( $args );
        foreach ( $rand_posts as $post ) :
          setup_postdata( $post ); ?>
          <li><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a><div class="entry-meta">Posted: <?php the_date('m/d/Y', '', ''); ?> 3/14/2015</div></li>
        <?php endforeach;
        wp_reset_postdata();
        ?>


               <!--   <li><a href="#">Mindfulness</a> <div class="entry-meta">Posted: 3/14/2015</div></li>
                  <li><a href="#">State of the Art Wellness - A Look Into Your Mind</a> <div class="entry-meta">Posted: 3/14/2015</div></li>
                  <li><a href="#">The 100th Monkey</a> <div class="entry-meta">Posted: 3/14/2015</div></li> -->
                </ul>
              </section>
            <? } ?>
            <?  if($therapist['name'] == "Carol Maker") { ?>
              <section>
                <h3 class="small-title">Upcoming Events:</h3>
                <ul class="list-unstyled post-list">
                 <?php

                 $args = array( 'post_type' => 'tribe_events', 'posts_per_page' => 3, 'orderby' => 'rand', 'author' => 2);
                 $rand_posts = get_posts( $args );
                 foreach ( $rand_posts as $post ) :
                  setup_postdata( $post ); ?>
                  <li><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a><div class="entry-meta">Posted: <?php the_date('m/d/Y', '', ''); ?> 3/14/2015</div></li>
                <?php endforeach;
                wp_reset_postdata();
                ?>
                  <!--<li><a href="#">Event Name</a> <div class="entry-meta">3/14/2015 3:30pm</div></li>
                  <li><a href="#">Event Name That’s A Little Longer Than Most</a> <div class="entry-meta">3/14/2015 9:00am</div></li>
                  <li><a href="#">Event Name</a> <div class="entry-meta">3/14/2015 - 3/17/2015</div></li>-->
                </ul>
              </section>
            <? } ?>
          </div><!-- .hidden-sm -->

        </div>
      </div>
      <div id="main" class="col-lg-7" role="main">
        <div class="profile-main-inner">
          <h2 class="description-header"><?php echo $therapist['descriptionHeader']; ?></h2>
          <p class="description-text"><?php echo nl2br($therapist['descriptionText']); ?></p>

          <div class="offers">
            <ul>
                   <!-- <?if ( isset($therapist['initialPhoneConsultationFree']) && $therapist['initialPhoneConsultationFree']== true ) {?> <li>Free initial phone consultation</li><?}?>
                   <?if ( isset($therapist['initialSessionFree']) && $therapist['initialSessionFree']== true ) {?> <li>Free initial session</li><?}?>
                   <?if ( isset($therapist['lowFeesOffered']) && $therapist['lowFeesOffered']== true ) {?> <li>Low fees offered</li><?}?>
                   <?if ( isset($therapist['initialPhoneConsultationFree']) || isset($therapist['initialSessionFree']) || isset($therapist['lowFeesOffered']) ) {?> <li>Ask for details</li><?}?> -->

                   <?if ( in_array('Initial phone consultation FREE', $therapist['financialArrangements']) ) {?> <li>Free initial phone consultation</li><?}?>
                   <?if ( in_array('Initial session FREE', $therapist['financialArrangements']) ) {?> <li>Free initial session</li><?}?>
                   <?if ( in_array('Low fees offered (less than $45 per session)', $therapist['financialArrangements']) ) {?> <li>Low fees offered</li><?}?>
                   <?if ( in_array('Initial phone consultation FREE', $therapist['financialArrangements']) || in_array('Initial session FREE', $therapist['financialArrangements']) || in_array('Low fees offered (less than $45 per session)', $therapist['financialArrangements']) ) {?> <li>Ask for details</li><?}?>
                 </ul>
               </div>

               <!-- begin testimonial row -->

               <div class="row">
                <?php if(!empty($therapist['testimonials'])) { ?>
                  <ul class="profile-list testimonials col-12">
                    <li class="small-title">Testimonials:</li>
                    <?php foreach($therapist['testimonials'] as $row_item) { ?>
                      <li class="row-item">“<?php echo $row_item; ?>"</li>
                    <?php } ?>
                  </ul>
                <?php } ?>
              </div>
              <!-- end testimonial row -->

              <!-- begin treatment row -->
              <div class="section-divider">
                <div class="section-icon"></div>
              </div>
              <div class="row">

                <!-- new services position -->
                <?php if(!empty($therapist['services'])) { ?>
                  <ul class="services profile-list col-4" >
                    <li class="small-title">Services</li>
                    <?php foreach($therapist['services'] as $row_item) { ?>
                      <li class="row-item"><?php echo $row_item; ?></li>
                    <?php } ?>
                    <?php
                        //task_id=30085 
                    if ($therapist["subscriber_type"] == "Consultant"):
                      ?>

                      <?php if( $therapist['feebase_emdr_training'] == 'Yes'): ?>
                        <li class="row-item">EMDR Basic Training</li>
                      <?php endif; ?>
                      <?php if( $therapist['feebase_consultation'] == 1): ?>
                        <li class="row-item">EMDR Consultation</li>
                      <?php endif; ?>
                      <?php if( $therapist['feebase_emdr_ceu'] == 'Yes'): ?>
                        <li class="row-item">EMDR CEUs</li>
                      <?php endif; ?>
                      <?php if( $therapist['nofee_emdr_study'] != ''): ?>
                        <li class="row-item">EMDR Study Group: <?php print $therapist['nofee_emdr_study']?> </li>
                      <?php endif; ?>
                      <?php if( $therapist['clinical_4_licensure'] == 1): ?>
                        <li class="row-item">Supervision for Licensure</li>
                      <?php endif; ?>
                    <?php endif; ?>

                  </ul>
                <?php } ?>
                <!-- new ages served position -->
                <?php if(!empty($therapist['agesServed'])) { ?>
                  <ul class="ages profile-list col-4">
                    <li class="small-title">Ages</li>
                    <?php foreach($therapist['agesServed'] as $row_item) { ?>
                      <li class="row-item"><?php echo $row_item; ?></li>
                    <?php } ?>
                  </ul>
                <?php } ?>
                <!-- new languages position -->
                <?php if(!empty($therapist['languages'])) { ?>
                  <ul class="languages profile-list col-4">
                    <li class="small-title">Languages</li>
                    <?php foreach($therapist['languages'] as $row_item) { ?>
                      <li class="row-item"><?php echo $row_item; ?></li>
                    <?php } ?>
                  </ul>
                <?php } ?>

              </div>

              <div class="section-divider">
                <div class="section-icon"></div>
              </div>
              <div class="row">
                <!-- new special services position -->
                <?php if(!empty($therapist['specialServices'])) { ?>
                  <ul class="special-services profile-list col-4" >
                    <li class="small-title">Special Services:</li>
                    <?php foreach($therapist['specialServices'] as $row_item) { ?>
                      <li class="row-item"><?php echo $row_item; ?></li>
                    <?php } ?>
                  </ul>
                <?php } ?>

                <!-- new special population focus -->
                <?php if(!empty($therapist['specialPopulationFocus'])) { ?>
                  <ul class="special-populations profile-list col-4">
                    <li class="small-title">Special Interests:</li>
                    <?php foreach($therapist['specialPopulationFocus'] as $row_item) { ?>
                      <li class="row-item"><?php echo $row_item; ?></li>
                    <?php } ?>
                  </ul>
                <?php } ?>

                <!-- new religious religion position -->
                <?php if(!empty($therapist['religiousSpiritual'])) { ?>
                  <ul class="religious profile-list col-4" >
                    <li class="small-title">Religious / Spiritual:</li>
                    <?php foreach($therapist['religiousSpiritual'] as $row_item) { ?>
                      <li class="row-item"><?php echo $row_item; ?></li>
                    <?php } ?>
                  </ul>
                <?php } ?>

                <!-- new other therapies position -->
                <?php if(!empty($therapist['otherTherapyMethods'])) { ?>
                  <ul class="in-network profile-list split">
                    <li class="small-title">Therapies:</li>
                    <?php foreach($therapist['otherTherapyMethods'] as $row_item) { ?>
                      <li class="row-item"><?php echo $row_item; ?></li>
                    <?php } ?>
                  </ul>
                <?php } ?>

              </div>

              <div class="section-divider">
                <div class="section-icon"></div>
              </div>
              <div class="row treatment-row situations">
                <?php if(!empty($therapist['treatment'])) { ?>
                  <ul class="treatment-categories second-section-margin-top profile-list">
                    <li class="small-title">Treatment For</li>
                    <?php foreach($therapist['treatment'] as $row_item) { ?>
                      <li class="row-item"><?php echo $row_item; ?></li>
                    <?php } ?>
                  </ul>
                <?php } ?>

                <?php if(!empty($therapist['situations'])) { ?>
                  <ul class="religious situations second-section-margin-top profile-list split">
                    <li class="small-title">Situations:</li>
                    <?php foreach($therapist['situations'] as $row_item) { ?>
                      <li class="row-item"><?php echo $row_item; ?></li>
                    <?php } ?>
                  </ul>
                <?php } ?>

                <?php if(!empty($therapist['traumaticEvent'])) { ?>
                  <ul class="special-services second-section-margin-top profile-list split">
                    <li class="small-title">Traumatic Events:</li>
                    <?php foreach($therapist['traumaticEvent'] as $row_item) { ?>
                      <li class="row-item"><?php echo $row_item; ?></li>
                    <?php } ?>
                  </ul>
                <?php } ?>
              </div>
              <!-- end treatment row -->

              <!-- begin coaching for row -->
              <?php if(!empty($therapist['peakPerformanceName'])): ?>
                <div class="section-divider">
                  <div class="section-icon"></div>
                </div>
              <?php endif;?>
              <div class="row profile-row">

                <?php if(!empty($therapist['peakPerformanceName'])) { ?>
                  <ul class="in-network profile-list split" >
                    <li class="small-title">Coaching For:</li>
                    <?php foreach($therapist['peakPerformanceName'] as $row_item) { ?>
                      <li class="row-item"><?php echo $row_item; ?></li>
                    <?php } ?>
                  </ul>
                <?php } ?>

                <div style="clear: both"></div>

              </div>

              <!-- end coaching for row -->

              <!-- begin other therapies row -->

              <div class="section-divider">
                <div class="section-icon"></div>
              </div>

              <!-- end other therapies row -->

              <!-- begin fees row -->


              <div class="row profile-row">
                <?php if(!empty($therapist['fees'])) { ?>
                  <ul class="fees profile-list col-4">
                    <li class="small-title">Finances:</li>
                    <?php if(isset($therapist['fees'])) { ?>
                      <li class="row-item"><?php echo $therapist['fees']; ?></li>
                    <?php } ?>

                    <?php if(!empty($therapist['paymentsAccepted'])) { ?>
                      <li class="small-title">Accepting:</li>
                      <?php foreach($therapist['paymentsAccepted'] as $row_item) { ?>
                        <li class="row-item"><?php echo $row_item; ?></li>
                      <?php } ?>
                    <?php } ?>

                  </ul>
                <?php } else{ ?>
                  <ul class="fees profile-list col-4">
                    <li class="small-title">Fees:</li>
                    <li class="row-item">Please contact me to discuss my fees.</li>

                    <?php if(!empty($therapist['paymentsAccepted'])) { ?>
                      <li class="small-title">Accepting:</li>
                      <?php foreach($therapist['paymentsAccepted'] as $row_item) { ?>
                        <li class="row-item"><?php echo $row_item; ?></li>
                      <?php } ?>
                    <?php } ?>
                  </ul>
                <?php }?>

                <?php /* ?>
              <?php if(!empty($therapist['paymentsAccepted'])) { ?>
                <ul class="payments profile-list col-4">
                  <li class="small-title">Accepting:</li>
                  <?php foreach($therapist['paymentsAccepted'] as $row_item) { ?>
                    <li class="row-item"><?php echo $row_item; ?></li>
                  <?php } ?>
                </ul>
              <?php } ?>
              <?php */ ?>
              <?php if(!empty($therapist['otherInsurance'])) { ?>
                <ul class="payments profile-list col-4">
                  <li class="small-title">Private Pay:</li>
                  <?php foreach($therapist['otherInsurance'] as $row_item) { ?>
                    <li class="row-item"><?php echo $row_item; ?></li>
                  <?php } ?>
                </ul>
              <?php } ?>

              <?php if(!empty($therapist['financialArrangements'])) { ?>
                <ul class="financial-arrangements profile-list col-4">
                  <li class="small-title">Special Finance:</li>
                  <?php foreach($therapist['financialArrangements'] as $row_item) { ?>
                    <li class="row-item"><?php echo $row_item; ?></li>
                  <?php } ?>
                </ul>
              <?php } ?>

              <?php if(!empty($therapist['inNetwork'])) { ?>
                <ul class="in-network profile-list split">
                  <li class="small-title">Insurance Networks:</li>
                  <?php foreach($therapist['inNetwork'] as $row_item) { ?>
                    <li class="row-item"><?php echo $row_item; ?></li>
                  <?php } ?>
                </ul>
              <?php } ?>


            </div>

            <div class="section-divider">
              <div class="section-icon"></div>
            </div>
<!-- HIDING OLD HTML 
            <div class="row profile-row">
              <?php if(!empty($therapist['specialPopulationFocus'])) { ?>
                <ul class="fees profile-list col-4">
                  <li class="small-title">Special Interests:</li>
                  <?php if(isset($therapist['specialPopulationFocus'])) { ?>
                    <li class="row-item"><?php echo $therapist['fees']; ?></li>
                  <?php } ?>
                </ul>
              <?php } ?>

              <?php if(!empty($therapist['otherTherapyMethods'])) { ?>
                <ul class="payments profile-list col-4">
                  <li class="small-title">Therapists:</li>
                  <?php foreach($therapist['otherTherapyMethods'] as $row_item) { ?>
                    <li class="row-item"><?php echo $row_item; ?></li>
                  <?php } ?>
                </ul>
              <?php } ?>

              <?php if(!empty($therapist['financialArrangements'])) { ?>
                <ul class="financial-arrangements profile-list col-4">
                  <li class="small-title">Special Financial:</li>
                  <?php foreach($therapist['financialArrangements'] as $row_item) { ?>
                    <li class="row-item"><?php echo $row_item; ?></li>
                  <?php } ?>
                </ul>
              <?php } ?>

              <?php if(!empty($therapist['inNetwork'])) { ?>
                <ul class="in-network profile-list split">
                  <li class="small-title">Insurance Networks:</li>
                  <?php foreach($therapist['inNetwork'] as $row_item) { ?>
                    <li class="row-item"><?php echo $row_item; ?></li>
                  <?php } ?>
                </ul>
              <?php } ?>


         </div>
         HIDING OLD HTML -->
         <!-- end fees row -->

            <?php //echo do_shortcode('[frontier-post]');

            //get_plugins( 'hello-dolly' );
            //do_action('testfunc');
            ?>

          </div><!-- .profile-main-inner -->
        </div><!-- #main -->

        <div class="profile-sidebar col-12 col-lg-2 pull-right" role="complementary">

          <?php if(!empty($therapist['EMDRTraining'])) { ?>
            <section class='sidebar-section'>
              <h3 class="small-title">EMDR Training:</h3>
              <p class="emdr-training">
                <?php foreach($therapist['EMDRTraining'] as $row_item) { ?>
                  <?php echo $row_item; ?><br/>
                <?php } ?>
              </p>
            </section>
          <?php } ?>

          <?php if(!empty($therapist['nonEMDRTraining'])) { ?>
            <section class='sidebar-section'>
              <h3 class="small-title">Non-EMDR Training:</h3>
              <p class="emdr-training">
                <?php foreach($therapist['nonEMDRTraining'] as $row_item) { ?>
                  <?php echo $row_item; ?><br/>
                <?php } ?>
              </p>
            </section>
          <?php } ?>

          <?php if(!empty($therapist['license'])) { ?>
            <section class='sidebar-section'>
              <h3 class="small-title">License:</h3>
              <p>
                <?php foreach($therapist['license'] as $row_item) { ?>
                  <?php echo $row_item; ?><br/>
                <?php } ?>
              </p>
            </section>
          <?php } ?>

          <?php if(!empty($therapist['education'])) { ?>
            <section class='sidebar-section'>
              <h3 class="small-title">Education:</h3>
              <p>
                <?php foreach($therapist['education'] as $row_item) { ?>
                  <?php echo $row_item; ?><br/>
                <?php } ?>
              </p>
            </section>
          <?php } ?>

          <?php if(!empty($therapist['certifications'])) { ?>
            <section class='sidebar-section'>
              <h3 class="small-title">Certifications:</h3>
              <p>
                <?php foreach($therapist['certifications'] as $row_item) { ?>
                  <?php
                  echo $row_item['certName'];
                  if (!empty($row_item['yearReceived']) ) echo ' ('.$row_item['yearReceived'].')';
                  ?>

                  <br/>
                <?php } ?>
              </p>
            </section>
          <?php } ?>

          <?php if(!empty($therapist['licensingStatus'])) { ?>
            <section class='sidebar-section'>
              <h3 class="small-title">License Number and Governing Body:</h3>
              <p>
                <?php
                    //echo "<pre>";
                    //var_dump($therapist["name"]);
                foreach($therapist['licensingStatus'] as $row_item) { ?>
                  <?php

                  echo $row_item['license'];

                  if (!empty($row_item['license']) && !empty($row_item['governingAuthority'])) echo ", ";
                  echo $row_item['governingAuthority']." ";

                        //if($row_item['supervisionCompleteYear'] != "1989"){
                        //echo "(".$row_item['supervisionCompleteYear'].")";
                        //}
                        /*if(!empty($row_item['supervisionCompleteMonth'])) echo " (".$row_item['supervisionCompleteMonth']." ";
                        if(!empty($row_item['supervisionCompleteYear'])) echo  $row_item['supervisionCompleteYear'].")";*/

                        ?><br/>
                      <?php } ?>
                    </p>
                  </section>
                <?php } ?>

                <?php if(!empty($therapist['professionalAffiliations'])) { ?>
                  <section class='sidebar-section'>
                    <h3 class="small-title">Professional Affiliations:</h3>
                    <p>
                      <?php foreach($therapist['professionalAffiliations'] as $row_item) { ?>
                        <?php echo $row_item; ?><br/>
                      <?php } ?>
                    </p>
                  </section>
                <?php } ?>

                <?php if(!empty($therapist['accomplishments'])) { ?>
                  <section class='sidebar-section'>
                    <h3 class="small-title">Accomplishments:</h3>
                    <p>
                      <?php foreach($therapist['accomplishments'] as $row_item) { ?>
                        <?php echo $row_item['trainingName'];

                        if (!empty($row_item['yearCompleted']) ) echo " (".$row_item['yearCompleted'].")" ?><br/>
                      <?php } ?>
                    </p>
                  </section>
                <?php } ?>

              </div>

            </div><!-- .row -->

          <?php } ?>

        </section>

        <?php get_footer(); ?>

	<script>
		$(document).ready(function(){
			$('.show-hide-map').html("Show Map");
			$('.show-hide-map').click(function(){
				$(this).parent().next().toggleClass("displayShow");
				if ( $(this).html() == 'Show Map' ){ $(this).html("Hide Map"); }else{ $(this).html("Show Map"); }
			});	
		});
	</script>

        <?php if($therapist['websiteurl']){ ?>
          <?php $url = $therapist['websiteurl']; ?>
          <?php if(strpos($url, 'http') === false) $url = 'http://' . $url; ?>;
          <div class="modal fade" id="websiteModal">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-body">
                  <!-- <div class="modal-header"> -->
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title h1">Website</h4><br>

                    <p>
                      <a href="<?= $url ?>" target="_blank"><?= $url ?></a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <script type="text/javascript">
              $(document).ready(function(){
                $('#website-popup-link').click(function(){
                  $('#websiteModal').modal();
                });
              });
            </script>
          <?php } ?>
