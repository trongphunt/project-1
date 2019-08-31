<?php
/**
 * Capisco Fitout Seating functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Capisco_Fitout_Seating
 */

if ( ! function_exists( 'capisco_fitout_seating_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function capisco_fitout_seating_setup() {
	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on Capisco Fitout Seating, use a find and replace
	 * to change 'capisco-fitout-seating' to the name of your theme in all the template files.
	 */
	load_theme_textdomain( 'capisco-fitout-seating', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'menu-1' => esc_html__( 'Primary', 'capisco-fitout-seating' ),
		'menu-2' => esc_html__( 'Secondary', 'capisco-fitout-seating' ),
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	) );

	// Set up the WordPress core custom background feature.
	add_theme_support( 'custom-background', apply_filters( 'capisco_fitout_seating_custom_background_args', array(
		'default-color' => 'ffffff',
		'default-image' => '',
	) ) );

	// Add theme support for selective refresh for widgets.
	add_theme_support( 'customize-selective-refresh-widgets' );
}
endif;
add_action( 'after_setup_theme', 'capisco_fitout_seating_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function capisco_fitout_seating_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'capisco_fitout_seating_content_width', 640 );
}
add_action( 'after_setup_theme', 'capisco_fitout_seating_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function capisco_fitout_seating_widgets_init() {
	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar', 'capisco-fitout-seating' ),
		'id'            => 'sidebar-1',
		'description'   => esc_html__( 'Add widgets here.', 'capisco-fitout-seating' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );

	register_sidebar( array(
		'name'          => esc_html__( 'Enquiry Form', 'capisco-fitout-seating' ),
		'id'            => 'sidebar-2',
		'description'   => esc_html__( 'Add widgets here.', 'capisco-fitout-seating' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );

	register_sidebar( array(
		'name'          => esc_html__( 'Footer', 'capisco-fitout-seating' ),
		'id'            => 'footer-1',
		'description'   => esc_html__( 'Add widgets here.', 'capisco-fitout-seating' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );
}
add_action( 'widgets_init', 'capisco_fitout_seating_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function capisco_fitout_seating_scripts() {
	wp_enqueue_style( 'capisco-fitout-seating-style', get_stylesheet_uri() );

	wp_enqueue_script( 'capisco-fitout-seating-navigation', get_template_directory_uri() . '/js/navigation.js', array(), '20151215', true );

	wp_enqueue_script( 'capisco-fitout-seating-skip-link-focus-fix', get_template_directory_uri() . '/js/skip-link-focus-fix.js', array(), '20151215', true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}

add_filter( 'wp_nav_menu_objects', 'submenu_limit', 10, 2 );

function submenu_limit( $items, $args ) {

    if ( empty($args->submenu) )
        return $items;

    $parent_id = array_pop( wp_filter_object_list( $items, array( 'title' => $args->submenu, 'post_parent' => 0 ), 'and', 'ID' ) );
    $children  = submenu_get_children_ids( $parent_id, $items );

    foreach ( $items as $key => $item ) {

        if ( ! in_array( $item->ID, $children ) )
            unset($items[$key]);
    }

    return $items;
}

function submenu_get_children_ids( $id, $items ) {

    $ids = wp_filter_object_list( $items, array( 'menu_item_parent' => $id ), 'and', 'ID' );

    foreach ( $ids as $id ) {

        $ids = array_merge( $ids, submenu_get_children_ids( $id, $items ) );
    }

    return $ids;
}
remove_action( 'woocommerce_before_single_product_summary', 'woocommerce_show_product_images', 20 );
remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_output_related_products', 20 );
// remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_title', 5 );
add_action( 'wp_enqueue_scripts', 'capisco_fitout_seating_scripts' );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Custom functions that act independently of the theme templates.
 */
require get_template_directory() . '/inc/extras.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
require get_template_directory() . '/inc/jetpack.php';

require_once(TEMPLATEPATH . '/admin/admin-functions.php');
require_once(TEMPLATEPATH . '/admin/admin-interface.php');
require_once(TEMPLATEPATH . '/admin/theme-settings.php');

function be_mobile_menu() {
	wp_nav_menu( array(
		'menu'           => 'Menu 1',
		'walker'         => new Walker_Nav_Menu_Dropdown(),
		'items_wrap'     => '<div class="mobile-menu"><form><select onchange="if (this.value) window.location.href=this.value">%3$s</select></form></div>',
	) );
}
add_action( 'genesis_before_header', 'be_mobile_menu' );

add_action( 'woocommerce_single_product_summary', 'mainblocking_start', 5 );
add_action( 'woocommerce_single_product_summary', 'mainblocking_end', 50 );
function mainblocking_start() { echo '<section class="woocustom">';}
function mainblocking_end() { echo '</section>'; }

add_action( 'woocommerce_single_product_summary', 'prima_custom_block_product_summary', 50 );
function prima_custom_block_product_summary() {
?>
<div id="wpp-buttons" class="downloadbtn"><a href="<?php the_field('Downloadable'); ?>" target="_blank">DOWNLOAD BROCHURE</a></div>
<div id="enquiryblk">
   <a href="/contact/" class="show_block wpi-button" id="enquiry">Make an Enquiry</a>
<!-- <a href="javascript:void(0);" class="show_block wpi-button" id="enquiry">Make an Enquiry</a> -->
</div>
 <div class="enquiry_block">
<div class="enquiry_form">
   <?php echo do_shortcode('[contact-form-7 id="44" title="Contact form 1"]'); ?>
</div>
<a href="javascript:void(0);" class="back_block"> &lt; Back to product</a>
</div> 
<?php
}


add_action( 'woocommerce_single_product_summary', 'custom_block_product_summary', 5 );
function custom_block_product_summary() {
?>
<div class="product_logo desktop_logo"><img src="<?php the_field('Product Logo'); ?>" /></div>
<?php
}