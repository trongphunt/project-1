<?php get_header();
// Template Name: Temporary Search Results ?>

<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

    <section id="search-results" class="container">
      <div class="row">
        <div class="col-sm-8">
          <?php // if ( function_exists('yoast_breadcrumb') ) {
            //yoast_breadcrumb('<p class="breadcrumb">','</p>');
          // } ?>
        </div>
      </div>

      <div class="content row">
        
        <div class="alert text-center">
          This page will be populated completely with JSON content
        </div>

        <div id="main" class="col-sm-10 col-push-2" role="main">
          
          <p class="h5 sc">Showing 1-12 of 24 results</strong></p>

          <div class="section-divider">
            <div class="section-icon"></div>
          </div>

          <h1 id="search-header">EMDR Therapists in <span class="editable-region-container"><span class="editable-region">Portland, Or 97214</span> <span class="edit-text">Click to edit</span></span></h1>

          <div class="sc" id="search-filters">
            <h5 id="search-filters-header">Your selections: </h5>
            
            <small class="search-filter">
              <span>Anxiety or Fears</span>
              <a class="cancel" href="javascript://" title="remove"></a>
            </small>

            <small class="search-filter">
              <span>Children (6 to 10)</span>
              <a class="cancel" href="javascript://" title="remove"></a>
            </small>


          </div>

          <div class="search-results">
            
            <div class="result row">
              <section class="result-left col-sm-3">
                <div class="profile-image" style="background-image: url(http://placehold.it/110x110);">
                  <img class="img-responsive" src="<?php bloginfo('template_directory'); ?>/assets/img/gfx-portal_small.png" alt="">
                </div>
                <div class="text-center actions">
                  <button type="button" class="btn btn-primary" data-toggle="button"><span class="text-hide favorite_result">Add to Favorites</span></button>

                  <a href="#" class="btn btn-primary"><span class="text-hide email_result">Email to Friend</span></a>
                </div>
              </section>
              <section class="result-center col-sm-6 col-lg-6">
                <header>
                  <h1><a href="/profile-template/">Dave Knowles <small>MA, LPC, NCC, CADC I</small></a></h1>
                  <div class="verified">Verified</div>
                </header>
                <p>Maecenas at blandit magna. Vivamus sodales, sapien nec mattis euismod, urna arcu consectetur dolor, nec placerat nunc elit ac eros. Accumsan ante ligula, non sollicitudin enim lobortis eget. <a href="/profile-template/">View full profile &raquo;</a></p>
              </section>
              <div class="result-right col-sm-3">
                <div class="result-phone sans">(xxx) xxx-xxxx</div>
                <div class="result-address">
                  1820 SW Vermont Street<br>
                  Suite J<br>
                  Portland, OR 97219
                </div>
                <a href="#" class="btn btn-default btn-small">More Locations</a>
              </div>
            </div>
            
            <div class="text-center col-sm-9">
              <ul class="pagination">
                <li><a href="#">&laquo;</a></li>
                <li><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li><a href="#">&raquo;</a></li>
              </ul>
            </div>    

          </div>

        </div><!-- /#main -->

        <aside class="col-sm-2 col-pull-10 refine-search hidden-sm" role="complementary">
          <h2 class="sidebar-header h5 sc">Narrow Results</h2>
          <section>
            <h3 class="h5 sc">Affliction</h3>
            <ul class="unstyled">
              <li><a href="#">Addiciton</a></li>
              <li><a href="#">Anxiety or Fears</a></li>
              <li><a href="#">Attention Deficit/ADHD</a></li>
              <li><a href="#">Child or Adolescent</a></li>
              <li><a href="#">Depression</a></li>
            </ul>
          </section>
          <section>
            <h3 class="h5 sc">Sexuality</h3>
            <ul class="unstyled">
              <li><a href="#">Bisexual</a></li>
              <li><a href="#">Gay</a></li>
              <li><a href="#">Lesbian</a></li>
              <li><a href="#">Transexual</a></li>
            </ul>
          </section>
        </aside><!-- /.sidebar -->

      </div><!-- /.content.row -->
      
    </section>

<?php endwhile; ?>
<!-- post navigation -->
<?php else: ?>
<!-- no posts found -->
<?php endif; ?>


<?php get_footer(); ?>