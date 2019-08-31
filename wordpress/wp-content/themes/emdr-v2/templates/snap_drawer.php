<div class="snap-drawers">
  <div class="snap-drawer snap-drawer-left">
    <div>
      <!-- <div class="search">
        <input type="text" id="search" placeholder="Search for Things">
      </div> -->
      <div class="drawer-inner">
        <ul class="snap-menu sans">
          <li><a href="/">Home</a></li>
          <li><a href="<?php echo get_permalink( 10 ) ?>">Find A Therapist</a></li>
            <?php
              if (has_nav_menu('primary_navigation')) :
                wp_nav_menu(array(
                    'theme_location' => 'primary_navigation', 
                    'items_wrap'    => '%3$s'
                ));
              endif;
            ?>
            <li>
              <a href="#">For Therapists</a>
              <ul class="dropdown-menu">
                <?php
                  if (has_nav_menu('for_therapists')) :
                    wp_nav_menu(array(
                        'theme_location' => 'for_therapists', 
                        'items_wrap'    => '%3$s'
                    ));
                  endif;
                ?>
              </ul>
            </li>
          </ul>

      </div>
    </div>
  </div>
  <div class="snap-drawer snap-drawer-right sans">
    <h2 class="sidebar-header h5 sc">Narrow Results</h2>
          <section>
            <h3 class="h5 sc">Affliction</h3>
            <ul class="dropdown-menu">
              <li><a href="#">Addiciton</a></li>
              <li><a href="#">Anxiety or Fears</a></li>
              <li><a href="#">Attention Deficit/ADHD</a></li>
              <li><a href="#">Child or Adolescent</a></li>
              <li><a href="#">Depression</a></li>
            </ul>
          </section>
          <section>
            <h3 class="h5 sc">Sexuality</h3>
            <ul class="dropdown-menu">
              <li><a href="#">Bisexual</a></li>
              <li><a href="#">Gay</a></li>
              <li><a href="#">Lesbian</a></li>
              <li><a href="#">Transexual</a></li>
            </ul>
          </section>
  </div>
</div>