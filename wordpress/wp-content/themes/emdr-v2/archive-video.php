<?php get_header(); ?>

    <section class="container">
      <div class="row">
        <div class="col-12">
          <?php get_template_part( 'templates/snippet', 'breadcrumbs' ); ?>
          <div class="section-divider">
            <div class="section-icon"></div>
          </div>
          <h1 class="entry-title">EMDR Videos</h1>
        </div>
      </div><!-- .row -->
    </section><!-- .container -->

    <!-- featured video would go here -->

    <div class="container">
      <div class="row video-grid">
        <!--
        <div class="col-12 navbar hidden-sm">
          <div class="pull-left">Showing 1-6 of 24 results</div>
          <div class="pull-right">Filter By: <a href="#">Date Added</a> <a href="#">Popularity</a></div>
        </div>
        -->

<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

<?php 
// Grab Variables
if ( function_exists('get_field') ) {
  global $post;

  $youtubeID = get_field('youtube_id');

} ?>

        <article class="col-sm-6 col-video">
          <div>
            <!-- <a data-toggle="modal" data-url="http://www.youtube.com/embed/<?php echo $youtubeID; ?>" data-title="<?php the_title_attribute(); ?>" href="#videoModal" class="video-thumb video-wrap">
              <img class="play" src="<?php bloginfo('template_directory') ?>/assets/img/icn-play-opaque.png" alt="Play Button">
              <img class="img-responsive" src="http://img.youtube.com/vi/<?php echo $youtubeID; ?>/0.jpg" alt="">
            </a> -->

            <div class="flex-video">
              <iframe src="http://www.youtube.com/embed/<?php echo $youtubeID; ?>?&rel=0&showinfo=0&disablekb=1&modestbranding=0&controls=1&hd=1&autohide=0&color=white" frameborder="0" allowfullscreen></iframe>
            </div>

            <div class="video-inner">
              <header>
                <h1 class="entry-title h2"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h1>
                meta
              </header>

              <div class="entry-excerpt">
                <?php the_excerpt(); ?>
              </div>
            </div>

            <footer>
              <div class="btn-group btn-group-justified">
                <a href="#" class="btn btn-aside">Transcript</a>
                <a href="#" class="btn btn-aside">Share</a>
              </div>
            </footer>
          </div>
        </article>

<?php endwhile; endif; ?>

      </div><!-- .row -->

    </div>

<?php get_footer(); ?>