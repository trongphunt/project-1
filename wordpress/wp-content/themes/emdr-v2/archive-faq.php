<?php get_header(); ?>
  <section class="container" role="document">
    <div class="content row">
      <div id="main" class="col-lg-8" role="main">
        
        <?php get_template_part( 'templates/snippet', 'breadcrumbs' ); ?>

        <article>
          <header class="page-header clearfix">
            <h1 class="entry-title">EMDR Frequently Asked Questions</h1>
            <div class="entry-meta sc">
              <?php get_template_part( 'templates/snippet', 'sharing' ); ?>
            </div>
            <p class="faq-toggle sc pull-right sans"><small><a href="#" class="expand-all">Expand All</a> <a href="#" class="collapse-all">Collapse All</a></small></p>
          </header>
          
          <div class="entry-content">

          <?php query_posts($query_string . '&posts_per_page=-1'); ?>
          <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
            <div class="faq">
              <h2 class="trigger"><a href="#<?php echo $post->post_name ?>"><span class="caret"></span> <?php the_title(); ?></a>
              </h2>
              <div class="content"><?php the_content(); ?></div>
            </div>
          <?php endwhile; endif; ?>

          </div>
            
        </article>

      </div><!-- /#main -->

      <?php get_sidebar(); ?>

    </div><!-- /.content.row -->

  </section>


<?php get_footer(); ?>