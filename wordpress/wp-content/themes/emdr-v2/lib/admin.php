<?php
// The best Admin functions evar

// TinyMCE Styles Dropdown
function themeit_mce_buttons_2( $buttons ) {
  array_unshift( $buttons, 'styleselect' );
  return $buttons;
}
add_filter( 'mce_buttons_2', 'themeit_mce_buttons_2' );
function themeit_tiny_mce_before_init( $settings ) {
  $settings['theme_advanced_blockformats'] = 'p,a,div,span,h1,h2,h3,h4,h5,h6,tr,';
  $style_formats = array(
      array( 'title' => 'Small &para;',         'inline' => 'small',  'classes' => '' ),
      // array( 'title' => 'Green Button',   'inline' => 'span',  'classes' => 'button button-green' ),
      // array( 'title' => 'Rounded Button', 'inline' => 'span',  'classes' => 'button button-rounded' ),
      // array( 'title' => 'Other Options' ),
      // array( 'title' => '&frac12; Col.',      'block'    => 'div',  'classes' => 'one-half' ),
      // array( 'title' => '&frac12; Col. Last', 'block'    => 'div',  'classes' => 'one-half last' ),
      // array( 'title' => 'Callout Box',        'block'    => 'div',  'classes' => 'callout-box' ),
      // array( 'title' => 'Highlight',          'inline'   => 'span', 'classes' => 'highlight' )
  );
  $settings['style_formats'] = json_encode( $style_formats );
  return $settings;
}
add_filter( 'tiny_mce_before_init', 'themeit_tiny_mce_before_init' );

// disable default dashboard widgets
function disable_default_dashboard_widgets() {
	// remove_meta_box('dashboard_right_now', 'dashboard', 'core');    // Right Now Widget
	remove_meta_box('dashboard_recent_comments', 'dashboard', 'core'); // Comments Widget
	remove_meta_box('dashboard_incoming_links', 'dashboard', 'core');  // Incoming Links Widget
	remove_meta_box('dashboard_plugins', 'dashboard', 'core');         // Plugins Widget

	// remove_meta_box('dashboard_quick_press', 'dashboard', 'core');  // Quick Press Widget
	remove_meta_box('dashboard_recent_drafts', 'dashboard', 'core');   // Recent Drafts Widget
	remove_meta_box('dashboard_primary', 'dashboard', 'core');
	remove_meta_box('dashboard_secondary', 'dashboard', 'core');
	remove_meta_box('yoast_db_widget', 'dashboard', 'normal');
}
add_action('admin_menu', 'disable_default_dashboard_widgets');

/************* CUSTOM LOGIN PAGE *****************/

function bones_login_css() {
	wp_enqueue_style( 'bones_login_css', get_template_directory_uri() . '/assets/css/login.css', false );
}

// changing the logo link from wordpress.org to your site
function bones_login_url() {  return home_url(); }

// changing the alt text on the logo to show your site name
function bones_login_title() { return get_option('blogname'); }

// calling it only on the login page
add_action( 'login_enqueue_scripts', 'bones_login_css', 10 );
add_filter('login_headerurl', 'bones_login_url');
add_filter('login_headertitle', 'bones_login_title');





/************* CUSTOMIZE ADMIN *******************/

// Custom Backend Footer
function bones_custom_admin_footer() {
	_e('Site by <a href="http://periscopecreative.com" target="_blank">Periscope Creative</a>.', 'emdrtheme');
}

// // adding it to the admin area
add_filter('admin_footer_text', 'bones_custom_admin_footer');

// function remove_menus () {
// global $menu;
// 	$restricted = array( __('Links'), __('Comments'));
// 	end ($menu);
// 	while (prev($menu)){
// 		$value = explode(' ',$menu[key($menu)][0]);
// 		if(in_array($value[0] != NULL?$value[0]:"" , $restricted)){unset($menu[key($menu)]);}
// 	}
// }
// add_action('admin_menu', 'remove_menus');

function hide_admin_menu()
{
	global $current_user;
	get_currentuserinfo();
 
	if($current_user->user_login != 'periscope')
	{
		echo '<style type="text/css">#toplevel_page_edit-post_type-acf{display:none;}</style>';
	}
}
 
// add_action('admin_head', 'hide_admin_menu');