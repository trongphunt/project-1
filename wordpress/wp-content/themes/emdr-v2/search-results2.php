<?php
// Template Name: Search Results 2

$search_text = "";
$rows = 5;

if($_REQUEST['search_text'] != '') {
	$search_text = trim($_REQUEST['search_text']);
	$search_text = str_replace('United States', '', $search_text);
	$distance = intval($_REQUEST['distance']);
	$distance = in_array($distance,array(25,50,100)) ? $distance : 25;
	$consultant = isset($_REQUEST['search_consultant']) && $_REQUEST['search_consultant'] == 'true';
	header('Location:/therapist/' . str_replace(' ', '-', trim(strtolower($search_text))));
}

get_header();

?>

	<script type="text/javascript">

		//public urls;
		var template_directory = "<?php bloginfo('template_directory'); ?>";
		var proxy_url = "<?php echo get_permalink(get_page_by_path('_proxy_template')); ?>";
		var page_url = "<?php echo get_permalink(get_page_by_path('search-results')); ?>";
		var profile_path = "<?php echo home_url('therapists/'); ?>";
		var admin_ajax_url = '<?php echo admin_url( 'admin-ajax.php' ); ?>';
		var rows = "<?php echo $rows; ?>";

		var SEARCH_RESULT_STATE=0;

		jQuery(document).ready(function($) {
			createHash();
		});

	</script>

	<input type="hidden" id="search_query" name="search_query" value="<?php echo $search_text; ?>" />
	<input type="hidden" id="search_consultant" name="search_consultant" value="<?php echo $consultant ? 'true' : 'false'; ?>" />
	<input type="hidden" id="search_page" name="search_page" value="1" />
	<input type="hidden" id="search_distance" name="search_distance" value="<?php echo $distance; ?>" />

	<div id="search_results_empty" style="display:none">
		<?php get_template_part('templates/content', 'hero_searchbox'); ?>
	</div>

	<div id="search_results_list">

		<div id="search-loading"></div>

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

					<div id="main" class="col-sm-10 col-push-2" role="main">

						<p class="h5 sc results-summary">Showing no result</p>

						<div class="section-divider">
							<div class="section-icon"></div>
						</div>

						<h1 id="search-header">EMDR <span class="user-type"></span> <span class="editable-region-container"><span class="editable-region"><?php echo $search_text; ?></span> <span class="edit-text">Click to edit</span></span></h1>

						<div class="sc" id="search-filters">
							<h5 id="search-filters-header">Your selections: </h5>
							<!--
                            <small id="affliction-filter" class="search-filter">
                              <span></span><a class="cancel" href="javascript:void(0);" title="remove"></a>
                            </small> -->

							<small id="gender-filter" class="search-filter">
								<span></span><a class="cancel" href="javascript:void(0);" title="remove"></a>
							</small>

							<small id="language-filter" class="search-filter">
								<span></span><a class="cancel" href="javascript:void(0);" title="remove"></a>
							</small>

							<small id="practice_yrs-filter" class="search-filter">
								<span></span><a class="cancel" href="javascript:void(0);" title="remove"></a>
							</small>

							<!--   <small id="sexuality-filter" class="search-filter">
                                 <span></span><a class="cancel" href="javascript:void(0);" title="remove"></a>
                               </small> -->

						</div>

						<div class="search-results">

							<div class="results-pagination text-center col-sm-10">
								<ul class="pagination">
								</ul>
							</div>

						</div>

					</div><!-- /#main -->

					<aside class="col-sm-2 col-pull-10 refine-search hidden-sm" role="complementary">
						<h2 class="sidebar-header h5 sc">Narrow Results</h2>
						<section>
							<h3 class="h5 sc">Reason for seeking help</h3>
							<ul class="unstyled" id="affliction">
								<!-- <li><a href="javascript:void(0)">Addiciton</a></li>
                                 <li><a href="javascript:void(0)">Anxiety or Fears</a></li>
                                 <li><a href="javascript:void(0)">Attention Deficit/ADHD</a></li>
                                 <li><a href="javascript:void(0)">Child or Adolescent</a></li>
                                 <li><a href="javascript:void(0)">Depression</a></li> -->
							</ul>
							<br>
							<a href="javascript:generateAfflictions(false)" id="showMoreAffliction" class="btn btn-primary">Show More</a>
							<h3 class="h5 sc">Gender</h3>
							<ul class="unstyled" id="gender">
								<li><a href="javascript:void(0)" class="female">Female</a></li>
								<li><a href="javascript:void(0)" class="male">Male</a></li>
							</ul>
							<h3 class="h5 sc">Language</h3>
							<ul class="unstyled" id="language">
								<!-- <li><a href="javascript:void(0)" class="english">English</a></li>
                                 <li><a href="javascript:void(0)" class="french">French</a></li>
                                 <li><a href="javascript:void(0)" class="german">German</a></li>
                                 <li><a href="javascript:void(0)" class="russian">Russian</a></li>
                                 <li><a href="javascript:void(0)" class="spanish">Spanish</a></li> -->
							</ul>
							<h3 class="h5 sc">Years In Practice</h3>
							<ul class="unstyled" id="practice_yrs">
								<li><a href="javascript:void(0)" class="less5">Less than 5</a></li>
								<li><a href="javascript:void(0)" class="more5">5+</a></li>
								<li><a href="javascript:void(0)" class="more10">10+</a></li>
								<li><a href="javascript:void(0)" class="more20">20+</a></li>
								<li><a href="javascript:void(0)" class="more30">30+</a></li>
							</ul>
							<h3 class="h5 sc">Profession</h3>
							<ul class="unstyled" id="profession">
							</ul>
							<br>
						</section>
						<!-- <section>
                           <h3 class="h5 sc">Sexuality</h3>
                           <ul class="unstyled" id="sexuality">
                             <li><a href="javascript:void(0)">Bisexual</a></li>
                             <li><a href="javascript:void(0)">Gay</a></li>
                             <li><a href="javascript:void(0)">Lesbian</a></li>
                             <li><a href="javascript:void(0)">Transexual</a></li>
                           </ul>
                         </section> -->
					</aside> <!-- /.sidebar -->

				</div><!-- /.content.row -->

			</section>

		<?php endwhile; ?>
			<!-- post navigation -->
		<?php else: ?>
			<!-- no posts found -->
		<?php endif; ?>
	</div>

<?php get_footer(); ?>