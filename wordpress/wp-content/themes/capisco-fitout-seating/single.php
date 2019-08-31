<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package Capisco_Fitout_Seating
 */

get_header(); ?>
 <div class="pagebanner">
    <?php echo 
    cfix_featured_image( array( 
    'size' => 'full', 
    'title' => 'Category 4 Image', '
    class' => 'cfix-image', 
    'alt' => 'Category 4 Image', 
    'cat_id' => 4 )); ?>
    </div>
    <div class="container single-page">
	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">
                 <div class="post-content">
		<?php
		while ( have_posts() ) : the_post();

			get_template_part( 'template-parts/content', get_post_format() );

			the_post_navigation();

			

		endwhile; // End of the loop.
		?>
                </div>
      <div class="post-sidebar">
      		<?php get_sidebar();?>

      	</div>
		</main><!-- #main -->
	</div><!-- #primary -->
   
<?php

get_footer();
