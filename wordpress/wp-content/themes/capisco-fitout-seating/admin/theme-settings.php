<?php

add_action('init','of_options');

if (!function_exists('of_options')) {
function of_options(){

//Theme Shortname
$shortname = "capisco";


//Populate the options array
global $tt_options;
$tt_options = get_option('of_options');


//Access the WordPress Pages via an Array
$tt_pages = array();
$tt_pages_obj = get_pages('sort_column=post_parent,menu_order');    
foreach ($tt_pages_obj as $tt_page) {
$tt_pages[$tt_page->ID] = $tt_page->post_name; }
$tt_pages_tmp = array_unshift($tt_pages, "Select a page:"); 


//Access the WordPress Categories via an Array
$tt_categories = array();  
$tt_categories_obj = get_categories('hide_empty=0');
foreach ($tt_categories_obj as $tt_cat) {
$tt_categories[$tt_cat->cat_ID] = $tt_cat->cat_name;}
$categories_tmp = array_unshift($tt_categories, "Select a category:");


//Sample Array for demo purposes
$sample_array = array("1","2","3","4","5");


//Sample Advanced Array - The actual value differs from what the user sees
$sample_advanced_array = array("image" => "The Image","post" => "The Post"); 


//Folder Paths for "type" => "images"
$sampleurl =  get_template_directory_uri() . '/admin/images/sample-layouts/';


/*-----------------------------------------------------------------------------------*/
/* Create The Custom Site Options Panel
/*-----------------------------------------------------------------------------------*/
$options = array(); // do not delete this line - sky will fall

/* Option Page 1 - Options */	
$options[] = array( "name" => __('Options','framework_localize'),
			"type" => "heading");


$options[] = array( "name" => __('Favicon','framework_localize'),
			"desc" => __('Upload a 16px x 16px image that will represent your website\'s favicon.<br /><br /><em>To ensure cross-browser compatibility, we recommend converting the favicon into .ico format before uploading. (<a href="http://www.favicon.cc/">www.favicon.cc</a>)</em>','framework_localize'),
			"id" => $shortname."_favicon",
			"std" => "",
			"type" => "upload");

$options[] = array( "name" => __('Contact','framework_localize'),
			"desc" => "Contact",
			"id" => $shortname."_contact",
			"std" => "",
			"type" => "text");

$options[] = array( "name" => __('Email','framework_localize'),
			"desc" => "Email",
			"id" => $shortname."_email",
			"std" => "",
			"type" => "text");

$options[] = array( "name" => __('Copyright','framework_localize'),
			"desc" => "Certificate",
			"id" => $shortname."_certificate",
			"std" => "",
			"type" => "text");

$options[] = array( "name" => __('Linkedin Logo','framework_localize'),
			"desc" =>"linkedinlogo",
			"id" => $shortname."_linkedinlogo",
			"std" => "",
			"type" => "upload");


$options[] = array( "name" => __('LinkedIn Link','framework_localize'),
			"desc" => "LinkedIn",
			"id" => $shortname."_linkedin",
			"std" => "",
			"type" => "text");

$options[] = array( "name" => __('Facebook Logo','framework_localize'),
			"desc" =>"Facebooklogo",
			"id" => $shortname."_facebooklogo",
			"std" => "",
			"type" => "upload");

$options[] = array( "name" => __('Facebook Link','framework_localize'),
			"desc" => "Facebook",
			"id" => $shortname."_fb",
			"std" => "",
			"type" => "text");

$options[] = array( "name" => __('Instagram Logo','framework_localize'),
			"desc" =>"Instagramlogo",
			"id" => $shortname."_instagramlogo",
			"std" => "",
			"type" => "upload");

$options[] = array( "name" => __('Instagram Link','framework_localize'),
			"desc" => "Instagram",
			"id" => $shortname."_insta",
			"std" => "",
			"type" => "text");



update_option('of_template',$options); 					  
update_option('of_themename',$themename);   
update_option('of_shortname',$shortname);

}
}
?>