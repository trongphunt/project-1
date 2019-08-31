<?php
   /**
     
    * Template Name: Our Products
   
    *
  
    * @package WordPress
   
    * @subpackage capisco-fitout-seating
   
    * @since capisco-fitout-seating

    */
   get_header(); ?>
 <div class="pagebanner">
    <?php if ( has_post_thumbnail() ) : ?>
    <a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
        <?php the_post_thumbnail(); ?>
    </a>
<?php endif; ?>
    </div>
<div class="container">
    <div id="primary" class="content-area">
        <main id="main" class="site-main" role="main">
             <div class="product-tabs">
                  <?php  $args = array(
                       'menu'    => 'Menu 1',
                        'submenu' => 'Our Products',
                        );

               wp_nav_menu( $args );?>
            </div>
            <div class="product-slider">
                <?php masterslider(2); ?>
            </div>
            
            <div class="product-page">
               <div class="hello">
                <?php
        if ( have_posts() ) :

            if ( is_home() && ! is_front_page() ) : ?>
                <header>
                    <h1 class="page-title screen-reader-text"><?php single_post_title(); ?></h1>
                </header>

            <?php
            endif;

            /* Start the Loop */
            while ( have_posts() ) : the_post();

                /*
                 * Include the Post-Format-specific template for the content.
                 * If you want to override this in a child theme, then include a file
                 * called content-___.php (where ___ is the Post Format name) and that will be used instead.
                 */
                get_template_part( 'template-parts/content', get_post_format() );

            endwhile;

            the_posts_navigation();

        else :

            get_template_part( 'template-parts/content', 'none' );

        endif; ?>

    
               </div>
        
           </div>
        
        </main><!-- #main -->
    </div><!-- #primary -->
 </div>
 <?php

get_footer();
?>