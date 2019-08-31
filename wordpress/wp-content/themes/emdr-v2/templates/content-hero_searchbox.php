<section class="hero">
  <div class="container">
    <div class="row intro">
      <div class="col-lg-6">
      <?php get_template_part( 'templates/content', 'emdr_searchform' ) ?>

      <ul class="submenu list-inline sans hidden-sm">
        <li>Learn About EMDR: </li>
        <?php wp_nav_menu(array(
          'menu'    => 'Hero Submenu',
          'items_wrap'      => '%3$s',
      )); ?>
      </ul>

      </div>
    </div>
    <div class="hero-overlay"></div>
  </div>
</section>