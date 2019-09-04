<?php
/* Template Name: custom-page */
?>

<?php get_header(); ?>

<?php //do_action('get_form_data');?>

<?php
global $wpdb;
if(!empty($_POST['save-data']))
{

    if(isset($_POST['firstname'])&& $_POST['firstname'] !=''){
        $firstname = $_POST['firstname'];
    }
    if(isset($_POST['lastname'])&& $_POST['lastname'] !=''){
        $lastname = $_POST['lastname'];
    }
    if(isset($_POST['address'])&& $_POST['address'] !=''){
        $address = $_POST['address'];
    }
    if(isset($_POST['city'])&& $_POST['city'] !=''){
        $city = $_POST['city'];
    }

// Cập nhật (nếu chưa có thì hệ thống tự thêm mới)
//        update_option('mailer_gmail_username', $email);
//        update_option('mailer_gmail_password', $pass);
    $wpdb->insert('persons', array("firstname" => $firstname, "lastname" => $lastname, "address"=>$address, "city"=>$city));
}
$person_list=$wpdb->get_results($wpdb->prepare("SELECT * FROM persons",ARRAY_A));
?>

<div id="sign-form" style="width: 50%;margin-left: 165px;margin-bottom: 20px;margin-top: 0px !important;">
    <form method="post" action="">
        <label>First Name</label><input type="text" name="firstname" id="firstname" value="">
        <label>Last Name</label><input type="text" name="lastname" id="lastname" value="">
        <label>Address</label><input type="text" name="address" id="address" value="">
        <label>City</label><input type="text" name="city" id="city" value="">
        <input type="submit" name="save-data" value="Submit" style="margin-top: 10px;">
    </form>
</div>

<div id="person_list" style="width: 80%;margin-left: 165px;">
    <table style="border: 1px solid darkblue;" border="1px solid black">
        <thead>
        <th>Id</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Address</th>
        <th>City</th>
        </thead>
    <tbody>
    <?php
    $i = 1;
    foreach ($person_list AS $key => $person){
       ?>
        <tr>
            <td><?php echo $i;?></td>
            <td><?php echo $person->firstname;?></td>
            <td><?php echo $person->lastname;?></td>
            <td><?php echo $person->address;?></td>
            <td><?php echo $person->city;?></td>
        </tr>
        <?php
        $i++;
    }
    ?>
    </tbody>
    </table>
</div>

<?php get_footer();