<?php get_header(); ?>

    <section class="container" role="document">
      <div class="content row">
        <div id="main" class="col-sm-8" role="main">
          
          <?php get_template_part( 'templates/snippet', 'breadcrumbs' ); ?>

          <div class="section-divider">
            <div class="section-icon"></div>
          </div>

          <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
          <article <?php post_class() ?>>
            <header class="page-header">
              <h1 class="entry-title"><?php the_title(); ?></h1>
              
              <?php get_template_part( 'templates/content', 'entry_meta' ); ?>
              
            </header>
            
            <div class="entry-content">
            <?php the_content(); ?>
            </div>
            <hr>
            <?php /*<h4>Related Articles</h4> */ ?>
            <?php // bones_related_posts() ?>

          </article>

          <?php comments_template(); ?>
          <?php endwhile; endif; ?>

        </div><!-- /#main -->

        
        <?php get_sidebar('blog'); ?>

      </div><!-- /.content.row -->

    </section>

<?php get_footer(); ?>