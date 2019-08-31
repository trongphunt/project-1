<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Capisco_Fitout_Seating
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<meta name="google-site-verification" content="h7jzJ4bdOsBmiS8-uoG-Iaf7YVaeNgkIheyepUJFySo" />
<link rel="profile" href="http://gmpg.org/xfn/11">
<?php $favicon = get_option('capisco_favicon'); ?>
<link rel="shortcut icon" href="<?php echo $favicon;?>" type="image/x-icon"/>
<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'capisco-fitout-seating' ); ?></a>



<div class="header">
	<div class="container">
		<div class="logo">
			<a href="<?php bloginfo('url'); ?>"><img src="<?php echo get_template_directory_uri(); ?>/images/logo.png"></a>
		</div>
		<div class="navigation">
			<div class="main-navigation">
			 <button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false"><?php esc_html_e( 'Primary Menu', 'capisco-fitout-seating' ); ?></button>
			<?php wp_nav_menu( array( 'theme_location' => 'menu-1', 'menu_id' => 'primary-menu' ) ); ?>
		</div>
		</div>
	</div>
</div>



	
<div id="content" class="site-content">
<div class="clear"></div>