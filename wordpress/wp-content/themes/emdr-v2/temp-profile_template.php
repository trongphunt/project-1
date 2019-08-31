<?php get_header();
// Template Name: Temporary Profile Template ?>

<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

    <section id="profile" class="container">
      <div class="row">

        <div class="alert text-center">
          This page will be populated completely with JSON content
        </div>

        <div class="col-12">
          <?php get_template_part( 'templates/snippet', 'breadcrumbs' ); ?>

          <div class="section-divider">
            <div class="section-icon"></div>
          </div>
        </div>

      </div>

      <header class="row profile-header">

        <div class="col-lg-2">
          <div class="profile-image" style="background-image: url(http://placehold.it/146x146);">
            <img class="img-responsive" src="<?php bloginfo('template_directory'); ?>/assets/img/gfx-portal.png" alt="">
          </div>
        </div>

        <div class="col-lg-7">
          <h1 class="profile-name">
            Your Name Here <small>PH.D, LPC NBCC</small>
          </h1>

          <div class="table sans">
            <div class="col-sm-2 cell">
              <div class="verified">Verified</div>
            </div>
            <div class="col-sm-3 cell"><small>Occupation:</small> Therapist</div>
            <div class="col-sm-2 cell"><small>In Practice For:</small> 5 Years</div>
            <div class="col-sm-2 cell"><small>Using EMDR:</small> 2 Years</div>
            <div class="col-sm-3 cell cell-social">
              <div class="social-btns btn-group">
                <a target="_blank" href="EMDRtherapist" class="btn btn-default"><span class="icn-twitter text-hide">On Twitter</span></a>
                <a target="_blank" href="EMDRtherapist" class="btn btn-default"><span class="icn-facebook text-hide">On Facebook</span></a>
                <!-- <a target="_blank" href="EMDRtherapist" class="btn btn-default"><span class="icn-google text-hide">On Google+</span></a> -->
                <a href="/blog/" class="btn btn-default"><span class="icn-blog text-hide">EMDR Blog</span></a>
              </div>
            </div>
          </div>
        </div><!-- .col-sm-7 -->

        <div class="col-lg-2 col-offset-1 btn-group-contact">
          <a href="#" class="btn btn-primary btn-block btn-small">Email Me</a>
          <a href="#" class="btn btn-primary btn-block btn-small">Visit Website</a>
          <a href="#" class="btn btn-primary btn-block btn-small hidden-sm" data-toggle="button">Add Favorite</a>
        </div>

        <hr class="col-12">

      </header><!-- .row -->

      <div class="row">
        <div class="profile-sidebar col-lg-3" role="complementary">
          <div class="well">
            <section>
              <h3>TherapU</h3>
              <div class="row">
                <p class="col-6 col-lg-12">
                  <span class="small-title">Phone:</span> (208) 555 1234<br>
                  <span class="small-title">Fax:</span> (208) 555 1235
                </p>
                <p class="col-6 col-lg-12">
                  <span class="small-title">Address:</span> <br>
                  300 1st Ave W<br>
                  Suite CM<br>
                  Jerome, ID 83338
                </p>
                <p class="bldg-access col-6 col-lg-12">
                  <span class="small-title">Accessibility:</span><br>
                  <img src="<?php bloginfo('template_directory'); ?>/assets/img/icn-bus.png" alt="">
                  <img src="<?php bloginfo('template_directory'); ?>/assets/img/icn-wheelchair.png" alt="">
                </p>
              </div>
            </section>

            <div class="visible-lg">
            
              <div class="flex-video map">
                <iframe class="" width="200" height="115" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=822+SE+13th+Ave,+Portland,+OR&amp;aq=0&amp;oq=822+SE+13&amp;sll=44.145447,-120.583402&amp;sspn=8.214551,12.601318&amp;ie=UTF8&amp;hq=&amp;hnear=822+SE+13th+Ave,+Portland,+Oregon+97214&amp;t=m&amp;ll=45.517053,-122.652655&amp;spn=0.006916,0.017252&amp;z=14&amp;iwloc=A&amp;output=embed"></iframe>
              </div>

              <section>
                <h3 class="small-title">Blog Posts:</h3>
                <ul class="list-unstyled post-list">
                  <li><a href="#">Mindfulness</a> <div class="entry-meta">Posted: 3/14/2015</div></li>
                  <li><a href="#">State of the Art Wellness - A Look Into Your Mind</a> <div class="entry-meta">Posted: 3/14/2015</div></li>
                  <li><a href="#">The 100th Monkey</a> <div class="entry-meta">Posted: 3/14/2015</div></li>
                </ul>
              </section>

              <section>
                <h3 class="small-title">Upcoming Events:</h3>
                <ul class="list-unstyled post-list">
                  <li><a href="#">Event Name</a> <div class="entry-meta">Posted: 3/14/2015</div></li>
                  <li><a href="#">Event Name That’s A Little Longer Than Most</a> <div class="entry-meta">Posted: 3/14/2015</div></li>
                  <li><a href="#">Event Name</a> <div class="entry-meta">Posted: 3/14/2015</div></li>
                </ul>
              </section>
            </div><!-- .hidden-sm -->

          </div>
        </div>
        <div id="main" class="col-lg-7" role="main">
          <div class="profile-main-inner">
            <h2>Specializing in you.</h2>
            <p>Globular star cluster, as a patch of light, courage of our questions? Cambrian explosion are creatures of the cosmos Vangelis a still more glorious dawn awaits dream of the mind's eye inconspicuous motes of rock and gas tesseract, explorations preserve and cherish that pale blue dot worldlets? Prime number colonies. Consciousness worldlets. Corpus callosum cosmos another world finite but unbounded emerged into consciousness great turbulent clouds? Bits of moving fluff something incredible is waiting to be known, realm of the galaxies prime number. Dream of the mind's eye, Sea of Tranquility citizens of distant epochs science from which we spring prime number vanquish the impossible. Galaxies culture across the centuries.</p>

            <div class="section-divider">
              <div class="section-icon"></div>
            </div>

            <div class="row">
              <ul class="profile-list testimonials col-12">
                <li class="small-title">Testimonials:</li>
                <li>“Faster than a speeding bullet, more powerful than a locomotive, and able to leap tall buildings in a single bound."</li>
              </ul>
            </div>
            
            <div class="section-divider">
              <div class="section-icon"></div>
            </div>
            
            <ul class="treatment-categories profile-list row">
              <li class="small-title">Treatment For</li>
              <li>Academic Underachievement</li>
              <li>Loss or Grief</li>
              <li>Anger Management</li>
              <li>Antisocial Personality</li>
              <li>Oppositional Defiance</li>
              <li>Asperger's Syndrome</li>
              <li>Attention Deficit (ADHD)</li>
              <li>Peer Relationships</li>
              <li>Borderline Personality</li>
              <li>Academic Underachievement</li>
              <li>Loss or Grief</li>
              <li>Anger Management</li>
              <li>Antisocial Personality</li>
              <li>Oppositional Defiance</li>
              <li>Asperger's Syndrome</li>
              <li>Attention Deficit (ADHD)</li>
              <li>Peer Relationships</li>
              <li>Borderline Personality</li>
            </ul>

            <div class="section-divider">
              <div class="section-icon"></div>
            </div>

            <div class="row">

              <ul class="profile-list col-4">
                <li class="small-title">Services</li>
                <li>Symptom X</li>
              </ul>

              <ul class="profile-list col-4">
                <li class="small-title">Ages Served</li>
                <li>Adolescents / Teenagers</li>
                <li>Adults</li>
              </ul>

              <ul class="profile-list col-4">
                <li class="small-title">Languages</li>
                <li>English</li>
                <li>Latin</li>
              </ul>

              <ul class="profile-list col-4">
                <li class="small-title">Special Population Focus:</li>
                <li>All Types</li>
              </ul>

              <ul class="profile-list col-4">
                <li class="small-title">Religious / Spiritual:</li>
                <li>Everyone</li>
              </ul>

              <ul class="profile-list col-4">
                <li class="small-title">Special Services:</li>
                <li>Evening Appts</li>
              </ul>

            </div><!-- .row -->

            <div class="section-divider">
              <div class="section-icon"></div>
            </div>

            <div class="row">
              <ul class="profile-list col-4">
                <li class="small-title">Fees:</li>
                <li>X to Y</li>
              </ul>

              <ul class="profile-list col-4">
                <li class="small-title">Financial Arrangements:</li>
                <li>Pro Bono</li>
                <li>Sliding Scale</li>
              </ul>

              <ul class="profile-list col-4">
                <li class="small-title">Payments Accepted:</li>
                <li>Cash</li>
                <li>Check</li>
                <li>Visa</li>
              </ul>

              <ul class="profile-list col-4">
                <li class="small-title">In-Network For:</li>
                <li>Company</li>
                <li>Company</li>
                <li>Company</li>
              </ul>

            </div>
          
          </div><!-- .profile-main-inner -->
        </div><!-- #main -->

        <div class="profile-sidebar col-12 col-lg-2 pull-right" role="complementary">
          <section>
            <h3 class="small-title">EMDR Training:</h3>
            <p>Basic EMDR Training<br> 
            Advanced EMDR Training</p>
          </section>

          <section>
            <h3 class="small-title">EMDR Training:</h3>
            <p>Other Therapies USed:<br> 
            None</p>
          </section>

          <section>
            <h3 class="small-title">Certifications:</h3>
            <p>Other Therapies USed:<br> 
            (LCSW) Board Certified (2005)<br>
            Diplomate in Clinical Social Work (2010)</p>
          </section>

          <section>
            <h3 class="small-title">Education:</h3>
            <p>Other Therapies USed:<br> 
            PhD in Therapy<br>
            Mount Saint Vincent (2003)<br>

            <p>Degree<br>
            Institution (2009)</p>
          </section>

          <section>
            <h3 class="small-title">Licensing Status:</h3>
            <p>Licence Reg #<br>
            Issuing Authority<br>
            Practicing Under</p>
          </section>

          <section>
            <h3 class="small-title">Professional Affiliations:</h3>
            <p>Affiliation 01<br>
            Affiliation 02</p>
          </section>

          <section>
            <h3 class="small-title">Accomplishments:</h3>
            <p>Accomplishment 01 (2003)<br>
            Accomplishment 02 (2009)</p>
          </section>
        </div>

      </div><!-- .row -->

    </section>

<?php endwhile; endif; ?>


<?php get_footer(); ?>