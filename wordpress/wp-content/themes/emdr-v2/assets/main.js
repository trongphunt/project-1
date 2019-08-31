/*
 * Define Array.indexOf() for IE<9
 */
if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length >>> 0;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}
/*
// history js
(function(window,undefined){

	// Establish Variables
	var
		State = History.getState(),
		$log = $('#log');

	// Log Initial State
	History.log('initial:', State.data, State.title, State.url);

	// Bind to State Change
	History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
		// Log the State
		var State = History.getState(); // Note: We are using History.getState() instead of event.state
		History.log('statechange:', State.data, State.title, State.url);
		
		if(State.data.state != SEARCH_RESULT_STATE) {
			SEARCH_RESULT_STATE = State.data.state;
			History.go(SEARCH_RESULT_STATE);
		}
		
//		var hashes = {
//			"query": State.data.query,
//			"page": State.data.page
//		}
//		searchTherapists(hashes);
		
	});

})(window);
*/

// as the page loads, call these scripts
jQuery(document).ready(function($) {

	$('.selectpicker').selectpicker();

  if($('div.faq').length) {
    SHELVES.init(); SHELVES.clicks();
  }

  if ($('body.home').length) {
    HOME.init();
  };

  NAVBAR.init();

  $(".editable-region").editInPlace({
	callback: function(original_element, html, original){
		$("#search_query").val(html);
		createHash(1);
		
		return html;
	}
  });

  $("form[name=frm_search]").submit(function() {
	  var s = $(this).find("input[name=search_text]").val();
	  
	  if($.trim(s) == "") {
		  alert("Please input search text!");
		  $(this).find("input[name=search_text]").focus();
		  return false;
	  }
  });

  $("#content").scroll(function() {
  	  $("#search-loading").css("top", $("#content").scrollTop() + "px");  
  });
  
  $("#affliction li>a").click(function(){
	  $("#affliction-filter>span").html($(this).html());
	  $("#affliction-filter").show();
  });
 
  $("#sexuality li>a").click(function(){
	  $("#sexuality-filter>span").html($(this).html());
	  $("#sexuality-filter").show();
  });
  
  $("#search-filters a.cancel").click(function(){
	  $(this).parents(".search-filter").hide();
  });

});

var GENERAL = {
  viewport: $(window).width()
},

NAVBAR = {
  init: function() {

    // nav hover
    $('.navbar-nav > li').hoverIntent(function(){
      $('.dropdown-wrap', this).stop(true).show();
    }, function(){
      $('.dropdown-wrap', this).stop(true).hide();
    });

    // mobile nav toggle
    $('.navbar-toggle').on('click', function(){
      if( snapper.state().state=="left" ){
          snapper.close();
      } else {
          snapper.open('left');
      }
    });

    // filter navbar toggle
    $('.filter-toggle').on('click', function(){
      if( snapper.state().state=="right" ){
          snapper.close();
      } else {
          snapper.open('right');
      }
    });

  }
},

HOME = {

  column_delay: 350,
  init: function(){

    if(GENERAL.viewport > 767) $('.box').hoverIntent({
      over: HOME.colOver,
      out: HOME.colOff,
      interval: 10
    });

  },

  colOver: function() {
    
    var self = this;
        $testimContent = $('.t-inner, .t-name');

    $('.testimonial-trigger', this).stop().animate({
      'top': '-10px'
    }, HOME.column_delay, 'easeInOutExpo', function(){
      $($testimContent, this).animate({
        'opacity': 1
      }, HOME.column_delay, 'easeInOutExpo');
    });

    $('.testimonial-trigger').hoverIntent({
      over: function(){
        $('.box-overlay', self).animate({
          'top': 0
        }, 750, 'easeInOutExpo');
      },
      off: function(){},
      interval: 10
    })
  },

  colOff: function(){
    var self = this,
        $testimContent = $('.t-inner, .t-name');

    $('.testimonial-trigger', this).animate({
      'top': '-42px'
    }, 200, 'easeInOutExpo');

    $('.box-overlay', self).animate({
      'top': '100%'
    }, HOME.column_delay);

    $($testimContent, self).animate({
      'opacity': '0'
    }, 250);
  }
},

SHELVES = {
  dur: 300,
  loc: window.location.hash,
  init: function(){

    $('.faq .content').hide();

    $('.faq .trigger').on('click', function() {
      $('.faq .trigger').removeClass('set');

        if($('.faq .content').is(":visible")) {
          $('.faq .content').slideUp(SHELVES.dur);
        }
        $(this).parent().find('.content').stop(true).animate({
            height: 'toggle'
          }, SHELVES.dur);

        $(this).addClass('set');

    });

    if(SHELVES.loc) {
      var target = $('a[href='+SHELVES.loc+']'),
          target_top = $(target).offset().top;
      $(target).click();
      $('#content').animate({scrollTop:target_top}, 1250, 'easeOutExpo');
    }

  },

  expand: function(){
    $('.faq .content').slideDown(SHELVES.dur);
    $('.faq .trigger').addClass('set');
  },

  collapse: function(){
    var shelves = $('.faq .content');
    $('.faq .content').slideUp(SHELVES.dur);
    $('.faq .trigger').removeClass('set');
  },

  clicks: function(){

    $('.faq-toggle .expand-all').click(function(e){
      SHELVES.expand();
      e.preventDefault();
    });

    $('.faq-toggle .collapse-all').click(function(e){
      SHELVES.collapse();
      e.preventDefault();
    });
  }

}


// Snap Drawer

var snapper = new Snap({
    element: document.getElementById('content'),
    // disable: 'right'
    touchToDrag: false
});

// document.getElementById('search').addEventListener('focus', function(){
//   snapper.expand('left');
// });

// document.getElementById('search').addEventListener('blur', function(){
//   snapper.open('left');
// });

/* 
 * Search Results
 */
function searchTherapists(hashes) {
	
	//History.pushState( {state:++SEARCH_RESULT_STATE, rand:Math.random(), query:hashes.query, page:hashes.page }, "EMDR:Search-Result", '?#query:' + hashes.query + ';page:' + hashes.page);
	
	//console.log({state:SEARCH_RESULT_STATE, query:hashes.query, page:hashes.page });
	
	if(hashes.query && hashes.query != '') {
		var search_text = hashes.query;
		
		$("#search_results_empty").hide();
		$("#search_results_list").show();
		
		$("#search-header .editable-region").html(search_text);
		$("#search_query").val(search_text);
	}
	else {
		$("#search_results_empty").show();
		$("#search_results_list").hide();
		
		return false;;
	}

	var param = {
		"search": hashes.query,
		"pagenumber": (hashes.page && parseInt(hashes.page, 10)>1)? parseInt(hashes.page, 10): 1,
		"rowsperpage": rows
	};
	
	$("#search-loading").css("top", parseInt($("#content").scrollTop(), 10) + "px");
	$("#search-loading").show();
	$(".pagination").html("");
	
	$("#affliction-filter, #sexuality-filter").hide();
	
	$.ajax({
		type: 'POST',
		url: admin_ajax_url,
		dataType: 'json',
		cache: false,
		data: {
			action: 'api_getTherapists',
			parameters: param
		},
		success: function(response) {
			$(".search-results .result.row").remove();
			$(".results-summary").html("Showing no result");
			
			if(response.status=="succ") {
				var data = response.data;
				
				if(data.found && data.found>0) {
					
					pagination(data, param.rowsperpage);
					
					for(var i=0; i<data.therapists.length; i++) {
						loadTherapist(data.therapists[i], i);
					}
					
					var from = (data.page-1) * param.rowsperpage + 1;
					var to = from + data.onpage - 1;
					$(".results-summary").html("Showing " + from + "-" + to + " of " + data.found + " results");
				}
			}
			else {
				console.log(response.errorMsg);
			}
		},
		error: function(response) {
			$(".search-results .result.row").remove();
			$(".results-summary").html("Showing no result");
			
			console.log(response.responseText);
		},
		complete: function() {
			
			setTimeout(function() {
				$('#search-loading').animate({
					height: 'hide'
				}, 400);
			}, 1000);
			
		}
	});
	
} 

function loadTherapist(data, index) {
	var credentials = "";
	if(data.credentials) {
		for(var i=0; i<data.credentials.length; i++) {
			if(i==0)
				credentials = data.credentials[i];
			else
				credentials += ", " + data.credentials[i];
		}
	}
	
	var profile_url = (data.url!='')? profile_path + encodeURIComponent(data.url): 'javascript:void(0)';
	
	var row_html = '<div class="result row" id="therapist-' + index + '" data-name="' + data.name + '">'
	  + '  <section class="result-left col-sm-3">';
	  
	if(data.photo && data.photo != ""){
        row_html += '<div class="profile-image" style="background-image: url(' + data.photo + ')">';
		row_html += '<img class="img-responsive" src="' + template_directory + '/assets/img/gfx-portal_small.png" alt="' + data.name + '" width="110" height="110">';
    } else {
        row_html += '<div class="profile-image" style="background-image: url(http://placehold.it/110x110)">';
		row_html += '<img class="img-responsive" src="' + template_directory + '/assets/img/gfx-portal_small.png" alt="' + data.name + '" width="110" height="110">';
    }
	
	row_html += '</div>'
	  + '    <div class="text-center actions">'
	  + '      <button type="button" class="btn btn-primary btn-favorite" data-toggle="button"><span class="text-hide favorite_result">Add to Favorites</span></button>'
	  + '      <a href="javascript:void(0);" onclick="javascript:sendEmailModal(' + data.email + ',' + data.name + ');" class="btn btn-primary"><span class="text-hide email_result">Email to Friend</span></a>'
	  + '    </div>'
	  + '  </section>'
	  + '  <section class="result-center col-sm-6 col-lg-6">'
	  + '    <header>'
	  + '      <h1><a href="' + profile_url + '">' + data.name + ' <small>' + credentials + '</small></a></h1>';
	
	if(data.verified && data.verified == "true")
		row_html += '<div class="verified">Verified</div>';
	
	row_html += '</header>'
	  + '    <p>' + data.bio + ' <a href="' + profile_url + '">View full profile &raquo;</a></p>'
	  + '  </section>'
	  + '  <div class="result-right col-sm-3">';
	
	if(data.phones && data.phones.length>0) {
		for(var i=0; i<data.phones.length; i++) {
			row_html += '<div class="result-phone sans">' + data.phones[i].number + '</div>';
		}
	}
	
	if(data.addresses && data.addresses.length>0) {
		row_html += '<div class="result-address address-top">' + data.addresses[0].addressLine1 + '<br/>';
		if(data.addresses[0].addressLine2 != "")
			row_html += data.addresses[0].addressLine2 + '<br/>';
		if(data.addresses[0].city != "")
			row_html += data.addresses[0].city + ', ';
		row_html += data.addresses[0].state + ' ' + data.addresses[0].zipCode + '</div>';
		
		if(data.addresses.length>1) {
			row_html += '<div class="result-address address-more" style="display:none">';
			for(var i=0; i<data.addresses.length; i++) {
				row_html += '<div class="result-address-more">';
				if(data.addresses[i].addressLine1 != "")
					row_html += data.addresses[i].addressLine1 + '<br />';
				if(data.addresses[i].addressLine2 != "")
					row_html += data.addresses[i].addressLine2 + '<br/>';
				if(data.addresses[i].city != "")
					row_html += data.addresses[i].city + ', ';
				row_html += data.addresses[i].state + ' ' + data.addresses[i].zipCode + '</div>';
			}
			row_html += '</div>';
			row_html += '<a href="javascript:void(0)" onclick="javascript:toggleLocations(\'therapist-' + index + '\', this)" class="btn btn-default btn-small">More Locations</a>';
		}
	}
	
	row_html += '</div>' + '</div>';
	
	$(".search-results .results-pagination").before(row_html);
	
	if(findFavorites(data.name)) {
		$("#therapist-" + index + " .btn-favorite").addClass("favorites-active");
	}
	
	$("#therapist-" + index + " .btn-favorite").bind("click", function() {
		toggleFavorite(data.name, this);
	});
	
}

function toggleLocations(row_id, el) {
	$(".address-top", "#" + row_id).hide();
	$(".address-more", "#" + row_id).show();
	$(el).hide();
}

function pagination(data, rows) {
	
	var total = data.found;
	var pages = data.pages;
	var cpage = data.page;
	
	var start = Math.max(1, Math.floor((cpage-1)/5)*5+1);
	var end = Math.min(pages, start+4);
	
	$(".pagination").html("");
	
	if(start>1) {
		$(".pagination").append('<li class="prev"><a href="javascript:void(0);">&laquo;</a></li>');
	}
	
	for(var i=start; i<=end; i++) {
		if(i==cpage) {
			$(".pagination").append('<li class="current number-' + i + '"><a href="javascript:void(0);" onclick="javascript:createHash(' + i + ');">' + i + '</a></li>');
		}
		else {
			$(".pagination").append('<li class="number-' + i + '"><a href="javascript:void(0);" onclick="javascript:createHash(' + i + ');">' + i + '</a></li>');
		}
	}
	
	if(end<pages) {
		$(".pagination").append('<li class="next"><a href="javascript:void(0);">&raquo;</a></li>');
	}
	
	$(".pagination>li.prev>a").click(function() {
		data.page = start-1;
		pagination(data, rows);
	});
	
	$(".pagination>li.next>a").click(function() {
		data.page = end+1;
		pagination(data, rows);
	});
}

function createHash(page) {
	
	if(page)
		$("#search_page").val(page);
	else
		page = $("#search_page").val();
	
	var query = $("#search_query").val();
	
	var hashes = { "query": query, "page": page	};

	location.hash = '#query:' + hashes.query + ';page:' + hashes.page;
	
	//searchTherapists(hashes);
}

var hash_keys = ['query', 'page'];

$(window).on('hashchange', function() {
	parseHash();
});

function parseHash() {
	var hashes = {};
	
	var hash_str = location.hash;
	hash_str = $.trim(hash_str).replace("#", "")
	
	var arr1 = hash_str.split(';');
	for(var i=0; i<arr1.length; i++) {
		if($.trim(arr1[i]) != '') {
			var arr2 = arr1[i].split(':');
			if($.trim(arr2[0]) != '' && hash_keys.indexOf($.trim(arr2[0]).toLowerCase()) != -1) {
				hashes[$.trim(arr2[0]).toLowerCase()] = (arr2[1])? $.trim(arr2[1]): '';
			}
		}
	}
	
	searchTherapists(hashes);
}

function toggleFavorite( therapist_name, that ) {
	var $that = $(that);
	
	if($that.hasClass("favorites-active")) {
		$('#favoriteModal .modal-body>p').html("<b>" + therapist_name + "</b> has been removed from your favorites list!");
		$that.removeClass("favorites-active");
		removeFavorites(therapist_name);
	}
	else {
		$('#favoriteModal .modal-body>p').html("<b>" + therapist_name + "</b> has been added to your favorites list!");
		$that.addClass("favorites-active");
		addFavorites(therapist_name);
	}
	
	$('#favoriteModal').modal();
	
	setTimeout(function() {
		$('#favoriteModal').modal('hide');
	}, 2000);
}

jQuery(document).ready(function($) {
	$(".all-favorites").click(function(){
		$('#favoritesModal .modal-title').html("The therapists will be added to your favorites list!");
		$('#favoritesModal .modal-body li').remove();
		
		$(".search-results .result.row").each(function() {
			$('#favoritesModal .modal-body>ul').append("<li data-row='" + $(this).attr("id") + "'>" + $(this).attr("data-name") + " <a href='javascript:void(0);'>remove<a></li>");
		});
		
		$('#favoritesModal .modal-body>ul a').click(function(){
			$(this).parent().remove();
		});
		
		$('#favoritesModal').modal();
	});
	
	$('#favoritesModal .add-favorites').click(function(){
		$('#favoritesModal .modal-body li').each(function() {
			if(!$("#"+$(this).attr("data-row")).find(".btn-favorite").hasClass("favorites-active")) {
				$("#"+$(this).attr("data-row")).find(".btn-favorite").addClass("favorites-active");
				addFavorites($(this).html());
			}
		});
		
		$('#favoritesModal').modal('hide');
	});
	
	$(".btn-sendemail").click(function(){
		if(validateEmailForm()) {
			
		}
		
		return false;
	});
	
});

function addFavorites(therapist) {
	var therapists = $.cookie("emdr.favorites.list");
	if(therapists && therapists!="") {
		therapists = therapists.split(',');
		if(therapists.indexOf(therapist) == -1) {
			therapists.push(therapist);
		}
		therapists = therapists.join();
	}
	else {
		therapists = therapist;
	}
	$.cookie("emdr.favorites.list", therapists, {path: '/'});
}

function removeFavorites(therapist) {
	var therapists = $.cookie("emdr.favorites.list");
	if(therapists && therapists!="") {
		therapists = therapists.split(',');
		var index = therapists.indexOf(therapist)
		if(index != -1) {
			therapists.splice(index,1);
		}
		therapists = therapists.join();
		$.cookie("emdr.favorites.list", therapists, {path: '/'});
	}
}

function findFavorites(therapist) {
	var therapists = $.cookie("emdr.favorites.list");
	if(therapists && therapists!="") {
		therapists = therapists.split(',');
		var index = therapists.indexOf(therapist)
		if(therapists.indexOf(therapist) == -1) {
			return false;
		}
		else {
			return true;
		}
	}
	else {
		return false;
	}
}

function sendEmailModal( terapist_email, terapist_name ) {
	$("#emailModal [name=terapist_name]").val(terapist_name);
	$("#emailModal [name=terapist_email]").val(terapist_email);
	
	$("#emailModal").modal();
}

function validateEmailForm() {
    var result = true;
    var er = document.getElementById('sendmail_error');
    er.innerHTML = "";

    label = document.getElementById("nameTD"); 
    label.style.color = "black";
    if(validate_required(er,document.getElementsByName('contact_name')[0],"Please, enter your name.") == false || validate_text(er,document.getElementsByName('contact_name')[0],"entered name") == false)
    {
        label.style.color = "red";
        result = false;
    }

    label = document.getElementById("mail1TD"); 
    label.style.color = "black";
    if(validate_required(er,document.getElementsByName('contact_mail1')[0],"Please, enter your E-mail.") == false || validate_email(er,document.getElementsByName('contact_mail1')[0]) == false)
        {
        label.style.color = "red";
        result = false;
    }

    label = document.getElementById("captchaTextId"); 
    label.style.color = "black";
    if(validate_required(er,document.getElementsByName('security_code')[0],"Please, enter captcha text") == false)
    {
        label.style.color = "red";
        result = false;
    }
    
    if(result) {
        //  Check email retype
        label = document.getElementById("mail2TD"); 
        label.style.color = "black";
        if(validate_required(er,document.getElementsByName('contact_mail2')[0],"Please, re-enter your E-mail.") == false) {
            label.style.color = "red";
            result = false;
        }
        else if(document.getElementsByName('contact_mail1')[0].value != document.getElementsByName('contact_mail2')[0].value) {
            label.style.color = "red";  

            inp1 = document.createElement("p"); // error messages                        
            inp1.appendChild( document.createTextNode("The two email addresses that you entered do not match."));

            result = false;
            er.appendChild(inp1);
            //LogError("The two email addresses that you entered do not match");
        }
    }

    label = document.getElementById("phoneTD"); 
    label.style.color = "black";
    if (!(/^([0-9 \(\)-]){0,255}$/.test(document.getElementsByName('contact_phone')[0].value))) {
        ShowErrorMessage(er, 'The phone number is invalid: ' + document.getElementsByName('contact_phone')[0].value, '');
        label.style.color = "red";
        result = false;
    }

    label = document.getElementById("subjectTD"); 
    label.style.color = "black";
    if(validate_widetext(er,document.getElementsByName('subject')[0], "subject for message") == false) {
        label.style.color = "red";
        result = false;
    }

    label = document.getElementById("messageTD"); 
    label.style.color = "black";
    if(validate_required(er,document.getElementsByName('message')[0],"Please, enter message text.") == false || validate_widetext(er,document.getElementsByName('message')[0],"message text",1024) == false)
    {
        label.style.color = "red";
        result = false;
    }

    if(result)
        SubmitDisplayLoader();

    return result;
}

function SubmitDisplayLoader()
{
    DisplayLoader();
    setTimeout(function()
    {
        document.getElementById('loader').src = template_directory + '/assets/img/loader.gif';
    }, 0);
}