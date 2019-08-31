<?php
/**
 * The template for displaying archive pages
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
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
<div class="container archivepage">
	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">
			<div class="post-content">
		<?php
		if ( have_posts() ) : ?>
			<?php
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
      	<div class="post-sidebar">
      		<?php get_sidebar();?>

      	</div>
		</main><!-- #main -->
	</div><!-- #primary -->
 </div>
<?php
get_footer();
