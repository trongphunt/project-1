<aside class="sidebar col-lg-4 pull-right hidden-sm" role="complementary">
  
  <?php if (!is_page(58) ) : ?>
  <section class="widget emdr-search-form consultant-search-form">
    <h1 class="h2">Join the EMDR Therapist Network</h1>
    <a href="/profilebuilder/_wf-p1.php" class="btn btn-secondary">Join Now</a>
  </section>
  <?php endif; ?>

  <section class="widget emdr-search-form">
    <?php include( 'templates/content-emdr_searchform.php' ); ?>
  </section>

  <?php dynamic_sidebar('sidebar-therapists'); ?>

</aside>
