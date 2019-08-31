<button type="button" class="navbar-toggle">
  <span class="icon-bar"></span>
  <span class="icon-bar"></span>
  <span class="icon-bar"></span>
</button>
<a class="navbar-brand" href="<?php echo home_url(); ?>"><span class="logo text-hide"><?php bloginfo('name'); ?></span><img class="crane" src="<?php bloginfo('template_directory'); ?>/assets/img/gfx-crane.png" alt=""></a>
<div class="nav-collapse collapse">
  <ul class="nav navbar-nav navbar-right navbar-nav-therapists">
    <?php
      if (has_nav_menu('for_therapists')) :
        wp_nav_menu(array(
            'theme_location' => 'for_therapists', 
            'menu_class'    => 'nav',
            'items_wrap'    => '%3$s'
        ));
      endif;
    ?>
  </ul>
  <a href="/profilebuilder/_wf-p1.php" class="btn btn-secondary btn-small join-now">Join Now</a>
</div><!--/.nav-collapse -->
