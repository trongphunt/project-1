<?php
/**
 * Created by PhpStorm.
 * User: PHP Developer
 * Date: 11/25/2016
 * Time: 10:40 AM
 */
// Template Name: Search Results Fancy Url

$search_text = "";
$rows = 5;
$boru_search_route = $wp_query->query_vars['route'];
$search_text = str_replace("-", " ", $boru_search_route);

$distance = $wp_query->query_vars['distance'];
$distance = in_array($distance,array(25,50,100)) ? $distance : 25;

$no_location = $wp_query->query_vars['no_location'];  

$consultant = false;
if($wp_query->query_vars['search_consultant'] == true){
	$consultant = true;
}
/*print_r($wp_query->query_vars);
print_r($_REQUEST);
echo $consultant; exit; */
// Build param and request to api get data
$token = $wp_query->query_vars['token'];
if (empty($token)) $token = substr( md5( time() . rand() ), 0, 16 );
$result = boru_search($boru_search_route,$distance,$consultant,$token,$no_location);
$listSearchResult = $result['data']['therapists'];
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
var search_token_key = "<?php echo $token; ?>"; 
	var SEARCH_RESULT_STATE=0;

	// Parse data from request
    var search_params = <?php echo json_encode($result['data']);?>;
    /*
    jQuery(document).ready(function($) {
        prepareSearchTherapists(search_params);
     // task_id=29162
		  $("#profession").parent().hide();
    });*/

    jQuery(document).ready(function($) {
    	console.log('after load page : createHash');
		var hash_str = location.hash;
    	console.log('location.hash : ',hash_str); 
		if (hash_str.length == 0)  createHash(); // task_id=38179 , just create when fist load    	
		  
		// task_id=29162
		  $("#profession").parent().hide();
	});


</script>

<style type="text/css">
.list-inline a {
    display: block;
    padding-left: 1em;
    text-indent: -1em;
}
</style>

<input type="hidden" id="search_query" name="search_query" value="<?php echo $search_text; ?>" />
<input type="hidden" id="search_consultant" name="search_consultant" value="<?php echo $consultant ? 'true' : 'false'; ?>" />
<input type="hidden" id="search_page" name="search_page" value="1" />
<input type="hidden" id="search_distance" name="search_distance" value="<?php echo $distance; ?>" />
<input type="hidden" id="search_total" name="search_total" value="<?php echo count($listSearchResult); ?>" />
<input type="hidden" id="no_location" name="no_location" value="<?php echo $no_location; ?>" />

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

	          <h1 id="search-header">EMDR <span class="user-type"></span> <span class="editable-region-container"><span class="editable-region"><?php echo $search_text; ?></span> <span class="edit-text-2">Click to edit</span></span>
	          <!-- #32369 -->
	          <select id="distances_n" name="distance" style="width: 100px;margin-left: 10px;">
                    <option value="25" <?php if($distance == 25) echo 'selected'; ?>>25 miles</option>
                    <option value="50" <?php if($distance == 50) echo 'selected'; ?>>50 miles</option>
                    <option value="100" <?php if($distance == 100) echo 'selected'; ?>>100 miles</option>
                   </select>

               </h1>
                <div id="page_warning" style="display: none;">Not enough nearby results were found so the search radius was expanded.</div>
	           <div id="success_search"></div>
               <div id="success_search_2"></div>
               <style>

               .search-filter{
                  display:none;
               }
               </style>
	          <div class="sc" id="search-filters">
	            <h5 id="search-filters-header">Your selections: </h5>
	            <!--
	            <small id="affliction-filter" class="search-filter">
	              <span></span><a class="cancel" href="javascript:void(0);" title="remove"></a>
	            </small> -->

				<small id="gender-filter" class="search-filter">
	              <span></span><a class="cancel" href="javascript:void(0);" title="remove"></a>
	            </small>
				<!-- consultant -->

                <small id="consultation-filter" class="search-filter">
	              <span></span><a class="cancel" href="javascript:void(0);" title="remove"></a>
	            </small>

				<small id="emdr_basic_training-filter" class="search-filter">
	              <span></span><a class="cancel" href="javascript:void(0);" title="remove"></a>
	            </small>

                <small id="emdr_ceu-filter" class="search-filter">
	              <span></span><a class="cancel" href="javascript:void(0);" title="remove"></a>
	            </small>
	            <small id="face-filter" class="search-filter">
	              <span></span><a class="cancel" href="javascript:void(0);" title="remove"></a>
	            </small>
	            <small id="phone-filter" class="search-filter">
	              <span></span><a class="cancel" href="javascript:void(0);" title="remove"></a>
	            </small>
	            <small id="email-filter" class="search-filter">
	              <span></span><a class="cancel" href="javascript:void(0);" title="remove"></a>
	            </small>
	            <small id="skype-filter" class="search-filter">
	              <span></span><a class="cancel" href="javascript:void(0);" title="remove"></a>
	            </small>
	            <small id="forum-filter" class="search-filter">
	              <span></span><a class="cancel" href="javascript:void(0);" title="remove"></a>
	            </small>

	            <small id="trainee-filter" class="search-filter">
	              <span></span><a class="cancel" href="javascript:void(0);" title="remove"></a>
	            </small>
	            <small id="individual-filter" class="search-filter">
	              <span></span><a class="cancel" href="javascript:void(0);" title="remove"></a>
	            </small>
	            <small id="group-filter" class="search-filter">
	              <span></span><a class="cancel" href="javascript:void(0);" title="remove"></a>
	            </small>
	            <small id="specifypopulation-filter" class="search-filter">
	              <span></span><a class="cancel" href="javascript:void(0);" title="remove"></a>
	            </small>
	            <small id="emdria_cert-filter" class="search-filter">
	              <span></span><a class="cancel" href="javascript:void(0);" title="remove"></a>
	            </small>

	            <small id="studygroup-filter" class="search-filter">
	              <span></span><a class="cancel" href="javascript:void(0);" title="remove"></a>
	            </small>
	            <small id="non_training_oppty-filter" class="search-filter">
	              <span></span><a class="cancel" href="javascript:void(0);" title="remove"></a>
	            </small>
	            <small id="clinical_supervision-filter" class="search-filter">
	              <span></span><a class="cancel" href="javascript:void(0);" title="remove"></a>
	            </small>

	            <!-- end consultant -->
                <small id="language-filter" class="search-filter">
	              <span></span><a class="cancel" href="javascript:void(0);" title="remove"></a>
	            </small>

				<small id="practice_yrs-filter" class="search-filter">
	              <span></span><a class="cancel" href="javascript:void(0);" title="remove"></a>
	            </small>
	            <small id="emdr_yrs-filter" class="search-filter">
	              <span></span><a class="cancel" href="javascript:void(0);" title="remove"></a>
	            </small>

                <small id="list_countries-filter" class="search-filter">
	              <span></span><a class="cancel" href="javascript:void(0);" title="remove"></a>
	            </small>

                <small id="list_states-filter" class="search-filter">
	              <span></span><a class="cancel" href="javascript:void(0);" title="remove"></a>
	            </small>

                <small id="transportation-filter" class="search-filter">
	              <span></span><a class="cancel" href="javascript:void(0);" title="remove"></a>
	            </small>
				<small id="accessible-filter" class="search-filter">
	              <span></span><a class="cancel" href="javascript:void(0);" title="remove"></a>
	            </small>
	            <small id="feebase_consultation-filter" class="search-filter">
	              <span></span><a class="cancel" href="javascript:void(0);" title="remove"></a>
	            </small>



	         <!--   <small id="sexuality-filter" class="search-filter">
	              <span></span><a class="cancel" href="javascript:void(0);" title="remove"></a>
	            </small> -->

	          </div>

              <div style="width: 100%; margin: 0 auto; text-align: center;">
              	Results per Page
          		<select id="rows_numbers" style="width: 55px;">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
               </select>
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

	            <?if($consultant == true):?>

	          <? else:?>
	            <h3 class="h5 sc"><a href="javascript:void(0)" class="showmoreSection" >Insurance</a></h3>

	            <ul style="" class="unstyled">
	            <li><a href="javascript:void(0)" class="showmore show_more_insurance_list"><span class="cplus"><img src="/wp-content/themes/emdr-v2/assets/img/up24.png"></span> Out of Network</a>
						<ul class="list-inline">
							<li id="all_insurance"><a href="javascript:void(0)">All therapists</a></li>
						</ul>
					</li>
	            <li><a href="javascript:void(0)" class="showmore show_more_insurance_list"><span class="cplus"><img src="/wp-content/themes/emdr-v2/assets/img/down24.png"></span> In Network</a>
						<ul class="list-inline" style="display: none; " id="insurance_list_ul">
							<li id="insurance_list"></li>
						</ul>
					</li>
	            </ul>
	             <? endif;?>

	            <?if($consultant != true):?>
	           <h3 class="h5 sc"><a href="javascript:void(0)" class="showmoreSection" >Services</a></h3>
	          <ul style="display: block;" class="unstyled">
				  <li id="modalities_li" style="display: block;  width: auto;"><a style="display: inline;" href="javascript:void(0)" class="showmore showmore-modalities" ><span class="cplus"><img src="/wp-content/themes/emdr-v2/assets/img/down24.png"></span> Types</a>
				  	<ul class="list-inline" id="modalities" style="display: none;"></ul>
				  </li>
				  <li id="ages_li" style="display: block;float: left; width: auto;"><a style="display: inline;" href="javascript:void(0)" class="showmore-ages" ><span class="cplus"><img src="/wp-content/themes/emdr-v2/assets/img/down24.png"></span> Age</a>
				  	<ul class="list-inline" id="ages" style="display: none;"></ul>
				  </li>
				  <li><a href="javascript:void(0)" class="showmoreFilter" >more...</a></li>
	              <li class="in_morefilter" ><a href="javascript:void(0)" class="showmore showmore_Populations"><span class="cplus"><img src="/wp-content/themes/emdr-v2/assets/img/down24.png"></span> Populations</a>
	              <ul class="list-inline" style="display: none" id="population"></ul>
	              </li>

	              <li class="in_morefilter" ><a href="javascript:void(0)" class="showmore showmore_Extras"><span class="cplus"><img src="/wp-content/themes/emdr-v2/assets/img/down24.png"></span> Extras</a>
<ul class="list-inline" style="display: none" id="acceptphoneconsultationfree"></ul>

	              </li>
	              <li class="in_morefilter" ><a href="javascript:void(0)" class="showmore showmore_Services"><span class="cplus"><img src="/wp-content/themes/emdr-v2/assets/img/down24.png"></span> Special interest</a>
	              <ul class="list-inline" style="display: none" id="religious"></ul>
	              </li>

	              <li class="in_morefilter" id="othertherapy_list_li" ><a href="javascript:void(0)" class="showmore-othertherapy_list" ><span class="cplus"><img src="/wp-content/themes/emdr-v2/assets/img/down24.png"></span> Therapies</a>
	              <ul class="list-inline" id="othertherapy_list" style="display: none; width: 170px;overflow: hidden;white-space: normal;"></ul>
				  </li>

	              <li class="fewerfilter"><a href="javascript:void(0)" class="lessFilter" >less...</a></li>
	            </ul>
	           <? endif;?>

	            <h3 class="h5 sc"><a href="javascript:void(0)" class="showmoreSection" >Location</a></h3>
	          <ul class="unstyled">
				  <li id="cities_li" style="display: block;white-space: normal; width: auto;"><a style="display: inline;" href="javascript:void(0)" class="showmore-cities" ><span class="cplus"><img src="/wp-content/themes/emdr-v2/assets/img/down24.png"></span> Cities</a>
				  	<ul class="list-inline" id="cities" style="display: none;"></ul>
				  </li>
				  <li><a href="javascript:void(0)" class="showmoreFilter" >more...</a></li>

	              <!-- <li class="in_morefilter" style="display: none"><a href="javascript:void(0)" class="showmore"><span class="cplus">+</span> Counties</a><ul class="list-inline" style="display: none" id="counties"></ul></li> -->
	              <li class="in_morefilter"><a href="javascript:void(0)" class="showmore"><span class="cplus"><img src="/wp-content/themes/emdr-v2/assets/img/down24.png"></span> ZIP/Postal code</a><ul class="list-inline" style="display: none" id="postal"></ul></li>

	              <?if($consultant != true):?>
	              <li class="fewerfilter"><a href="javascript:void(0)" class="lessFilter" >less...</a></li>
	              <!-- <li class="in_morefilter" style="margin: 10px;">
                      <input id="transportation" class="transportation" type="checkbox" style="display: none;">
                      <img class="img-transportation" src="/wp-content/themes/emdr-v2/assets/img/icn-bus.png" alt="Near public transportation" title="Near public transportation" style=" cursor: pointer;">
                      &nbsp;&nbsp;&nbsp;
                      <input id="accessible" class="accessible" type="checkbox" style="display: none;">
                      <img class="img-accessible" src="/wp-content/themes/emdr-v2/assets/img/icn-wheelchair.png" alt="Wheelchair accessible" title="Wheelchair accessible" style=" cursor: pointer;">
                  </li> -->

	              <li style="    clear: both;"></li>
	              <?php else:?>
	              
	              <? endif;?>

	            </ul>

	             <?if($consultant == true):?>
	          <h3 class="h5 sc"><a href="javascript:void(0)" class="showmoreSection" ><span class="cplus">+</span> EMDR Training offered</a></h3>
	          <ul style="display: none" class="unstyled">
	          <li><input id="consultation" class="consultation" type="checkbox">EMDR consultation</li>
	          <li><input id="emdr_basic_training" class="emdr_basic_training" type="checkbox">EMDR Basic Training</li>
	          <li><input id="emdr_ceu" class="emdr_ceu" type="checkbox">EMDR CEU</li>
	          <li><input id="studygroup" class="studygroup" type="checkbox">EMDR Study Group</li>

	          </ul>

	          <h3 class="h5 sc"><a href="javascript:void(0)" class="showmoreSection" ><span class="cplus">+</span> Distance learning available</a></h3>
	          <ul style="display: none" class="unstyled">
	          <li><a href="javascript:void(0)" class="showmoreFilter" >more...</a></li>
	          <li class="in_morefilter"><input id="face" class="face-to-face" type="checkbox">Face-to-Face</li>
	           <li class="in_morefilter"><input id="phone" class="phone" type="checkbox">Phone</li>
	          <li class="in_morefilter"><input id="email" class="email" type="checkbox">E-Mail</li>
	          <li class="in_morefilter"><input id="skype" class="skype" type="checkbox">Skype or other video conferencing</li>
	          <li class="in_morefilter"><input id="forum" class="forum" type="checkbox">Web Forum</li>
	          <li class="fewerfilter"><a href="javascript:void(0)" class="lessFilter" >less...</a></li>
	          </ul>


	        <!--   <h3 class="h5 sc"><a href="javascript:void(0)" class="showmoreSection" ><span class="cplus">+</span> Therapists Served</a></h3>
	          <ul style="display: none" class="unstyled">
	          <li><a href="javascript:void(0)" class="showmoreFilter" >more...</a></li>
	          <li class="in_morefilter"><input id="trainee" class="trainee" type="checkbox">EMDR Trainees</li>
	          <li class="in_morefilter"><input id="individual" class="individual" type="checkbox">Individuals</li>
	          <li class="in_morefilter"><input id="group" class="group" type="checkbox">Groups</li>
	          <li class="in_morefilter"><input id="specifypopulation" class="specifypopulation" type="checkbox">Specific Population</li>
	          <li class="in_morefilter"><input id="emdria_cert" class="emdria_cert" type="checkbox">EMDRIA Certification</li>
	          <li class="fewerfilter"><a href="javascript:void(0)" class="lessFilter" >less...</a></li>
	          </ul>
 -->

	          <!-- <h3 class="h5 sc"><a href="javascript:void(0)" class="showmoreSection" ><span class="cplus">+</span> Other EMDR Services</a></h3>
	          <ul style="display: none" class="unstyled">
	          <li><input id="studygroup" class="studygroup" type="checkbox">EMDR Study Group</li>
	          </ul>

	          <h3 class="h5 sc"><a href="javascript:void(0)" class="showmoreSection" ><span class="cplus">+</span> Other Training offered</a></h3>
	          <ul style="display: none" class="unstyled">
	          <li><input id="clinical_supervision" class="clinical_supervision" type="checkbox">Clinical Supervision</li>
	          <li><span id="nonemdr_training" ></span></li> -->
	          <!-- <li><a href="javascript:void(0)" class="showmoreFilter" >more filters</a></li>
	          <li class="in_morefilter"><input id="non_training_oppty" class="non_training_oppty" type="checkbox">Non-EMDR training opportunities</li>
	          <li class="fewerfilter"><a href="javascript:void(0)" class="lessFilter" >less...</a></li> -->
	          <!-- </ul> -->



	          <? endif;?>

	          	<?if($consultant == true):?>
	          <h3 class="h5 sc"><a href="javascript:void(0)" class="showmoreSection" >Consultant details</a></h3>
	          <? else:?>
	           <h3 class="h5 sc"><a href="javascript:void(0)" class="showmoreSection" >Therapists</a></h3>
	           <? endif;?>
	          <ul style="" class="unstyled">
				  <li><a href="javascript:void(0)" class="showmore" style="display: inline;"><span class="cplus"><img src="/wp-content/themes/emdr-v2/assets/img/down24.png"></span> Gender</a>
					<ul class="list-inline" id="gender" style="display: none;">
					  <li  ><a style="display: inline;" href="javascript:void(0)" class="female">Female</a></li>
		              <li  ><a style="display: inline;" href="javascript:void(0)" class="male">Male</a></li>
		            </ul>
		          </li>
					<!-- <li><a href="javascript:void(0)" class="showmore"><span class="cplus">+</span> Language</a>
						<ul class="list-inline" style="display: none" id="language">
						</ul>
					</li> -->
					<li id="language_li" style="display: block;float: left;white-space: normal; width: auto;"><a style="display: inline;" href="javascript:void(0)" class="showmore-language" ><span class="cplus"><img src="/wp-content/themes/emdr-v2/assets/img/down24.png"></span> Language</a>
				  		<ul class="list-inline" id="language" style="display: none;"></ul>
			  		</li>
					<li><a href="javascript:void(0)" class="showmoreFilter" >more...</a></li>


				<li class="in_morefilter">
                <a href="javascript:void(0)" class="showmore"><span class="cplus"><img src="/wp-content/themes/emdr-v2/assets/img/down24.png"></span> Profession</a>
	            <ul class="list-inline" style="display: none" id="profession">
			</ul>
                </li>
                <li class="in_morefilter"><a href="javascript:void(0)"><span style="padding-left: 6px;">&nbsp;</span> Practice Yrs <select class="list-inline" id="practice_yrs" class="form-control" style="    width: 50px;">

					</select></a>
					</li>
               
                <li class="in_morefilter"><a href="javascript:void(0)"><span style="padding-left: 6px;">&nbsp;</span> EMDR Yrs &nbsp;&nbsp;<select class="list-inline" id="emdr_yrs" class="form-control" style="    width: 50px;">

					</select></a>

	              </li>

	              <li class="in_morefilter"><a href="javascript:void(0)" class="showmore"><span class="cplus"><img src="/wp-content/themes/emdr-v2/assets/img/down24.png"></span> EMDR Level</a>
	            <ul class="list-inline" style="display: none" id="training_completed">
				</ul>
				 <ul class="list-inline" style="display: none" id="advancedtraining">
				</ul>
	              </li>
               
                <li class="fewerfilter"><a href="javascript:void(0)" class="lessFilter" >less...</a></li>
<li style="    clear: both;"></li>
	            </ul>
   <?if($consultant == true):?>
	          <h3 class="h5 sc"><a href="javascript:void(0)" class="showmoreSection" ><span class="cplus">+</span> Fees</a></h3>
	          <ul style="display: none" class="unstyled">
	          <li class="fewerfilter"><a href="javascript:void(0)" class="lessFilter" >less...</a></li>
	              <li><input id="feebase_consultation" class="feebase_consultation" type="checkbox">Fee Based/No Fee</li>
	          </ul>


	          <? endif;?>

	          


				<?if($consultant != true):?>
	           <h3 class="h5 sc"><a href="javascript:void(0)" class="showmoreSection" >Location</a></h3>
	          <ul class="unstyled">
				  <li id="cities_li" style="display: block;white-space: normal; width: auto;"><a style="display: inline;" href="javascript:void(0)" class="showmore-cities" ><span class="cplus"><img src="/wp-content/themes/emdr-v2/assets/img/down24.png"></span> Cities</a>
				  	<ul class="list-inline" id="cities" style="display: none;"></ul>
				  </li>
				  <li><a href="javascript:void(0)" class="showmoreFilter" >more...</a></li>

	              <!-- <li class="in_morefilter" style="display: none"><a href="javascript:void(0)" class="showmore"><span class="cplus">+</span> Counties</a><ul class="list-inline" style="display: none" id="counties"></ul></li> -->
	              <li class="in_morefilter"><a href="javascript:void(0)" class="showmore"><span class="cplus"><img src="/wp-content/themes/emdr-v2/assets/img/down24.png"></span> ZIP/Postal code</a><ul class="list-inline" style="display: none" id="postal"></ul></li>

	              <?if($consultant != true):?>
	              <li class="fewerfilter"><a href="javascript:void(0)" class="lessFilter" >less...</a></li>
	              <!-- <li class="in_morefilter" style="margin: 10px;">
                      <input id="transportation" class="transportation" type="checkbox" style="display: none;">
                      <img class="img-transportation" src="/wp-content/themes/emdr-v2/assets/img/icn-bus.png" alt="Near public transportation" title="Near public transportation" style=" cursor: pointer;">
                      &nbsp;&nbsp;&nbsp;
                      <input id="accessible" class="accessible" type="checkbox" style="display: none;">
                      <img class="img-accessible" src="/wp-content/themes/emdr-v2/assets/img/icn-wheelchair.png" alt="Wheelchair accessible" title="Wheelchair accessible" style=" cursor: pointer;">
                  </li> -->

	              <li style="    clear: both;"></li>
	              <?php else:?>
	              <li class="fewerfilter"><a href="javascript:void(0)" class="lessFilter" >less...</a></li>
	              <li><input id="feebase_consultation" class="feebase_consultation" type="checkbox">Fee Based/No Fee</li>
	              <? endif;?>

	            </ul>
	             <? endif;?>
	            <?if($consultant != true):?>
	            <h3 class="h5 sc"><a href="javascript:void(0)" class="showmoreSection" >concerns</a></h3>
	          <ul style="" class="unstyled">
				  <!-- <li><a href="javascript:void(0)" class="showmore"><span class="cplus">+</span> Symptoms & conditions</a>
	            	<ul class="list-inline" style="display: none" id="specialtiesconditions"></ul>
				  </li> -->
				  <li id="specialtiesconditions_li" style="display: block;float: left;white-space: normal; width: auto;"><a style="display: inline;" href="javascript:void(0)" class="showmore-specialtiesconditions" ><span class="cplus"><img src="/wp-content/themes/emdr-v2/assets/img/down24.png"></span> Issues</a>
				  	<ul class="list-inline" id="specialtiesconditions" style="display: none;"></ul>
				  </li>
	              <!-- <li><a href="javascript:void(0)" class="showmore"><span class="cplus">+</span> Life & relationship situations</a>
	            	<ul class="list-inline" style="display: none" id="situation_list"></ul>
	              </li> -->
	              <li id="situation_list_li" style="display: block;float: left;white-space: normal; width: auto;"><a style="display: inline;" href="javascript:void(0)" class="showmore-situation_list" ><span class="cplus"><img src="/wp-content/themes/emdr-v2/assets/img/down24.png"></span> Relationships</a>
				  	<ul class="list-inline" id="situation_list" style="display: none;"></ul>
				  </li>
	              <!-- <li><a href="javascript:void(0)" class="showmore"><span class="cplus">+</span> Traumatic events & experiences</a>
		            <ul class="list-inline" style="display: none" id="traumatic_list">
		            </ul>
	              </li> -->
	              <li id="traumatic_list_li" style="display: block;float: left;white-space: normal; width: auto;"><a style="display: inline;" href="javascript:void(0)" class="showmore-traumatic_list" ><span class="cplus"><img src="/wp-content/themes/emdr-v2/assets/img/down24.png"></span> Trauma</a>
				  	<ul class="list-inline" id="traumatic_list" style="display: none;"></ul>
				  </li>
	              <!-- <li><a href="javascript:void(0)" class="showmore"><span class="cplus">+</span> Peak performance & positive changes</a>
		            <ul class="list-inline" style="display: none" id="performance_list">
		            </ul>
	              </li> -->
	              <li id="performance_list_li" style="display: block;float: left;white-space: normal; width: auto;"><a style="display: inline;" href="javascript:void(0)" class="showmore-performance_list" ><span class="cplus"><img src="/wp-content/themes/emdr-v2/assets/img/down24.png"></span> Performance</a>
				  	<ul class="list-inline" id="performance_list" style="display: none;"></ul>
				  </li>
				  <li style="    clear: both;"></li>
	            </ul>
	            <? endif;?>
               <!-- <h3 class="h5 sc">Country</h3>
                <ul class="unstyled" id="list_countries">
				  <li><a href="javascript:void(0)" class="USA">USA</a></li>
	              <li><a href="javascript:void(0)" class="AUS">Australia</a></li>
	              <li><a href="javascript:void(0)" class="CAN">Canada</a></li>
	              <li><a href="javascript:void(0)" class="NZL">New Zealand</a></li>
	            </ul>
                <h3 class="h5 sc">State</h3>
                <ul class="unstyled" id="list_states">
				  <li><a href="javascript:void(0)" class="NY">New York</a></li>
	              <li><a href="javascript:void(0)" class="OR">Oregon</a></li>
	              <li><a href="javascript:void(0)" class="CA">California</a></li>
	            </ul>
                <h3 class="h5 sc">Cities</h3>
                <ul class="unstyled" id="list_cities">
				  <li><a href="javascript:void(0)" class="Portland">Portland</a></li>
	              <li><a href="javascript:void(0)" class="Beaverton">Beaverton</a></li>
	            </ul> -->
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

<script src="http://harvesthq.github.io/chosen/chosen.jquery.js"></script>
<link href="http://harvesthq.github.io/chosen/chosen.css" rel="stylesheet" type="text/css"/>
<script>
    $('#distances_n, #rows_numbers').chosen();
// task_id=29177
    $( ".showmoreSection" ).click(function() {
        var cplus = $(this).find("span").text();
        //console.log(cplus);
        if (cplus == '+'){
        	$(this).find("span").text('-');
        }
        else {
        	$(this).find("span").text('+');
        }

    	  $(this).parent().next().toggle( "slow" );
    	});

    $( ".showmore" ).click(function() {
        var cplus = $(this).find("span").html();
        //console.log(cplus);
        if (cplus == '<img src="/wp-content/themes/emdr-v2/assets/img/down24.png">'){
        	$(this).find("span").html('<img src="/wp-content/themes/emdr-v2/assets/img/up24.png">');
        }
        else {
        	$(this).find("span").html('<img src="/wp-content/themes/emdr-v2/assets/img/down24.png">');
        }

        $(this).parent().find("ul" ).toggle( "slow" );

    });
    $("li.in_morefilter" ).hide();
    $("li.fewerfilter" ).hide();
    $( ".showmoreFilter" ).click(function() {

    	$(this).parent().parent().find("li.in_morefilter").each(function(){

    		if($(this).find("ul").length > 0){//task_id=29177

    			var ul = $(this).find("ul");
    			if (ul.children("li").length > 0){
        			console.log(ul.children("li").length );
					$(this).show("slow" );
        		}
    			//console.log($(this).find("ul").children("li").length);

			}/**/
    		else if($(this).has("input") ){
    			$(this).show("slow" );
    		}

		});
    	$(this).parent().parent().find("li.fewerfilter" ).show( "slow" );
    	$(this).hide();

    });
    $( ".lessFilter" ).click(function() {
        //console.log($(this).parent().find("ul" ));
        $(this).parent().parent().find("a.showmoreFilter").show("slow" );
    	  $(this).parent().parent().find("li.in_morefilter" ).hide( "slow" );
    	  $(this).parent().parent().find("li.fewerfilter" ).hide( "slow" );
    	});

    var list_narrow_results = ['cities', 'language', 'ages', 'specialtiesconditions', 'situation_list', 'traumatic_list', 'performance_list', 'othertherapy_list', 'religious'];
    for(var i = 0;i < list_narrow_results.length;i++) {

	    $('.showmore-' + list_narrow_results[i]).on('click', function() {
	    	var ele_name = $(this).closest('li').find('.list-inline').attr('id');
	    	//task_id=30600
	    	var cplus = $(this).find("span").html();
	        console.log(cplus);
	        if (cplus == '<img src="/wp-content/themes/emdr-v2/assets/img/down24.png">'){
	        	$(this).find("span").html('<img src="/wp-content/themes/emdr-v2/assets/img/up24.png">');
	        }
	        else {
	        	$(this).find("span").html('<img src="/wp-content/themes/emdr-v2/assets/img/down24.png">');
	        }
	      //task_id=30600
	      /*
	    	if($('#' + ele_name + '_li').find('.cplus').html() == '<img src="/wp-content/themes/emdr-v2/assets/img/down24.png">') {
		    	$('#' + ele_name + '_li').css({
		    		'width': $("aside").width(),
		    		'white-space': 'normal',
		    		'word-wrap': 'break-word',
		    	});
		    } else {
		    	$('#' + ele_name + '_li').css({
		    		'width': $("aside").width(),
		    		//'white-space': 'nowrap', //task_id=30600
		    		'word-wrap': 'normal',
		    	});
		    }*/
	    	 //task_id=30600
	    	$(this).parent().find("ul" ).toggle( "slow" );
	    });
	}



</script>
<?php get_footer(); ?>
