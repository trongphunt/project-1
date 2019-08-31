<aside class="sidebar col-lg-4 pull-right hidden-sm" role="complementary">
  <?php 
  // Grab Variables
  if ( function_exists('get_field') ) {
    global $post;

    // Grab page sidebar var, otherwise grab default
    // $sidebar_links = get_field('sidebar_links', $post->ID);
    // if ($sidebar_links == null || $sidebar_links == '') {
    //   $sidebar_links = get_field('sidebar_links', 'options');
    // }

    // Grab page sidebar video var, otherwise grab default
    $videos = get_field('video_relationship', $post->ID);
    if ($videos == null || $videos == '') {
      $videos = get_field('video_relationship', 'options');
    }


  } ?>

  <section class="widget emdr-search-form">
    <?php include( 'templates/content-emdr_searchform.php' ); ?>
  </section>

  <section class="widget widget_latest_post tab-content">
    <ul class="btn-group btn-group-justified">
      <li class="active"><a class="btn btn-aside" href="#tab1" data-toggle="tab">Popular</a></li>
      <!-- <li><a class="btn btn-aside" href="#tab2" data-toggle="tab">What Else?</a></li> -->
      <li><a class="btn btn-aside" href="#tab3" data-toggle="tab">Tags</a></li>
    </ul>

    <div id="tab1" class="tab-pane widget-inner active">
      <?php wp_popular_posts(); ?>
    </div>
    <div id="tab2" class="tab-pane widget-inner">
      <p>
        What else? Archives?
      </p>
    </div>
    <div id="tab3" class="tab-pane widget-inner">
      <?php wp_tag_cloud(); ?>
    </div>
  </section>

  <?php if ($sidebar_links) { ?>
  <!-- <section class="widget pages-2 widget_pages">
    <div class="widget-inner">
      <h3>Related Content</h3>   
      <ul>
      <?php foreach($sidebar_links as $link)
      {
        echo '<li><a href="' . get_permalink($link->ID) . '">'.get_the_title($link->ID) . '</a></li>';
      } ?>
      </ul>
    </div>
  </section>  -->
  <?php } ?>   

  <!--

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
          <p><?php echo $video->post_excerpt; ?></p>
        </div>
        <div class="btn-group btn-group-justified">
          <?php if ($video->post_content != ''): ?>
            <a href="<?php echo $permalink; ?>" class="btn btn-aside">Transcript</a>
          <?php endif ?>
          <a href="/videos/" class="btn btn-aside">View All</a>
        </div>
      </section>

    <?php } ?>
  <?php endif ?>
  -->
  <?php dynamic_sidebar('sidebar-blog'); ?>
</aside>