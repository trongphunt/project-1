<?php 
  if ( function_exists('get_field') ) {
    $intro_cols =  get_field('intro_cols');
  }
?>

<section class="container">
  <div class="row">

    <?php 
    if($intro_cols)
    {
      foreach($intro_cols as $col) { 
        $t = $col['testimonial'];
    ?>
      <div class="col-sm-4 box">
        <?php if( $t ) echo '<div class="box-shadow">'; ?>
          <div class="box-content">
            <div style="min-height: 80px;">
                <img src="<?php echo $col['icon']['url'] ?>" alt="">
            </div>
            <h4 class="box-title"><?php echo $col['header'] ?></h4> 
            <p><?php echo $col['body'] ?></p>

            <?php if (is_front_page()) : ?>
            <!-- <a href="#" class="btn btn-primary">Button CTA</a> -->
            <?php endif; ?>
          <?php if( $t ) echo '</div>'; ?>

          <?php if( $t ): ?>
          <div class="box-overlay">
            <p class="t-inner">
              &#8220;<?php echo $t->post_content; ?>&#8221;
            </p>
            <div class="t-name">
              <strong class="sc"><?php echo $t->post_title ?></strong>
              <?php the_field('testimonial_location', $t->ID); ?>
            </div>
          </div>
          <?php endif; ?>

        </div>
        <?php if ($t): ?>
          <div class="testimonial-trigger hidden-sm"><span class="text-hide">View EMDR Testimonails</span></div>
        <?php endif ?>
      </div>
      <?php
      }
    } ?>
  </div>
</section>