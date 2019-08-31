<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Capisco_Fitout_Seating
 */

get_header(); ?>
    <div class="pagebanner">
      <?php
          if(is_single()) {
    $terms = get_the_terms( $post->ID, 'product_cat' );
    $i=23; //Variable for dummy condition
    foreach ( $terms as $term ){
        if($i==23): //Dummy Condition
            $category_name = $term->name;
            $category_thumbnail = get_woocommerce_term_meta($term->term_id, 'thumbnail_id', true);
            $image = wp_get_attachment_url($category_thumbnail);
            echo '<img class="absolute '.$category_name.' category-image" src="'.$image.'">';
            $i++; //Increment it to make condition false
        endif;
    }
} 
      ?>
    </div>
    <div class="container wocommerce">
	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">
    
    <?php
      include( 'nav-menu-dropdown.php' );

      wp_nav_menu( array(
        'menu'    => 'Menu 1',
        'submenu' => 'Our Products',
        'walker'         => new Walker_Nav_Menu_Dropdown(),
        'items_wrap'     => '<div class="mobile-menu"><form>Choose Chair <i class="fa fa-angle-right" aria-hidden="true"></i>
 <select onchange="if (this.value) window.location.href=this.value">%3$s</select></form></div>',
      ) );
    ?>
            <div class="product-tabs">
                  <?php  $args = array(
                       'menu'    => 'Menu 1',
                        'submenu' => 'Our Products',
                        );

               wp_nav_menu( $args );?>
            </div>
      <div class="product_logo mobile-menu"><img src="<?php the_field('Product Logo'); ?>" /></div>
			<?php woocommerce_content(); ?>

		</main><!-- #main -->
	</div><!-- #primary -->
   </div>
<?php

get_footer();
