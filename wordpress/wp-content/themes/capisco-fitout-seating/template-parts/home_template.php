<?php
   /**
     
    * Template Name: Home Template 
   
    *
  
    * @package WordPress
   
    * @subpackage Capisco Fitout Seating
   
    * @since capisco-fitout-seating

    */
   get_header(); ?>

<div class="banner">
<?php if ( have_posts() ) : while ( have_posts() ) : the_post();
the_content();
endwhile; else: ?>
<p>Sorry, no posts matched your criteria.</p>
<?php endif; ?>
</div>
<div class="main-content">
	<?php while ( have_posts() ) : the_post(); ?>
<?php get_template_part( 'content', 'page' ); ?>
<?php endwhile; // end of the loop. ?>
<?php /* The loop */ ?>
</div>
<?php get_footer(); ?>

