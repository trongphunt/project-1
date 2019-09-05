<?php
/**
 * The template for displaying all single posts.
 *
 * @package storefront
 */

get_header(); ?>
<?php get_sidebar('left');?>
	<div id="primary" class="content-area" style="width: 45% !important;float: left !important;">
		<main id="main" class="site-main" role="main">

		<?php
		while ( have_posts() ) :
			the_post();

			do_action( 'storefront_single_post_before' );

			get_template_part( 'content', 'single' );

			do_action( 'storefront_single_post_after' );

		endwhile; // End of the loop.
		?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php
do_action( 'storefront_sidebar' );
get_footer();
