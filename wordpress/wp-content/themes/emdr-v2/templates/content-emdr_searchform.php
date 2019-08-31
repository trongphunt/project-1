<h1 class="h2">
  <?php 
    if ( !is_ft() ):
      echo 'Find an EMDR Therapist Near You';
    elseif ( is_ft() ):
      echo 'Find an EMDR Consultant Near You';
    endif;
  ?>
</h1>
<form method="post" class="clearfix emdrsearch" name="frm_search" action="<?php echo get_permalink(get_page_by_path('search-results')); ?>">
  <div class="col-sm-9 form-zip">
    <input type="text" class="form-control" placeholder="Enter a Postal Code, City, or Name" name="search_text" id="search_query" />
  </div>
    <!--
 <div class="col-5 form-distance">
    <select class="selectpicker" name="distance">
      <option value="25">25 Miles</option>
      <option value="50">50 Miles</option>
      <option value="100">100 Miles</option>
    </select>
  </div>
  -->
  <input type="hidden" name="no_location" id="no_location" value="">
  
  <?php if ( is_ft() ): ?>
	<input type="hidden" name="search_consultant" value="true">
  <?php endif; ?>
  <button type="submit" class="btn-submit btn btn-tertiary form-search col-3"><img src="<?php bloginfo('template_directory'); ?>/assets/img/icn-search.png"> Search</button>
<!--
  <?php 
    if ( !is_page_template('tmpl-browse.php') ):
      if ( !is_ft() ):
        echo '<a href="' . get_permalink( 10 ) . '" class="browse-all sans">Browse All Locations</a>';
      elseif ( is_ft() ):
        echo '<a href="' . get_permalink( 894 ) . '" class="browse-all sans">Browse All Locations</a>';
      endif;
    endif;
  ?>
-->
</form>
<!--Lee old key: AIzaSyCDmOuSaO9jkwklsDMiYmZuvhJys_G1ZxA-->
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCHRCe_aU0i-TOPwbXm3jBOL8UL9hp4tz0&libraries=places&callback=initAutocomplete" async defer></script>
<script>
    var placeSearch, autocomplete, searchContentAuto;
    function initAutocomplete() {
        var searchElement = (document.getElementById('search_query'));
        autocomplete = new google.maps.places.Autocomplete(
            searchElement,
            {
                types: ['geocode'],
                componentRestrictions: { country: 'us' }
            }
        );
        /*
         autocomplete = new google.maps.places.Autocomplete(
         searchElement,
         {
         types: ['geocode'],
         componentRestrictions: { country: 'au' }
         }
         );

         autocomplete = new google.maps.places.Autocomplete(
         searchElement,
         {
         types: ['geocode'],
         componentRestrictions: { country: 'nc' }
         }
         );

         autocomplete = new google.maps.places.Autocomplete(
         searchElement,
         {
         types: ['geocode'],
         componentRestrictions: { country: 'nz' }
         }
         );
         */

        autocomplete.addListener('place_changed', function () {
            $('.btn-tertiary.form-search').trigger('click');
        });

//            var searchContentElm = document.getElementById('search_content');
//            searchContentAuto = new google.maps.places.Autocomplete(
//                searchContentElm,
//                {
//                    types: ['geocode'],
//                    componentRestrictions: { country: 'us' }
//                }
//            );
//            searchContentAuto.addListener('place_changed', function () {
//                var place = searchContentAuto.getPlace();
//                $('#search_query').val(place.formatted_address);
//                $('.btn-tertiary.form-search').trigger('click');
//            });
    }

    function geolocate() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var geolocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                var circle = new google.maps.Circle({
                    center: geolocation,
                    radius: position.coords.accuracy
                });
                autocomplete.setBounds(circle.getBounds());
                searchContentAuto.setBounds(circle.getBounds());
            });
        }
    }
    $(document).ready(function(){
        $('#search_query').keyup(function(){
            var input = $(this).val();
            setTimeout(function(){
                $('#more_result, #search_more_result').remove();
                if (input.length > 0) {
                	$('.pac-container').append('<div class="pac-item custom-result" id="more_result"><span class="pac-item-query"><span class="pac-matched">Find Name or Company: "' + input + '"</span></span></div>');
             //  &task_id=38185
					if($('.pac-container:visible').length == 0)
					{
						$('.pac-container').show();
					}
                }
                
            }, 700);
        });
        $(document).on('mousedown','#more_result', function(){
            var search_query = $('#search_query').val();
            console.log('no_location=1');
            $('#no_location').val(1); 
            //$('#search_content').val(search_query);
            //$('.search-submit').trigger('click');
            $('.btn-tertiary.form-search').trigger('click');
        });
    //  &task_id=38185
        $(document).on('click','#more_result', function(){
            var search_query = $('#search_query').val(); 
            console.log('no_location=1');
            $('#no_location').val(1); 
            $('.btn-tertiary.form-search').trigger('click');
        });
//            $('#search_content').keyup(function(){
//                var input = $(this).val();
//                setTimeout(function(){
//                    $('#search_more_result, #more_result').remove();
//                    $('.pac-container').append('<div class="pac-item custom-result" id="search_more_result"><span class="pac-item-query"><span class="pac-matched">Find Name or Company: "' + input + '"</span></span></div>');
//                }, 700);
//            });
//            $(document).on('mousedown','#search_more_result', function(){
//                $('.search-submit').trigger('click');
//            });
    });
</script>