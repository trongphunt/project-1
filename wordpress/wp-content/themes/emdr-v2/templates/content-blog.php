<section class="container" role="document">
  <div class="content row">
    <div id="main" class="col-lg-8 posts" role="main">
      
      <?php get_template_part( 'templates/snippet', 'breadcrumbs' ); ?>

      <?php if (is_home()  && !is_paged()) : ?>
      <div id="blog-intro" class="well">
        <?php 
          $postspage = get_option('page_for_posts');
          $postcontent = get_post($postspage);
          echo $postcontent->post_content;
        ?>
      </div>
      <?php endif; ?>

      <div class="section-divider">
        <div class="section-icon"></div>
      </div>

      <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
      <article <?php post_class() ?>>
        <header>
          <h1 class="entry-title"><a href="<?php the_permalink() ?>" title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a></h1>
          <div class="entry-meta sc sans">
            <?php get_template_part( 'templates/content', 'entry_meta' ); ?>
          </div>
        </header>
        
        <div class="entry-summary">
        <?php the_excerpt(); ?>
        </div>
          
        <!-- <footer class="clearfix">
          <a href="<?php the_permalink(); ?>" class="btn btn-default pull-right">Read More</a>
        </footer> -->
      </article>
      <?php endwhile; ?>

        <?php if (function_exists('bones_page_navi')) { ?>
          <?php bones_page_navi(); ?>
        <?php } else { ?>
          <nav class="wp-prev-next">
            <ul class="clearfix">
              <li class="prev-link"><?php next_posts_link(__('&laquo; Older Entries', "bonestheme")) ?></li>
              <li class="next-link"><?php previous_posts_link(__('Newer Entries &raquo;', "bonestheme")) ?></li>
            </ul>
          </nav>
        <?php } ?>

      <?php else : ?>

        <article id="post-not-found" class="hentry clearfix">
            <header class="article-header">
              <h1><?php _e("Oops, Post Not Found!", "bonestheme"); ?></h1>
          </header>
            <section class="entry-content">
              <p><?php _e("Uh Oh. Something is missing. Try double checking things.", "bonestheme"); ?></p>
          </section>
        </article>

      <?php endif; ?>

    </div><!-- /#main -->

    <?php get_sidebar('blog'); ?>

  </div><!-- /.content.row -->

</section>