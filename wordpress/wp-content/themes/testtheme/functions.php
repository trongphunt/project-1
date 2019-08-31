<?php

require get_template_directory() . '/inc/template-tags.php';

function incluce_scripts() {
  wp_enqueue_style('style', get_template_directory_uri() . '/style.css', false, null);
  wp_enqueue_style('menu', get_template_directory_uri() . '/css/menu.css', false, null);
  wp_enqueue_style('style2', get_template_directory_uri() . '/css/style2.css', false, null);
  wp_enqueue_style('responsive', get_template_directory_uri() . '/css/responsive.css', false, null);
  wp_enqueue_style('bootstraps', get_template_directory_uri() . '/css/bootstrap.min.css', false, null);
  wp_enqueue_style('swiper', get_template_directory_uri() . '/css/swiper.min.css', false, null);
  wp_register_script('jquery_main', get_template_directory_uri() . '/js/jquery-3.3.3.min.js', false, null, true);
  wp_register_script('bootstrap_js', get_template_directory_uri() . '/js/bootstrap.min.js', false, null, true);
  wp_register_script('global_js', get_template_directory_uri() . '/js/global.js', false, null, true);
  wp_register_script('custom_js', get_template_directory_uri() . '/js/custom.js', false, null, true);
  wp_register_script('carosel_js', get_template_directory_uri() . '/js/owl.carousel.js', false, null, true);
  wp_register_script('proper_js', get_template_directory_uri() . '/js/popper.min.js', false, null, true);
  wp_enqueue_script('bootstrap_js');
  wp_enqueue_script('jquery_main');
  wp_enqueue_script('global_js');
  wp_enqueue_script('custom_js');
  wp_enqueue_script('carosel_js');
  wp_enqueue_script('proper_js');
}

add_action('wp_enqueue_scripts', 'incluce_scripts', 100);


if(!function_exists('testtheme_setup')) : 
   
    function testtheme_setup(){
    
    load_theme_textdomain('testtheme');
    
    add_theme_support( 'automatic-feed-links' );
    
    add_theme_support( 'title-tag' );
    
    add_theme_support( 'custom-logo', array(
		'height'      => 240,
		'width'       => 240,
		'flex-height' => true,
	) );
    
    add_theme_support( 'post-thumbnails' );
    
    set_post_thumbnail_size( 700, 600 );
    
    register_nav_menus( array(
		'primary' => __( 'Primary Menu', 'testtheme' ),
		'social'  => __( 'Social Links Menu', 'testtheme' ),
	) );
    
    add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	) );
    
    add_theme_support( 'post-formats', array(
		'aside',
		'image',
		'video',
		'quote',
		'link',
		'gallery',
		'status',
		'audio',
		'chat',
	) );
    
    add_theme_support( 'customize-selective-refresh-widgets' );
    
    add_theme_support( 'editor-color-palette', array(
		array(
			'name'  => __( 'Dark Gray', 'twentysixteen' ),
			'slug'  => 'dark-gray',
			'color' => '#1a1a1a',
		),
		array(
			'name'  => __( 'Medium Gray', 'twentysixteen' ),
			'slug'  => 'medium-gray',
			'color' => '#686868',
		),
		array(
			'name'  => __( 'Light Gray', 'twentysixteen' ),
			'slug'  => 'light-gray',
			'color' => '#e5e5e5',
		),
		array(
			'name'  => __( 'White', 'twentysixteen' ),
			'slug'  => 'white',
			'color' => '#fff',
		),
		array(
			'name'  => __( 'Blue Gray', 'twentysixteen' ),
			'slug'  => 'blue-gray',
			'color' => '#4d545c',
		),
		array(
			'name'  => __( 'Bright Blue', 'twentysixteen' ),
			'slug'  => 'bright-blue',
			'color' => '#007acc',
		),
		array(
			'name'  => __( 'Light Blue', 'twentysixteen' ),
			'slug'  => 'light-blue',
			'color' => '#9adffd',
		),
		array(
			'name'  => __( 'Dark Brown', 'twentysixteen' ),
			'slug'  => 'dark-brown',
			'color' => '#402b30',
		),
		array(
			'name'  => __( 'Medium Brown', 'twentysixteen' ),
			'slug'  => 'medium-brown',
			'color' => '#774e24',
		),
		array(
			'name'  => __( 'Dark Red', 'twentysixteen' ),
			'slug'  => 'dark-red',
			'color' => '#640c1f',
		),
		array(
			'name'  => __( 'Bright Red', 'twentysixteen' ),
			'slug'  => 'bright-red',
			'color' => '#ff675f',
		),
		array(
			'name'  => __( 'Yellow', 'twentysixteen' ),
			'slug'  => 'yellow',
			'color' => '#ffef8e',
		),
	) );
    
    }
    
    add_action( 'after_setup_theme', 'testtheme_setup' );
endif;


if(!function_exists('register_my_menus')):
    
    function register_my_menus(){
    register_nav_menus(
    array(
      'top-menu' => __( 'Top Menu' ),
      'extra-menu' => __( 'Extra Menu' )
        )
      );
}

add_action( 'init', 'register_my_menus' );

endif;

if(!function_exists('create_brand')):
    function create_brand(){
        register_taxonomy('brand', 'post', array(
            'label'=>'brand',
            'labels'=>array(
                'name'=>__('Brand'),
                'singular_name'=>__('Brand'),
                'add_new_item'=>__('Add New Brand'),
                'new_item'=>__('New brand'),
                'add_new'=>__('Add Brand'),
                'item_edit'=>__('Edit Branch')
            ),
            'show_ui' => true,
            'show_admin_column' => true,
            'query_var' => true,
            'public'=>true,
            'hierachical'=>true,
            'rewrite' => array( 'slug' => 'brand' ),
        ));
    }
    
    add_action('init', 'create_brand',0);
endif;


?>