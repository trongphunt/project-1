<?php get_header(); ?>

<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

    <section class="container<?php if ($therapist_child > 0) echo ' ft' ?>" role="document">
      <div class="content row">
        <div id="main" class="col-lg-8" role="main">
          
          <?php 
            if(!is_ft()) :
              get_template_part( 'templates/snippet', 'breadcrumbs' ); ?>

          <div class="section-divider">
            <div class="section-icon"></div>
          </div>

          <?php endif; ?>

          <article>
            <header class="page-header">
              <h1 class="entry-title"><?php the_title(); ?></h1>
            </header>
            
            <div class="entry-content">

            <?php if ( is_page('Sitemap') ):
              // if is the sitemap page, display the sitemap
              get_template_part('templates/sitemap');
            else :
              // otherwise run regular page loop
              the_content();
              get_template_part( 'templates/snippet', 'related_content' ); 
            endif; 
            ?>
            </div>

            <!-- <section class="widget emdr-search-form hidden-sm hidden-md"> -->
              <?php // include( 'templates/content-emdr_searchform.php' ); ?>
            <!-- </section> -->

          </article>

        </div><!-- /#main -->

        <?php 
          if ( !is_ft() ) get_sidebar();
          else get_sidebar('ft');
        ?>

      </div><!-- /.content.row -->

    </section>

<?php endwhile; endif; ?>

<?php if ( is_ft() ) get_template_part( 'templates/content', 'support_growth' ) ?>

<?php get_footer(); ?>