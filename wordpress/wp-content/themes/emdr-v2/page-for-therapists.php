<?php get_header();
 // Template Name: For Therapists
?> 

    <section class="hero">
      <div class="container">
        <div class="row intro">
          <div class="col-lg-7">
            
            <h1 class="h2">7,500 visitors per month, and growing.</h1>

            <p>Get listed on the most robust and broad-reaching database of EMDR Therapists</p>

            <a href="/profilebuilder/_wf-p1.php" class="btn btn-secondary btn-large">Get Listed Today!</a>

          </div>
        </div>
        <div class="hero-overlay"></div>
      </div>
    </section>
    
    <div class="stripe">
    <?php get_template_part('templates/home-cols') ?>
    </div>

    <section class="stripe">
      <div class="container">
        <div id="credibility-findability" class="row">
          <img class="img-responsive col-sm-5 gfx" src="<?php bloginfo('template_directory') ?>/assets/img/for-therapists/gfx-credibility.jpg" alt="">
          <div class="col-sm-7 col-offset-5 sans">
            <?php 
            $credability = get_field('credability_section');
            if($credability)
            {
              foreach($credability as $row){ ?>
              <h2><?php echo $row['section_title'] ?></h2>
              <?php echo $row['section_body'] ?>
              <a href="<?php echo $row['section_page_link'] ?>" class="btn btn-therapist btn-large"><?php echo $row['section_cta'] ?></a>
              <?php
              }
            } ?>
          </div>
        </div>
      </div>
    </section>

    <section class="stripe">
      <div class="container">
        <div class="row">
          <div class="col-sm-9">
            <blockquote id="ft-testimonial">
              <p>“Have you considered developing a website for your practice? The EMDR Therapist Network has made this incredibly easy for all EMDR therapists. You will see how helpful, thorough and professional this personal website can be for you.”</p>
              <small><strong>Karen Forte</strong> <span>LCSW, DCSW (OR) Regional Coordinator</span></small>
            </blockquote>
            <a href="<?php echo get_permalink(53); ?>" class="btn btn-therapist" style="margin-left:28px;">View Member Testimonials</a>
          </div>
          <div class="col-sm-3">
            <img class="hidden-sm" src="<?php bloginfo('template_directory'); ?>/assets/img/for-therapists/gfx-profileimg.jpg" alt="">
          </div>
        </div>
      </div>
    </section>

    <section id="eligibility" class="stripe">
      <div class="container">
        <div class="row">
          <?php 
          $secondary = get_field('secondary_columns');
          if($secondary)
          {
            foreach($secondary as $row){ ?>
            <div class="col-sm-6 box">
              <div>
                <div class="box-content">
                  <img src="<?php bloginfo('template_directory'); ?>/assets/img/for-therapists/icn-eligibility.png" alt="">
                  <h3 class="box-title"><?php echo $row['column_title'] ?></h3>
                  <?php echo $row['column_body'] ?>
                  <a href="<?php echo $row['cta_page_link'] ?>" class="btn btn-therapist btn-large"><?php echo $row['cta_text'] ?></a>
                </div>
              </div>
            </div>
            <?php
            }
          } ?>
        </div>
      </div>
    </section>

    <?php get_template_part( 'templates/content', 'support_growth' ) ?>

<?php get_footer(); ?>
