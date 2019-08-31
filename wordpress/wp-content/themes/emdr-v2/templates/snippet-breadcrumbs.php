<div class="clearfix">
  <?php if ( function_exists('yoast_breadcrumb') ) {
    yoast_breadcrumb('<p class="breadcrumb pull-left">','</p>');
  } ?>

  <?php if( get_post_type() != 'post' ) { ?>
    <div class="pull-right"><?php include "snippet-sharing.php"; ?></div>
  <?php } ?>
</div>

<!-- <div class="section-divider">
  <div class="section-icon"></div>
</div> -->