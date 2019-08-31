<?php get_header();
 // Template Name: Home 

// Get Vars
if ( function_exists('get_field') ) {
  $im_social = get_field('social_media', 'options');
  $im_social = $im_social[0];
  $featured_video = get_field('home_featured_video');
}
?>

    <?php get_template_part('templates/content', 'hero_searchbox') ?>
    
    <section id="introduction" class="stripe">
    <?php get_template_part('templates/home-cols') ?>
    <a href="<?php echo get_permalink( 55 ) ?>" class="btn btn-default more-testimonials"><img style="margin-right:8px;" src="<?php bloginfo('template_directory') ?>/assets/img/icn-quote_blue.png" alt="">Read More Testimonials</a>
    </section>

<?php 
if($featured_video)
{
  echo '<section id="intro-video" class="stripe">';
    echo '<div class="container">';

    foreach($featured_video as $row){ ?>
      <div class="row">
        <div class="col-lg-8">
          <div class="flex-video">
            <iframe width="1006" height="603" src="//www.youtube.com/embed/<?php echo $row['id'] ?>" frameborder="0" allowfullscreen></iframe>
          </div>
        </div>
        <div class="col-sm-4">

          <div class="visible-lg">
            <?php echo $row['content'] ?>
          </div>
          <?php 
            $hasposts = get_posts('post_type=video'); 
            if (!empty ($hasposts) ) {
              echo '<p><a href="/videos/" class="btn btn-primary">See All Videos</a></p>';
            }
          ?>
        </div>
      </div>

    <?php
    }
    echo '</div>';
  echo '</section>';
} ?>
      

    <section id="tweets" class="stripe">
    <?php 
    // screen name of user to display the timeline of
    $screen_name = $im_social['twitter'];
    // maximum amount of tweets to display
    $count = 1;
    // number of columns to split tweets into (between 1 and 10)
    $cols = 1;
    // if true, will center the twitter columns
    $center = false;
    $twitter_tweets->user_timeline( $screen_name, $count, $cols, $center );
     ?>
    </section>

    <div class="section-divider" style="background:none;margin-top: 0;">
      <div class="social-btns btn-group">
        <a target="_blank" href="http://twitter.com/<?php echo $im_social['twitter'] ?>" class="btn btn-default"><span class="icn-twitter text-hide">On Twitter</span></a>
        <a target="_blank" href="http://facebook.com/<?php echo $im_social['facebook'] ?>" class="btn btn-default"><span class="icn-facebook text-hide">On Facebook</span></a>
        <!-- <a target="_blank" href="<?php echo $im_social['google_plus'] ?>" class="btn btn-default"><span class="icn-google text-hide">On Google+</span></a> -->
        <a href="<?php echo get_permalink( 69 ) ?>" class="btn btn-default"><span class="icn-blog text-hide">EMDR Blog</span></a>
      </div>
    </div>
      
    <section class="home-posts stripe smallpad">
      <div class="container">
        <div class="row">
          <?php query_posts('post_type=post&showposts=1'); ?>
          <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

          <article class="latest-article col-lg-6 col-offset-1 post">
            <header>
              <h5 class="section-title sc">Latest Article:</h5>
              <h1 class="entry-title nomargin"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h1>

              <?php get_template_part('templates/content', 'entry_meta'); ?>
            </header>
            
            <div class="post-excerpt">
              <?php the_excerpt(); ?> 
            </div>
          </article>
          <?php endwhile; endif; ?>
      
          <div class="col-lg-3 col-offset-1 recent-articles">
            <div class="col-inner">
              <h5 class="section-title sc">Other Recent Articles:</h5>
              <ul>
              <?php query_posts('post_type=post&showposts=4'); ?>
              <?php $posts = get_posts('post_type=post&numberposts=4&offset=1'); 
                foreach ($posts as $post) : setup_postdata( $post ); ?>
                <li><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></li>
              <?php endforeach; wp_reset_postdata(); ?>
              </ul>
            </div>
            <!-- <div class="btn-group btn-group-justified"> -->
              <a href="<?php echo get_permalink( 69 ) ?>" class="btn btn-aside btn-block">View The Blog &rarr;</a>
            <!-- </div> -->

          </div><!-- .col-sm-4 -->
        </div><!-- .row -->
      </div>
      <?php wp_reset_query(); ?>
    </section>

<?php get_footer(); ?>