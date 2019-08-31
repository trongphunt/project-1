<aside class="sidebar col-lg-4 pull-right" role="complementary">
  <?php 
  // Grab Variables
  if ( function_exists('get_field') ) {
    global $post;

    // Grab page sidebar var, otherwise grab default
    $sidebar_links = get_field('sidebar_links', $post->ID);

    // Grab page sidebar video var, otherwise grab default
    $videos = get_field('video_relationship', $post->ID);
    if ($videos == null || $videos == '') {
      $videos = get_field('video_relationship', 'options');
    }


  } ?>

  <section class="widget emdr-search-form">
    <?php include( 'templates/content-emdr_searchform.php' ); ?>
  </section>

  <div class="visible-lg">

    <?php if ($sidebar_links) { ?>
    <section class="widget pages-2 widget_pages">
      <div class="widget-inner">
        <h3>Related Content</h3>   
        <ul>
        <?php foreach($sidebar_links as $link)
        {
          echo '<li><a href="' . get_permalink($link->ID) . '">'.get_the_title($link->ID) . '</a></li>';
        } ?>
        </ul>
      </div>
    </section> 
    <?php } ?>   

    <?php if ($videos): ?>
      <?php foreach($videos as $video) { ?>

        <?php $permalink = get_permalink($video->ID); ?>
        <section class="widget widget_video">
          <a href="<?php echo $permalink; ?>" class="video-wrap">
            <img class="play" src="<?php bloginfo('template_directory') ?>/assets/img/icn-play-opaque.png" alt="Play Button">
            <img class="img-responsive" src="http://img.youtube.com/vi/<?php echo get_field('youtube_id', $video->ID); ?>/0.jpg" alt="">
          </a>
          <div class="widget-inner">
            <h3><a href="<?php echo $permalink; ?>"><?php echo $video->post_title; ?></a></h3>
            <p class="entry-meta"><?php echo $video->post_excerpt; ?></p>
          </div>
          <div class="btn-group btn-group-justified">
            <?php if ($video->post_content != ''): ?>
              <!-- <a href="<?php echo $permalink; ?>" class="btn btn-aside">Transcript</a> -->
            <?php endif ?>
            <a href="/videos/" class="btn btn-aside">View All</a>
          </div>
        </section>

      <?php } ?>
    <?php endif ?>

    <?php $sidebarQuery = new WP_Query('post_type=post&posts_per_page=1'); ?>
    <?php while ($sidebarQuery->have_posts()) : $sidebarQuery->the_post(); ?>
      <?php $permalink = get_permalink() ?>
    <section class="widget widget_latest_post">
      <div class="widget-inner">
        <div class="section-divider">
          <h3>From The Blog</h3>
        </div>
        <article>
          <h4><a href="<?php echo $permalink; ?>"><?php the_title(); ?></a></h4>
          <p class="entry-meta">Posted on January 25, 2013 by Carol Maker (static)</p>
          <p><?php the_excerpt(); ?></p>
        </article>
      </div>
      <div class="btn-group btn-group-justified">
        <a href="#" class="btn btn-aside"><span class="commentsbubble"><?php comments_number( '', '1', '%' ); ?></span></a>
        <a href="<?php echo $permalink; ?>" class="btn btn-aside">Read More</a>
      </div>
    </section>

    <?php endwhile; ?>


    <?php dynamic_sidebar('sidebar-primary'); ?>

  </div><!-- .visible-lg -->
</aside>