var globalObj = {
    
    searchData: null
    
};
var data = null;
/*
 * Define Array.indexOf() for IE<9
 */
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(elt /*, from*/ ) {
        var len = this.length >>> 0;
        var from = Number(arguments[1]) || 0;
        from = (from < 0) ? Math.ceil(from) : Math.floor(from);
        if (from < 0) from += len;
        for (; from < len; from++) {
            if (from in this && this[from] === elt) return from;
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

 //     var hashes = {
 //         "query": State.data.query,
 //         "page": State.data.page
 //     }
 //     searchTherapists(hashes);

 });

 })(window);
 */
// as the page loads, call these scripts
var dataSave = null;
jQuery(document).ready(function($) {
    $('.selectpicker').selectpicker();
    if ($('div.faq').length) {
        SHELVES.init();
        SHELVES.clicks();
    }
    if ($('body.home').length) {
        HOME.init();
    }
    NAVBAR.init();
    $(".editable-region").editInPlace({
        callback: function(original_element, html, original) {
            var s = get_validate_query(html);
            $('#search_query').val(s);
            createHash();
            return s;
        }
    });
    $("form[name=frm_search]").submit(function() {
        var s = get_validate_query($(this).find("input[name=search_text]").val());
        if (s === "") {
            //alert("Please input search text!");
            window.location.href = "/search-results/";
            //$(this).find("input[name=search_text]").focus();
            return false;
        }
        $(this).find("input[name=search_text]").val(s);
    });
    $("#content").scroll(function() {
        $("#search-loading").css("top", $("#content").scrollTop() + "px");
    });
    /*$("#affliction li>a").click(function(){
     $("#affliction-filter>span").html($(this).html());
     $("#search-filters-header, #affliction-filter").show();
     });*/
    /*
     $('body').on('click',"#affliction li>a",function(){
     $("#affliction-filter>span").html($(this).html()).removeClass().addClass($(this).attr('class'));
     $("#search-filters-header, #affliction-filter").show();
     createHash(1);
     });*/
    //task_id=28820
    $('body').on('click', "#types li>a, #ages li>a, #population li>a, #modalities li>a, #specialtiesconditions li>a, #religious li>a, #acceptphoneconsultationfree li>a, #training_completed li>a, #advancedtraining li>a", function() {
        $(this).css('color', '#ccc').css('font-style', 'italic');
        var name = $(this).data('name');
        if (!$('span.' + $(this).attr('class')).length) {
            $("#search-filters").append('<small name="' + name + '-filter" class="search-filter"><span class="' + $(this).attr('class') + '">' + $(this).html() + '</span><a class="cancel" href="javascript:void(0);" title="remove"></a></small>');
            $("#search-filters-header").show();
            createHash();
        }
    });
    $('body').on('click', "#cities li>a, #counties li>a, #postal li>a ", function() {
        $(this).css('color', '#ccc').css('font-style', 'italic');
        var name = $(this).data('name');
        if (!$('span.' + $(this).attr('class')).length) {
            $('#' + name + '-filter').each(function() {
                $(this).remove();
            }); //Task 31376
            $("#search-filters").append('<small id="' + name + '-filter" class="search-filter"><span class="' + $(this).attr('class') + '">' + $(this).html() + '</span><a class="cancel" href="javascript:void(0);" title="remove"></a></small>');
            $("#search-filters-header").show();
            createHash();
        }
    }); /* */
    // task_id=28821
    $('body').on('click', "#consultation, #emdr_basic_training, #emdr_ceu, #face,#phone, #email, #skype, #forum, #trainee, #individual, #group, #specifypopulation, #emdria_cert, #studygroup, #non_training_oppty, #clinical_supervision,#feebase_consultation ", function() {
        var name = $(this).attr('id');
        if ($(this).is(':checked')) {
            $(this).parent().css('color', '#ccc').css('font-style', 'italic');
            $("#" + name + "-filter>span").html($(this).parent().text()).removeClass().addClass($(this).attr('class'));
            $("#search-filters-header, #" + name + "-filter").show();
            createHash();
        } else {
            $(this).parent().css('color', '').css('font-style', '');
            if ($("#" + name + "-filter>span")) {
                $("#" + name + "-filter>span").html('').removeClass();
                console.log(333);
                $("#" + name + "-filter").find('a.cancel').trigger('click');
            }
        }
    });
    $('.img-transportation').on('click', function() {
        $(this).toggleClass('checked').prev().prop('checked', $(this).is('.checked'));
        var name = 'transportation';
        if ($(this).is('.checked') === true) {
            $('#transportation').prop('checked', true);
            $(this).css("opacity", "0.26");
            $("#" + name + "-filter>span").html("Near public transportation").removeClass().addClass("transportation");
            $("#search-filters-header, #" + name + "-filter").show();
            createHash();
        } else {
            $('#transportation').prop('checked', false);
            $(this).css("opacity", "1");
            if ($("#" + name + "-filter>span")) {
                $("#" + name + "-filter>span").html('').removeClass();
                $("#" + name + "-filter").find('a.cancel').trigger('click');
            }
        }
    });
    $('.img-accessible').on('click', function() {
        $(this).toggleClass('checked').prev().prop('checked', $(this).is('.checked'));
        var name = 'accessible';
        if ($(this).is('.checked') === true) {
            $('#accessible').prop('checked', true);
            $(this).css("opacity", "0.26");
            $("#" + name + "-filter>span").html("Near public accessible").removeClass().addClass("accessible");
            $("#search-filters-header, #" + name + "-filter").show();
            createHash();
        } else {
            $('#accessible').prop('checked', false);
            $(this).css("opacity", "1");
            if ($("#" + name + "-filter>span")) {
                $("#" + name + "-filter>span").html('').removeClass();
                $("#" + name + "-filter").find('a.cancel').trigger('click');
            }
        }
    });
    $('body').on('click', "#affliction li>a", function() {
        $(this).css('color', '#ccc').css('font-style', 'italic');
        if (!$('span.' + $(this).attr('class')).length) {
            $("#search-filters").append('<small name="affliction-filter" class="search-filter"><span class="' + $(this).attr('class') + '">' + $(this).html() + '</span><a class="cancel" href="javascript:void(0);" title="remove"></a></small>');
            $("#search-filters-header").show();
            createHash();
        }
    });
    $('body').on('click', "#insurance_list li>a", function() {
        $(this).css('color', '#ccc').css('font-style', 'italic');
        if (!$('span.' + $(this).attr('class')).length) {
            $("#search-filters").append('<small name="insurance_list-filter" class="search-filter"><span class="' + $(this).attr('class') + '">' + $(this).html() + '</span><a class="cancel" href="javascript:void(0);" title="remove"></a></small>');
            $("#search-filters-header").show();
            createHash();
        }
    });
    //task_id=30600
    $('body').on('click', "#all_insurance a", function() {
        //$(this).css('color','#ccc').css('font-style','italic');
        $("#search-filters").find('[name="insurance_list-filter"]').find('a').trigger('click');
        $("#search-filters-header").show(); 
    });
    $('body').on('click', "#othertherapy_list li>a", function() {
        $(this).css('color', '#ccc').css('font-style', 'italic');
        if (!$('span.' + $(this).attr('class')).length) {
            $("#search-filters").append('<small name="othertherapy_list-filter" class="search-filter"><span class="' + $(this).attr('class') + '">' + $(this).html() + '</span><a class="cancel" href="javascript:void(0);" title="remove"></a></small>');
            $("#search-filters-header").show();
            createHash();
        }
    });
    $('body').on('click', "#performance_list li>a", function() {
        $(this).css('color', '#ccc').css('font-style', 'italic');
        if (!$('span.' + $(this).attr('class')).length) {
            $("#search-filters").append('<small name="performance_list-filter" class="search-filter"><span class="' + $(this).attr('class') + '">' + $(this).html() + '</span><a class="cancel" href="javascript:void(0);" title="remove"></a></small>');
            $("#search-filters-header").show();
            createHash();
        }
    });
    $('body').on('click', "#situation_list li>a", function() {
        $(this).css('color', '#ccc').css('font-style', 'italic');
        if (!$('span.' + $(this).attr('class')).length) {
            $("#search-filters").append('<small name="situation_list-filter" class="search-filter"><span class="' + $(this).attr('class') + '">' + $(this).html() + '</span><a class="cancel" href="javascript:void(0);" title="remove"></a></small>');
            $("#search-filters-header").show();
            createHash();
        }
    });
    $('body').on('click', "#setting_list li>a", function() {
        $(this).css('color', '#ccc').css('font-style', 'italic');
        if (!$('span.' + $(this).attr('class')).length) {
            $("#search-filters").append('<small name="setting_list-filter" class="search-filter"><span class="' + $(this).attr('class') + '">' + $(this).html() + '</span><a class="cancel" href="javascript:void(0);" title="remove"></a></small>');
            $("#search-filters-header").show();
            createHash();
        }
    });
    $('body').on('click', "#consultation_fee_list li>a", function() {
        $(this).css('color', '#ccc').css('font-style', 'italic');
        if (!$('span.' + $(this).attr('class')).length) {
            $("#search-filters").append('<small name="consultation_fee_list-filter" class="search-filter"><span class="' + $(this).attr('class') + '">' + $(this).html() + '</span><a class="cancel" href="javascript:void(0);" title="remove"></a></small>');
            $("#search-filters-header").show();
            createHash();
        }
    });
    /*$('body').on('click',"#consultation_fee li>a",function(){
     $("#consultation_fee-filter>span").html($(this).html()).removeClass().addClass($(this).attr('class'));
     $("#search-filters-header, #consultation_fee-filter").show();
     $("#consultation_fee li>a").attr('style','');
     $(this).css('color','#ccc').css('font-style','italic');
     createHash();
     });*/
    $('body').on('click', "#traumatic_list li>a", function() {
        $(this).css('color', '#ccc').css('font-style', 'italic');
        if (!$('span.' + $(this).attr('class')).length) {
            $("#search-filters").append('<small name="traumatic_list-filter" class="search-filter"><span class="' + $(this).attr('class') + '">' + $(this).html() + '</span><a class="cancel" href="javascript:void(0);" title="remove"></a></small>');
            $("#search-filters-header").show();
            createHash();
        }
    });
    $('body').on('click', "#gender li>a", function() {
        $("#gender-filter>span").html($(this).html()).removeClass().addClass($(this).attr('class'));
        $("#search-filters-header, #gender-filter").show();
        $("#gender li>a").attr('style', '');
        $(this).css('color', '#ccc').css('font-style', 'italic');
        createHash();
    });
    $('body').on('click', "#language li>a", function() {
        $("#language-filter>span").html($(this).html()).removeClass().addClass($(this).attr('class'));
        console.log('filter lang');
        $("#search-filters-header, #language-filter").show();
        $("#language li>a").attr('style', '');
        $(this).css('color', '#ccc').css('font-style', 'italic');
        createHash();
    });
    //task_id=29161
    $('body').on('change', "#practice_yrs", function() {
        $("#practice_yrs-filter>span").html($(this).find("option:selected").text() + ' Years In Practice').removeClass().addClass($(this).val());
        $("#search-filters-header, #practice_yrs-filter").show();
        createHash();
    });
    //task_id=28820
    $('body').on('change', "#emdr_yrs", function() {
        $("#emdr_yrs-filter>span").html($(this).find("option:selected").text() + ' Years using EMDR').removeClass().addClass($(this).val());
        $("#search-filters-header, #emdr_yrs-filter").show();
        createHash();
    });
    $('body').on('click', "#list_countries li>a", function() {
        $("#list_countries-filter>span").html($(this).html()).removeClass().addClass($(this).attr('class'));
        $("#search-filters-header, #list_countries-filter").show();
        $("#list_countries li>a").attr('style', '');
        $(this).css('color', '#ccc').css('font-style', 'italic');
        createHash();
    });
    $('body').on('click', "#list_states li>a", function() {
        $("#list_states-filter>span").html($(this).html()).removeClass().addClass($(this).attr('class'));
        $("#search-filters-header, #list_states-filter").show();
        $("#list_states li>a").attr('style', '');
        $(this).css('color', '#ccc').css('font-style', 'italic');
        createHash();
    });
    $('body').on('click', "#list_cities li>a", function() {
        $("#list_cities-filter>span").html($(this).html()).removeClass().addClass($(this).attr('class'));
        $("#search-filters-header, #list_cities-filter").show();
        $("#list_cities li>a").attr('style', '');
        $(this).css('color', '#ccc').css('font-style', 'italic');
        createHash();
    });
    /*$('#list_countries').on('change',function(){
     createHash();
     });
     */
    $('#rows_numbers').on('change', function() { 
        //#37614
        createHash();
    });
    $('#distances_n').on('change', function() {
        createHash(); 

    });
    /*$('#list_states').on('change',function(){
     createHash();
     });*/
    /*$('#list_cities').on('change',function(){
     createHash();
     });*/
    $('body').on('click', "#distances li>a", function() {
        $("#distances-filter>span").html($(this).html() + ' Distance').removeClass().addClass($(this).attr('class'));
        $("#search-filters-header, #distances-filter").show();
        $("#distances li>a").attr('style', '');
        $(this).css('color', '#ccc').css('font-style', 'italic');
        createHash();
    });
    $('body').on('click', "#profession li>a", function() {
        $(this).css('color', '#ccc').css('font-style', 'italic');
        if (!$('span.' + $(this).attr('class')).length) {
            $("#search-filters").append('<small name="profession-filter" class="search-filter"><span class="' + $(this).attr('class') + '">' + $(this).html() + '</span><a class="cancel" href="javascript:void(0);" title="remove"></a></small>');
            $("#search-filters-header").show();
            createHash();
        }
    });
    $("#sexuality li>a").click(function() {
        $("#sexuality-filter>span").html($(this).html());
        $("#search-filters-header, #sexuality-filter").show();
    });
    $('body').on('click', "#search-filters a.cancel", function() {
        $(this).parents(".search-filter").hide();
        // task_id=28820
        if ($(this).parent().attr('id')) {
            var name = $(this).parent().attr('id').replace('-filter', '');
            // task_id=28821
            var consultantList = ['feebase_consultation', 'consultation', 'emdr_basic_training', 'emdr_ceu','face','phone', 'email', 'skype', 'forum', 'trainee', 'individual', 'group', 'specifypopulation', 'emdria_cert', 'studygroup', 'non_training_oppty', 'clinical_supervision' ];
            if (name == 'transportation' || name == 'accessible' || consultantList.indexOf(name) >= 0) {
                $('#' + name).parent().css('color', '').css('font-style', '');
                $('#' + name).prop('checked', false);
                $('.img-' + name).css("opacity", "1");
            } else if (name == 'practice_yrs' || name == 'emdr_yrs') {
                $('#' + name).val('').change(); //task_id=29161
            } else {
                $('.' + $(this).prev('span').attr('class')).attr('style', '');
            }
        }
        else $('.' + $(this).prev('span').attr('class')).attr('style', '');
        
        $(this).prev('span').removeClass();
        /*if($("#affliction-filter").is(":hidden") && $("#sexuality-filter").is(":hidden")) {
         $("#search-filters-header").hide();
         }*/
        var insurance_lists = true;
        $("[name=insurance_list-filter]").each(function() {
            if (!$(this).is(':hidden')) {
                insurance_lists = false;
            }
        });
        var othertherapy_lists = true;
        $("[name=othertherapy_list-filter]").each(function() {
            if (!$(this).is(':hidden')) {
                othertherapy_lists = false;
            }
        });
        var performance_lists = true;
        $("[name=performance_list-filter]").each(function() {
            if (!$(this).is(':hidden')) {
                performance_lists = false;
            }
        });
        var consultation_fee_lists = true;
        $("[name=consultation_fee_list-filter]").each(function() {
            if (!$(this).is(':hidden')) {
                consultation_fee_lists = false;
            }
        });
        var situation_lists = true;
        $("[name=situation_list-filter]").each(function() {
            if (!$(this).is(':hidden')) {
                situation_lists = false;
            }
        });
        var setting_lists = true;
        $("[name=setting_list-filter]").each(function() {
            if (!$(this).is(':hidden')) {
                setting_lists = false;
            }
        });
        var traumatic_lists = true;
        $("[name=traumatic_list-filter]").each(function() {
            if (!$(this).is(':hidden')) {
                traumatic_lists = false;
            }
        });
        var afflictions = true;
        $("[name=affliction-filter]").each(function() {
            if (!$(this).is(':hidden')) {
                afflictions = false;
            }
        });
        var professions = true;
        $("[name=profession-filter]").each(function() {
            if (!$(this).is(':hidden')) {
                professions = false;
            }
        });
        if (insurance_lists && othertherapy_lists && consultation_fee_lists && performance_lists && setting_lists && situation_lists && traumatic_lists && afflictions && professions && $("#group-filter").is(":hidden") && $("#emdr_basic_training-filter").is(":hidden") && $("#clinical_supervision-filter").is(":hidden") && $("#emdr_ceu-filter").is(":hidden") && $("#consultation-filter").is(":hidden") && $("#gender-filter").is(":hidden") && $("#language-filter").is(":hidden") && $("#practice_yrs-filter").is(":hidden") && $("#emdr_yrs-filter").is(":hidden") && $("#transportation-filter").is(":hidden") && $("#accessible-filter").is(":hidden") && $("#list_countries-filter").is(":hidden") && $("#list_states-filter").is(":hidden") && $("#list_cities-filter").is(":hidden") && $("#distances-filter").is(":hidden") && $("#face-filter").is(":hidden") && $("#phone-filter").is(":hidden") && $("#email-filter").is(":hidden") && $("#skype-filter").is(":hidden") && $("#forum-filter").is(":hidden") && $("#trainee-filter").is(":hidden") && $("#individual-filter").is(":hidden") && $("#group-filter").is(":hidden") && $("#specifypopulation-filter").is(":hidden") && $("#emdria_cert-filter").is(":hidden") && $("#studygroup-filter").is(":hidden") && $("#non_training_oppty-filter").is(":hidden") && $("#clinical_supervision-filter").is(":hidden")) {
            $("#search-filters-header").hide();
        }
        createHash();
    });
});
var GENERAL = {
        viewport: $(window).width()
    },
    NAVBAR = {
        init: function() {
            // nav hover
            $('.navbar-nav > li').hoverIntent(function() {
                $('.dropdown-wrap', this).stop(true).show();
            }, function() {
                $('.dropdown-wrap', this).stop(true).hide();
            });
            // mobile nav toggle
            $('.navbar-toggle').on('click', function() {
                if (snapper.state().state == "left") {
                    snapper.close();
                } else {
                    snapper.open('left');
                }
            });
            // filter navbar toggle
            $('.filter-toggle').on('click', function() {
                if (snapper.state().state == "right") {
                    snapper.close();
                } else {
                    snapper.open('right');
                }
            });
        }
    },
    HOME = {
        column_delay: 350,
        init: function() {
            if (GENERAL.viewport > 767) $('.box').hoverIntent({
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
            }, HOME.column_delay, 'easeInOutExpo', function() {
                $($testimContent, this).animate({
                    'opacity': 1
                }, HOME.column_delay, 'easeInOutExpo');
            });
            $('.testimonial-trigger').hoverIntent({
                over: function() {
                    $('.box-overlay', self).animate({
                        'top': 0
                    }, 750, 'easeInOutExpo');
                },
                off: function() {},
                interval: 10
            });
        },
        colOff: function() {
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
        init: function() {
            $('.faq .content').hide();
            $('.faq .trigger').on('click', function() {
                $('.faq .trigger').removeClass('set');
                if ($('.faq .content').is(":visible")) {
                    $('.faq .content').slideUp(SHELVES.dur);
                }
                $(this).parent().find('.content').stop(true).animate({
                    height: 'toggle'
                }, SHELVES.dur);
                $(this).addClass('set');
            });
            if (SHELVES.loc) {
                var target = $('a[href=' + SHELVES.loc + ']'),
                    target_top = $(target).offset().top;
                $(target).click();
                $('#content').animate({
                    scrollTop: target_top
                }, 1250, 'easeOutExpo');
            }
        },
        expand: function() {
            $('.faq .content').slideDown(SHELVES.dur);
            $('.faq .trigger').addClass('set');
        },
        collapse: function() {
            var shelves = $('.faq .content');
            $('.faq .content').slideUp(SHELVES.dur);
            $('.faq .trigger').removeClass('set');
        },
        clicks: function() {
            $('.faq-toggle .expand-all').click(function(e) {
                SHELVES.expand();
                e.preventDefault();
            });
            $('.faq-toggle .collapse-all').click(function(e) {
                SHELVES.collapse();
                e.preventDefault();
            });
        }
    };
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
    if (hashes.query && hashes.query !== '') {
        var search_text = hashes.query;
        search_text = search_text.replace(/%20/g, " ");
        search_text = search_text.replace("United States", ""); //task_id=29138
        $("#search_results_empty").hide();
        $("#search_results_list").show();
        $("#search-header .editable-region").html(search_text);
        $("#search_query").val(search_text);
    } else {
        $("#search_results_empty").show();
        $("#search_results_list").hide();
        return false;
    }
    /* uncomment for distance
     if(hashes.distance && hashes.distance != '') {
     var search_distance = hashes.distance;

     $("#search_distance").val(search_distance);
     }
     if(hashes.distance == ""){
     hashes.distance = $("#search_distance").val();
     }
 */
    if (hashes.rows === "") {
        hashes.rows = $("#rows_numbers").val();
    }
    /* if(hashes.distance == ""){
        hashes.distance = $("#distances_n").val();
    }

    if(hashes.country == ""){
     hashes.country = $("#list_countries").val();
     }

     if(hashes.state == ""){
     hashes.state = $("#list_states").val();
     }
     if(hashes.city == ""){
     hashes.city = $("#list_cities").val();
     }*/
    numberPerPage = $("#rows_numbers_chosen").find("span").html();
    if (numberPerPage === "") numberPerPage = 5;
    hashes.consultant = hashes.consultant || false;
    hashes.language = hashes.language || '';
    hashes.practice_yrs = hashes.practice_yrs || '';
    hashes.profession = hashes.profession || '';
    hashes.emdr_yrs = hashes.emdr_yrs || '';
    hashes.transportation = hashes.transportation || '';
    hashes.accessible = hashes.accessible || ''; /**/
    var param = {
        "token":search_token_key,
        "size": numberPerPage,
        "search": hashes.query,
        "narrow": hashes.narrow,
        "insurance": hashes.insurance,
        "othertherapy": hashes.othertherapy,
        "performance": hashes.performance,
        "situation": hashes.situation,
        "setting": hashes.setting,
        "traumatic": hashes.traumatic,
        "gender": hashes.gender,
        "consultation_fee": hashes.consultation_fee,
        "language": hashes.language,
        "practice_yrs": hashes.practice_yrs,
        "profession": hashes.profession,
        "distance": hashes.distance,
        "consultant": hashes.consultant,
        "pagenumber": (hashes.page && parseInt(hashes.page, 10) > 1) ? parseInt(hashes.page, 10) : 1,
        "rowsperpage": hashes.rows,
        "country": hashes.country,
        "state": hashes.state,
        "city": hashes.city,
        'postal': hashes.postal,
        'types': hashes.types,
        'ages': hashes.ages,
        'modalities': hashes.modalities,
        'population': hashes.population,
        'specialtiesconditions': hashes.specialtiesconditions,
        'religious': hashes.religious,
        "emdr_yrs": hashes.emdr_yrs,
        "transportation": hashes.transportation,
        "accessible": hashes.accessible,
        "consultation": hashes.consultation,
        "emdr_ceu": hashes.emdr_ceu,
        "clinical_supervision": hashes.clinical_supervision,
        "emdr_basic_training": hashes.emdr_basic_training,
        'face': hashes.face,
        'phone': hashes.phone,
        'email': hashes.email,
        'skype': hashes.skype,
        'forum': hashes.forum,
        'trainee': hashes.trainee,
        'individual': hashes.individual,
        "group": hashes.group,
        'specifypopulation': hashes.specifypopulation,
        'emdria_cert': hashes.emdria_cert,
        'studygroup': hashes.studygroup,
        'non_training_oppty': hashes.non_training_oppty,
        'acceptphoneconsultationfree': hashes.acceptphoneconsultationfree,
        'advancedtraining':hashes.advancedtraining,
        'no_location':hashes.no_location
    };
    $("#search-loading").css("top", parseInt($("#content").scrollTop(), 10) + "px");
    $("#search-loading").show();
    $(".pagination").html("");
    //$("#search-filters-header, #affliction-filter, #gender-filter, #language-filter, #practice_yrs-filter, #sexuality-filter").hide();
    $("#affliction-filter, #othertherapy_list-filter, #insurance_list-filter,#performance_list-filter, #setting_list-filter , #situation_list-filter,#traumatic_list-filter,  #gender-filter, #consultation_fee_list-filter, #language-filter, #practice_yrs-filter, #emdr_yrs-filter, #transportation-filter , #accessible-filter, #list_countries-filter, #list_states-filter, #list_cities-filter, #sexuality-filter").hide();
    // task_id=28821
    var consultantListhide = ['feebase_consultation', 'consultation', 'emdr_basic_training', 'emdr_ceu','face', 'phone', 'email', 'skype', 'forum', 'trainee', 'individual', 'group', 'specifypopulation', 'emdria_cert', 'studygroup', 'non_training_oppty', 'clinical_supervision'];
    $.each(consultantListhide, function(key, v) {
        $('#' + v + '-filter').hide();
    });
    console.log("Searching therapists with");
    console.log(param);
    $.ajax({
        type: 'POST',
        url: admin_ajax_url,
        dataType: 'json',
        cache: false,
        async: false,
        data: {
            action: 'api_getTherapists',
            parameters: param
        },
        success: function(response) { 
            globalObj.data = response.data;
            $(".search-results .result.row").remove();
            $(".results-summary").html("Showing no result");
            if (response.status == "succ") {
                data = response.data;
                data.page =  $("#search_page").val();
                if (data.found && data.therapists.length > 0) {
					if(hashes.page && parseInt(hashes.page, 10) > 0){
						data.page = parseInt(hashes.page, 10);
					}
                    pagination(data, numberPerPage);
                    $('#search_total').val(data.therapists.length);
                    
                  //task_id=37614
                    var numperpage = parseInt( $('#rows_numbers').val() );  
                    var search_total = parseInt( $('#search_total').val() );
                    var no_location = $('#no_location').val(); 
                    console.log('numperpage =',numperpage);
                    console.log('total  =',search_total);
                    console.log('no_location=',no_location);
                    if ( search_total < numperpage && no_location!=1){ 
                        
                        setTimeout( function() {
                            $('#page_warning').show();
                        }, 2000 );/**/
                        
                        // get current distances 
                        var distance = $("#distances_n").val();
                        // do search again with new distance 
                        if (distance ==25){
                            console.log('change distance to',50);
                            $('#distances_n').val(50).trigger("chosen:updated");
                            $("#distances_n").trigger('change') ;
                            
                        }
                        if (distance ==50){
                            console.log('change distance to',100);
                            $('#distances_n').val(100).trigger("chosen:updated");
                            $("#distances_n").trigger('change') ;
                        }
                        //searchTherapists(hashes); 
                    }
                    $('#page_warning').hide(); 
                    
                }
                
                generateAfflictions(data.narrow);
                generateinsurance_lists(data.insurance);
                generateothertherapy_lists(data.othertherapy);
                generateperformance_lists(data.perfomance);
                generatesituation_lists(data.situations);
                generatetraumatic_lists(data.traumatic);
                if (data.all_levels.length === 0) {
                    $('.all_levels').hide();
                }
                if (data.training_completed.length === 0) {
                    $('.training_completed').hide();
                }
                if (data.advancedtraining.length === 0) {
                    $('.advancedtraining').hide();
                }
                if (data.specific_population.length === 0) {
                    $('.specific_population').hide();
                }
                if (data.consultation_fee1.length === 0) {
                    $('.consultation_fee1').hide();
                }
                if (data.consultation_fee2.length === 0) {
                    $('.consultation_fee2').hide();
                }
                if (data.consultation_fee3.length === 0) {
                    $('.consultation_fee3').hide();
                }
                if (data.consultation_fee4.length === 0) {
                    $('.consultation_fee4').hide();
                }
                if (data.consultation_fee5.length === 0) {
                    $('.consultation_fee5').hide();
                }
                if (data.setting1.length === 0) {
                    $('.setting1').hide();
                }
                if (data.setting2.length === 0) {
                    $('.setting2').hide();
                }
                if (data.setting3.length === 0) {
                    $('.setting3').hide();
                }
                if (data.setting4.length === 0) {
                    $('.setting4').hide();
                }
                if (data.setting5.length === 0) {
                    $('.setting5').hide();
                }
                // #38056
                if (data.emdr_basic_training.length === 0) {
                    $('#emdr_basic_training').parent('li').addClass('hidden-importance');
                } else {
                    $('#emdr_basic_training').parent('li').removeClass('hidden-importance');
                }
                if (data.emdr_ceu.length === 0) {
                    $('#emdr_ceu').parent('li').addClass('hidden-importance');
                } else {
                    $('#emdr_ceu').parent('li').removeClass('hidden-importance');
                }
                if (data.consultation == undefined || data.consultation.length === 0) {
                    $('#consultation').parent('li').addClass('hidden-importance');
                } else {
                    $('#consultation').parent('li').removeClass('hidden-importance');
                }
                if (!data.setting1) {
                    $('#face').parent('li').addClass('hidden-importance');
                } else {
                    $('#face').parent('li').removeClass('hidden-importance');
                }
                if (!data.setting2) {
                    $('#phone').parent('li').addClass('hidden-importance');
                } else {
                    $('#phone').parent('li').removeClass('hidden-importance');
                }
                if (!data.setting3) {
                    $('#email').parent('li').addClass('hidden-importance');
                } else {
                    $('#email').parent('li').removeClass('hidden-importance');
                }
                if (!data.setting4) {
                    $('#skype').parent('li').addClass('hidden-importance');
                } else {
                    $('#skype').parent('li').removeClass('hidden-importance');
                }
                if (!data.setting5) {
                    $('#forum').parent('li').addClass('hidden-importance');
                } else {
                    $('#forum').parent('li').removeClass('hidden-importance');
                }
                if(data.genders.length === 0){
                    $('#gender li').addClass('hidden-importance');
                } else if (data.genders.length == 2){
                    $('#gender li').removeClass('hidden-importance');
                } else {
                    var return_gender = data.genders[0].gender;
                    if(return_gender == 'Male'){
                        $('#gender a.female').parent('li').addClass('hidden-importance');
                        $('#gender a.male').parent('li').removeClass('hidden-importance');
                    } else {
                        $('#gender a.male').parent('li').addClass('hidden-importance');
                        $('#gender a.female').parent('li').removeClass('hidden-importance');
                    }
                }
                generateSelect_Practice('practice_yrs', data.practice_yrs);
                generateSelect_InEMDR('emdr_yrs', data.emdr_yrs);
                generateSelect_lists('training_completed', data.training_completed);
                generateSelect_lists('advancedtraining', data.advancedtraining);
                //alert(data.narrow.toSource());
                generateLanguages(data.languages);
                generateProfessions(data.professions);
                //#// task_id=29285
                generateValue_text('nonemdr_training', data.nonemdr_training);
                //#// task_id=28820
                generateValue_lists('cities', data.cities);
                //generateValue_lists('counties', data.counties); //task_id=29150
                generateValue_lists('postal', data.postal);
                generateSelect_lists('types', data.types);
                generateSelect_lists('ages', data.ages);
                generateSelect_lists('population', data.population);
                generateSelect_lists('modalities', data.modalities);
                generateSelect_lists('specialtiesconditions', data.specialtiesconditions);
                generateSelect_lists('religious', data.religious);
                generateSelect_lists('acceptphoneconsultationfree', data.acceptphoneconsultationfree);
                
                setTimeout(
                          function() 
                          {
                              console.log('current hashes = ', hashes );
                              console.log('delay');
                            // try delay to make sure all fitler rendered
                              var othertherapys = hashes.othertherapy.split(',');
                              $.each(othertherapys, function(i, v) {
                                  $('a.othertherapy' + v).css('color', '#ccc').css('font-style', 'italic').click();
                              });
                              var training_completed = hashes.training_completed.split(',');
                              $.each(training_completed, function(i, v) {
                                  $('a.training_completed' + v).css('color', '#ccc').css('font-style', 'italic').click();
                              });
                              var advancedtraining = hashes.advancedtraining.split(',');
                              
                              
                              $.each(advancedtraining,function(i,v){
                                  console.log('a.advancedtraining' + v.replace(/[\s]/g, "."));
                                  $('a.advancedtraining' + v ).css('color','#ccc').css('font-style','italic');
                              });
                               
                              if (hashes.gender) {
                                  $('.' + hashes.gender).click();
                              }
                               
                              if (hashes.performance) {
                                  $.each(hashes.performance.split(','), function(i, v) {
                                      $('a.performance' + v).click();
                                  });
                              }
                              if (hashes.traumatic) {
                                  $.each(hashes.traumatic.split(','), function(i, v) {
                                      $('a.traumatic' + v).click();
                                  });
                              }
                              if (hashes.situation) {
                                  $.each(hashes.situation.split(','), function(i, v) {
                                      $('a.situation' + v).click();
                                  });
                              }
                              if (hashes.distance) {
                                  $('.' + hashes.distance).click();
                              }
                              if (hashes.language) {           
                                 console.log(hashes.language);
                                $("#language-filter").show();
                                  $('.' + hashes.language).click();
                              }
                              
                              if (hashes.practice_yrs) {
                                  $('#practice_yrs').val(hashes.practice_yrs) ; //task_id=29161
                                  $("#practice_yrs-filter").show();
                              } else $("#practice_yrs-filter").hide();
                              // task_id=28820
                              if (hashes.transportation == 'transportation') {
                                  $('#transportation .' + hashes.transportation).click();
                                  $('.img-transportation .' + hashes.transportation).click();
                                  $("#search-filters-header, #transportation-filter").show();
                              }
                              if (hashes.accessible == 'accessible') {
                                  $('#accessible .' + hashes.accessible).click();
                                  $('.img-accessible .' + hashes.transportation).click();
                                  $("#search-filters-header, #accessible-filter").show();
                              }
                              // task_id=28821
                              var consultantList = ['feebase_consultation', 'consultation', 'emdr_basic_training', 'emdr_ceu','face', 'phone', 'email', 'skype', 'forum', 'trainee', 'individual', 'group', 'specifypopulation', 'emdria_cert', 'studygroup', 'non_training_oppty', 'clinical_supervision'];
                              $.each(consultantList, function(key, value) {
                                  // console.log(hashes[value]);
                                  if (hashes[value] !== '' && hashes[value] != '0' && typeof hashes[value] != 'undefined') {
                                      $('#' + value + ' .' + hashes[value]).click();
                                      $("#" + value + "-filter>span").html($('#' + value).parent().text()).removeClass().addClass($('#' + value).attr('class'));
                                      $('#search-filters-header, #' + value + '-filter').show();
                                  }
                              });
                              if (hashes.emdr_yrs) {
                                  $('#emdr_yrs').val(hashes.emdr_yrs); //task_id=29161
                                  $("#emdr_yrs-filter").show();
                              } else $("#emdr_yrs-filter").hide();
                              if (hashes.insurance) {
                                  $.each(hashes.insurance.split(','), function(i, v) {
                                      $('a.insurance' + v).click();
                                  });
                              }
                              if (hashes.acceptphoneconsultationfree) {
                                  var acceptphoneconsultationfree = hashes.acceptphoneconsultationfree.split(',');
                                  $.each(acceptphoneconsultationfree, function(i, v) {
                                      $('a.acceptphoneconsultationfree' + v).css('color', '#ccc').css('font-style', 'italic').click();
                                  });
                              }
                              if (hashes.types) {
                                  $.each(hashes.types.split(','), function(i, v) {
                                      $('a.types' + v).click();
                                  });
                              }
                              if (hashes.ages) {
                                  $.each(hashes.ages.split(','), function(i, v) {
                                      $('a.ages' + v).click();
                                  });
                              }
                              if (hashes.population) {
                                  $.each(hashes.population.split(','), function(i, v) {
                                      $('a.population' + v).click();
                                  });
                              }
                              if (hashes.modalities) {
                                  $.each(hashes.modalities.split(','), function(i, v) {
                                      $('a.modalities' + v).click();
                                  });
                              }
                              if (hashes.specialtiesconditions) {
                                  $.each(hashes.specialtiesconditions.split(','), function(i, v) {
                                      $('a.specialtiesconditions' + v).click();
                                  });
                              }
                              if (hashes.religious) {
                                  $.each(hashes.religious.split(','), function(i, v) {
                                      $('a.religious' + v).click();
                                  });
                              }
                              if (hashes.cities) {
                                  $('.' + hashes.cities).click();
                              }
                              if (hashes.counties) {
                                  $('.' + hashes.counties).click();
                              }
                              if (hashes.postal) {
                                  $('.' + hashes.postal).click();
                              }
                              $('.user-type').text(data.type);
                              
                              
                          }, 1500);
                
                
            } else {
                console.log(response.errorMsg);
            }
            //task_id=29177 'counties',
            var list_narrow_results = ['cities', 'postal', 'language', 'types', 'ages', 'population', 'modalities', 'specialtiesconditions', 'situation_list', 'traumatic_list', 'performance_list', 'othertherapy_list', 'religious', 'acceptphoneconsultationfree', 'training_completed','advancedtraining', 'profession', 'affliction'];
            for (var i = 0; i < list_narrow_results.length; i++) {
                var id_li = $('#' + list_narrow_results[i] + '_li');
                var id_ul = $('#' + list_narrow_results[i]);
                if (id_li.length) {
                    console.log(list_narrow_results[i] + ":" + id_ul.children("li").length);
                    if (id_ul.children("li").length <= 0) {
                        id_li.hide();
                    }
                    else id_li.show();
                }
            }
            //task_id=29177
            var insurance_list = $('#insurance_list');
            if (insurance_list.length) {
                console.log("insurance_list:" + insurance_list.children("li").length);
                if (insurance_list.children("li").length <= 0) {
                    insurance_list.parent().parent().hide();
                }
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

function prepareSearchTherapists(data) {
    if (data.found && data.found > 0) {
        var from, to;
        var param = {};
        param.rowsperpage = 5;
        pagination(data, param.rowsperpage);
        var page_num = data.page + 1;
        if (data.found < param.rowsperpage || data.found == param.rowsperpage) {
            from = 1;
            to = data.found;
        } else {
            if (page_num == 1) {
                from = 1;
            } else {
                from = (page_num - 1) * param.rowsperpage;
            }
            var number_page = data.found / param.rowsperpage;
            if (page_num < number_page) {
                to = page_num * param.rowsperpage;
            } else {
                to = data.found;
            }
        }
        $(".results-summary").html("Showing " + from + "-" + to + " of " + data.found + " results");
    }
    generateAfflictions(data.narrow);
    generateinsurance_lists(data.insurance);
    generateothertherapy_lists(data.othertherapy);
    generateperformance_lists(data.perfomance);
    generatesituation_lists(data.situations);
    generatetraumatic_lists(data.traumatic);
    if (data.all_levels.length === 0) {
        $('.all_levels').hide();
    }
    if (data.training_completed.length === 0) {
        $('.training_completed').hide();
    }
    if (data.advancedtraining.length === 0) {
        $('.advancedtraining').hide();
    }
    if (data.specific_population.length === 0) {
        $('.specific_population').hide();
    }
    if (data.consultation_fee1.length === 0) {
        $('.consultation_fee1').hide();
    }
    if (data.consultation_fee2.length === 0) {
        $('.consultation_fee2').hide();
    }
    if (data.consultation_fee3.length === 0) {
        $('.consultation_fee3').hide();
    }
    if (data.consultation_fee4.length === 0) {
        $('.consultation_fee4').hide();
    }
    if (data.consultation_fee5.length === 0) {
        $('.consultation_fee5').hide();
    }
    if (data.setting1.length === 0) {
        $('.setting1').hide();
    }
    if (data.setting2.length === 0) {
        $('.setting2').hide();
    }
    if (data.setting3.length === 0) {
        $('.setting3').hide();
    }
    if (data.setting4.length === 0) {
        $('.setting4').hide();
    }
    if (data.setting5.length === 0) {
        $('.setting5').hide();
    }
    if (data.years.pr1.length === 0) {
        $('.less5').hide();
    }
    if (data.years.pr2.length === 0) {
        $('.more5').hide();
    }
    if (data.years.pr3.length === 0) {
        $('.more10').hide();
    }
    if (data.years.pr4.length === 0) {
        $('.more20').hide();
    }
    if (data.years.pr5.length === 0) {
        $('.more30').hide();
    }
    generateSelect_Practice('practice_yrs', data.practice_yrs);
    generateSelect_InEMDR('emdr_yrs', data.emdr_yrs);
    generateSelect_lists('training_completed', data.training_completed);
    generateSelect_lists('advancedtraining', data.advancedtraining);
    //alert(data.narrow.toSource());
    generateLanguages(data.languages);
    generateProfessions(data.professions);
    //#// task_id=29285
    generateValue_text('nonemdr_training', data.nonemdr_training);
    //#// task_id=28820
    generateValue_lists('cities', data.cities);
    //generateValue_lists('counties', data.counties); //task_id=29150
    generateValue_lists('postal', data.postal);
    generateSelect_lists('types', data.types);
    generateSelect_lists('ages', data.ages);
    generateSelect_lists('population', data.population);
    generateSelect_lists('modalities', data.modalities);
    generateSelect_lists('specialtiesconditions', data.specialtiesconditions);
    generateSelect_lists('religious', data.religious);
    generateSelect_lists('acceptphoneconsultationfree', data.acceptphoneconsultationfree);
    $('.user-type').text(data.type);
}

function stripslashes(str) {
    //       discuss at: http://phpjs.org/functions/stripslashes/
    //      original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    //      improved by: Ates Goral (http://magnetiq.com)
    //      improved by: marrtins
    //      improved by: rezna
    //         fixed by: Mick@el
    //      bugfixed by: Onno Marsman
    //      bugfixed by: Brett Zamir (http://brett-zamir.me)
    //         input by: Rick Waldron
    //         input by: Brant Messenger (http://www.brantmessenger.com/)
    // reimplemented by: Brett Zamir (http://brett-zamir.me)
    //        example 1: stripslashes('Kevin\'s code');
    //        returns 1: "Kevin's code"
    //        example 2: stripslashes('Kevin\\\'s code');
    //        returns 2: "Kevin\'s code"
    return (str + '').replace(/\\(.?)/g, function(s, n1) {
        switch (n1) {
            case '\\':
                return '\\';
            case '0':
                return '\u0000';
            case '':
                return '';
            default:
                return n1;
        }
    });
}

function loadTherapist(data, index) {
    var credentials = "";
    if (data.credentials) {
        for (var i = 0; i < data.credentials.length; i++) {
            if (i === 0) credentials = data.credentials[i];
            else credentials += ", " + data.credentials[i];
        }
    }
    data.bio = stripslashes(data.bio);
    console.log("ttttttttttttttttttttttttttt");
    console.log(data);
    //alert(data.url);
    // var profile_url = (data.url!='')? profile_path + encodeURIComponent(data.url): 'javascript:void(0)';
    var profile_url = (data.url !== '') ? data.url : 'javascript:void(0)';
    var row_html = '<div class="result row" id="therapist-' + index + '" data-name="' + data.name + '" data-id="' + data.id + '">' + '  <section class="result-left col-sm-3">';
    if (data.photo && data.photo !== "" && data.photo != "http://emdrdirectory.com/new/images/images-members/") {
        row_html += '<div class="profile-image" style="background-image: url(' + data.photo + ')">';
        row_html += '<a href="' + profile_url + '" ><img class="img-responsive" src="' + template_directory + '/assets/img/gfx-portal_small.png" alt="' + data.name + '" width="110" height="110"></a>';
    } else {
        row_html += '<div class="profile-image" style="background-image: url(http://placehold.it/110x110)">';
        row_html += '<img class="img-responsive" src="' + template_directory + '/assets/img/gfx-portal_small_2.png" alt="' + data.name + '" width="110" height="110">';
    }
    var terapist_title = data.name + ', ' + credentials;
    var url_modal_req = data.url;
    var verified_html = '';
    if(data.verified_all == 1){
        verified_html = '<div class="verified">Verified</div>';
    }
    url_modal_req = url_modal_req.replace( location.protocol + "//" + location.host + '/','');    
    row_html += '</div>' + '    <div class="text-center actions">' + '      <button type="button" class="tooltip btn btn-primary btn-favorite" data-toggle="button"  ><span class="text-hide favorite_result">Add to Favorites</span></button>' + '      <button data-toggle="button"  title="Email Me" class="tooltip btn btn-primary"   onclick="javascript:sendEmailModal(\'' + url_modal_req + '\',\'' + data.name + '\',\'' + terapist_title + '\');"><span class="text-hide email_result">Email to Friend</span></button>' + '    </div>' + '  </section>' + '  <section class="result-center col-sm-6 col-lg-6">' + '    <header>' + '      <h1><a href="' + profile_url + '" >' + data.name + ' <small style="display: inline;">' + credentials + '</small></a>' + verified_html + '</h1>' + data.subheading;
    /*if(data.verified && (data.verified == "1" || data.verified == "true"))
     row_html += '<div class="verified">Verified</div>';*/
    row_html += '</header>' + '    <div align="left"><p>' + data.bio.substr(0, 165) + ' ... <a style="float: right" href="' + profile_url + '" >View full profile &raquo;</a></p></div>' + '  </section>' + '  <div class="result-right col-sm-3">';
    if (data.addresses2 && data.addresses2.length > 0) {
        var PhoneEx = '';
        for (var i = 0; i < data.addresses2.length; i++) {
            //row_html += '<div class="result-phone sans">' + data.phones[i].number + '</div>';
            if (data.addresses2[i].primaryPhoneEx.length > 0 ) {
                PhoneEx = ' x ' + setFieldFormat(data.addresses2[i].primaryPhoneEx);
            }
            row_html += '<div class="result-phone sans primaryphone">' + setFieldFormat(data.addresses2[i].primaryPhone) + PhoneEx + '</div>';
        }
    }
    if (data.addresses2 && data.addresses2.length > 0) {
        var altPhoneEx = '';
        for (var i = 0; i < data.addresses2.length; i++) {
            //row_html += '<div class="result-phone sans">' + data.phones[i].number + '</div>';
            if (data.addresses2[i].altOfficePhoneEx.length > 0) {
                altPhoneEx = ' x ' + setFieldFormat(data.addresses2[i].altOfficePhoneEx);
            }
            row_html += '<div class="result-phone sans alternativephone">' + setFieldFormat(data.addresses2[i].altOfficePhone) + altPhoneEx + '</div>';
        }
    }
    if (data.addresses2 && data.addresses2.length > 0) {
        for (var i = 0; i < data.addresses2.length; i++) {
            //row_html += '<div class="result-phone sans">' + data.phones[i].number + '</div>';
            // row_html += '<div class="result-phone sans primaryfax">' + setFieldFormat(data.addresses2[i].primaryFax) + '</div>'; //Task id = 37616
        }
    }
    if (data.addresses2 && data.addresses2.length > 0) {
        // alert(data.addresses2.toSource());
        /*  row_html += '<div class="result-address address-top">' + data.addresses[0].addressLine1 + '<br/>';
         if(data.addresses[0].addressLine2 != "")
         row_html += data.addresses[0].addressLine2 + '<br/>';
         if(data.addresses[0].city != "")
         row_html += data.addresses[0].city + ' ';
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
         row_html += data.addresses[i].city + ' ';
         row_html += data.addresses[i].state + ' ' + data.addresses[i].zipCode + '</div>';
         }
         row_html += '</div>';
         row_html += '<a href="javascript:void(0)" onclick="javascript:toggleLocations(\'therapist-' + index + '\', this)" class="btn btn-default btn-small">More Locations</a>';
         }*/
        row_html += '<div class="result-address address-top">';
        for (var i = 0; i < data.addresses2.length; i++) {
            row_html += '<div class="result-address-more">';
            if (data.addresses2[i].businessName !== "") row_html += '<strong>' + stripslashes(data.addresses2[i].businessName) + '</strong><br />';
            if (data.addresses2[i].officeAddressLine1 !== "") row_html += stripslashes(data.addresses2[i].officeAddressLine1)  ;
            if (data.addresses2[i].officeAddressLine2 !== "" && (typeof data.addresses2[i].officeAddressLine2 !== 'undefined') ) row_html += ', ' + stripslashes(data.addresses2[i].officeAddressLine2)  ;
            
            if (data.addresses2[i].mailingpobox !== "") row_html += ', ' + stripslashes(data.addresses2[i].mailingpobox) ;
            
            row_html += '<br/>';            
            
            if (data.addresses2[i].city !== "") row_html += stripslashes(data.addresses2[i].city) + ' ';
            row_html += stripslashes(data.addresses2[i].stateOrProvince) + ' ' + stripslashes(data.addresses2[i].zip) + '</div>';
        }
        row_html += '</div>';
    }
    row_html += '</div>' + '</div>';
    $(".search-results .results-pagination").before(row_html);
    if (findFavorites(data.name)) {
        $("#therapist-" + index + " .btn-favorite").addClass("favorites-active");
        // add tip Remove Favorite
        $("#therapist-" + index + " .btn-favorite").prop('title', 'Remove Favorite');
        
    }
    else $("#therapist-" + index + " .btn-favorite").prop('title', 'Add Favorite');
    $("#therapist-" + index + " .btn-favorite").bind("click", function() {
        toggleFavorite(data.name, this);
    });
    //task_id=38182
    //$('[data-toggle="tooltip"]').tooltip({ boundary: 'window' });
    $('.tooltip').tooltipster({ theme: 'tooltipster-light', debug:false });
    
}
function setFieldFormat(data) {

    if (data.length > 3) {
        data = data.replace(/-/g, '');
        data = data.replace(')', '');
        data = data.replace('(', '');
        data = data.replace(' ', '');
        var areaCode = data.substring(0, 3);
        var nextThree = data.substring(3, 6);
        var lastFour = data.substring(6, 10);
        return '(' + areaCode + ')' + nextThree + '-' + lastFour;
    }
    else return data;
}
function toggleLocations(row_id, el) {
    $(".address-top", "#" + row_id).hide();
    $(".address-more", "#" + row_id).show();
    $(el).hide();
}

//Task 29754
function submittopage(e) {
    var toPage = e.value;
    var total_pages = parseInt($(".pagination>li.total_pages").attr("data-total"));
    if ($.isNumeric(toPage) == true && toPage > 0 && toPage <= total_pages) {
        goToPage(toPage);
        $(".page_numb_to_go>input").val(toPage);
    } else {
        return false;
    }
}

function goToPage(i) {
    $(".search-results .result.row").remove();
    numberPerPage = $("#rows_numbers_chosen").find("span").html();
    if (numberPerPage === "") numberPerPage = 5;
    data.page = i;
    $("#search_page").val(i)
	createHash();
}

function pagination(dataSave, rows) {
    dataSave = data;
    var total = data.therapists.length;
    var pages = Math.ceil(data.therapists.length / rows);
    var cpage = data.page;
    if (cpage === 0) cpage = 1;
    var start = Math.max(1, Math.floor((cpage - 1) / 4) * 4 + 1);
    var end = Math.min(pages, start + 3);
    var page_num = data.page;
    if (page_num <= 0) page_num = 1;
    var from, to;
    if (data.therapists.length < numberPerPage || data.therapists.length == numberPerPage) {
        from = 1;
        to = data.therapists.length;
    } else {
        if (page_num == 1) {
            from = 1;
        } else {
            from = (page_num - 1) * numberPerPage;
        }
        var number_page = data.therapists.length / numberPerPage;
        if (page_num < number_page) {
            to = page_num * numberPerPage;
        } else {
            to = data.therapists.length;
        }
    }
    if (page_num == 1) {
        $(".results-summary").html("Showing " + from + "-" + to + " of " + data.therapists.length + " results");
    }else{
        var from1 = from + 1;
        $(".results-summary").html("Showing " + from1 + "-" + to + " of " + data.therapists.length + " results");
    }
    /*// fix task_id=29798
    for (var i = from - 1; i <= (to - 1); i++) {
        loadTherapist(data.therapists[i], i);
    }*/

    // fix task_id=29754
    if (from == 1) {
        var curr_from = from - 1;
    } else {
        var curr_from = from;
    }
    var curr_to = to - 1;

    $(".search-results .result.row").remove();

    for (var i = curr_from; i <= curr_to; i++) {
        loadTherapist(data.therapists[i], i);
    }

    $(".pagination").html("");

    if (start > 1) {
        $(".pagination").append('<li class="prev"><a href="javascript:void(0);">&laquo;</a></li>');
    }
    for (var i = start; i <= end; i++) {
        if (i == cpage) {
            $(".pagination").append('<li class="current active number-' + i + '"><a href="javascript:void(0);">' + i + '</a></li>');
        } else {
            $(".pagination").append('<li class="number-' + i + '"><a href="javascript:void(0);" onclick="javascript:goToPage(' + i + ');">' + i + '</a></li>');
        }
    }
    if (end < pages || end == pages) {
        $(".pagination").append('<li class="page_numb_to_go"><input type="text" onkeyup="submittopage(this); return false;" placeholder="page" style="float:left;width:50px;padding:4px 2px;"></li>');
		
		// if ($(".pagination li.current.active.number-4>a").html() !== '4' && $(".pagination li.current.active.number-4").html() !== 'undefined'
        // ) {
		// 	$(".pagination .next").remove();
		// 	$(".pagination").append('<li class="next"><a href="javascript:void(0);">&raquo;</a></li>');
		// }
        if(end<pages) {//Task 38513
            $(".pagination").append('<li class="next"><a href="javascript:void(0);">&raquo;</a></li>');//Task 38513
        }//Task 38513

        if ($(".pagination li.current.active.number-1>a").html() !== '1' && $(".pagination li.current.active.number-1").html() !== 'undefined'
        ) { // fix task_id=29754
            $(".pagination .prev").remove();
            $(".pagination").prepend('<li class="prev"><a href="javascript:void(0);">&laquo;</a></li>');
        }

        $(".pagination").append('<li class=total_pages data-total="' + pages + '">' + pages + ' pages found</li>');
        $('.page_numb_to_go input').off();
        $('.page_numb_to_go input').keypress(function(e) {
            if (e.which == 13) {
                var p_val = $(this).val();
                var t_val = $('.total_pages').data('total');
                if (p_val <= t_val && p_val != "0") {
                    createHash(p_val);
                } else {
                    alert('Wrong Page number');
                }
                return false;
            }
        });
    }

    // fix task_id=29754
    $(".pagination>li.prev>a").click(function() {
        var prevNumPage = parseInt($("li.current>a").html()) - 1;
        $(".number-" + prevNumPage + ">a").trigger('click');

        data.page = start - 1;
        if (prevNumPage == (start - 1)) {
            pagination(data, rows); 
        }
    });

    $(".pagination>li.next>a").click(function() {
        var nextNumPage = parseInt($("li.current>a").html()) + 1;
        $(".number-" + nextNumPage + ">a").trigger('click');

        data.page = end + 1;
        if (nextNumPage == (end + 1)) {
            pagination(data, rows); 
        }
    });
    
}

function createHash(page) {
    
    if (page) $("#search_page").val(page);
    else page = $("#search_page").val();
    var query = $("#search_query").val();
    var no_location = $('#no_location').val(); 
    //var distance = $("#search_distance").val();
    /*if($('#affliction-filter>span').attr('class')){
     var narrow = $('#affliction-filter>span').attr('class').replace('narrow','');
     }
     else{
     var narrow = '';
     }*/
    var narrow, insurance, othertherapy, performance, situation, setting, consultation_fee;
    var affliction = $('[name=affliction-filter]>span[class^=narrow]');
    if (affliction.attr('class')) {
        narrow = '';
        affliction.each(function(i) {
            narrow += $(this).attr('class').replace('narrow', '');
            narrow += affliction.length - 1 != i ? ',' : '';
        });
    } else {
        narrow = '';
    }
    var insurance_list = $('[name=insurance_list-filter]>span[class^=insurance]');
    if (insurance_list.attr('class')) {
        insurance = '';
        insurance_list.each(function(i) {
            insurance += $(this).attr('class').replace('insurance', '');
            insurance += insurance_list.length - 1 != i ? ',' : '';
        });
    } else {
        insurance = '';
    }
    console.log('%c%s', 'color: red; font-weight: bold; text-decoration: underline;', insurance);
    var othertherapy_list = $('[name=othertherapy_list-filter]>span[class^=othertherapy]');
    if (othertherapy_list.attr('class')) {
        othertherapy = '';
        othertherapy_list.each(function(i) {
            othertherapy += $(this).attr('class').replace('othertherapy', '');
            othertherapy += othertherapy_list.length - 1 != i ? ',' : '';
        });
    } else {
        othertherapy = '';
    }
    var performance_list = $('[name=performance_list-filter]>span[class^=performance]');
    if (performance_list.attr('class')) {
        performance = '';
        performance_list.each(function(i) {
            performance += $(this).attr('class').replace('performance', '');
            performance += performance_list.length - 1 != i ? ',' : '';
        });
    } else {
        performance = '';
    }
    var situation_list = $('[name=situation_list-filter]>span[class^=situation]');
    if (situation_list.attr('class')) {
        situation = '';
        situation_list.each(function(i) {
            situation += $(this).attr('class').replace('situation', '');
            situation += situation_list.length - 1 != i ? ',' : '';
        });
    } else {
        situation = '';
    }
    var setting_list = $('[name=setting_list-filter]>span[class^=setting]');
    if (setting_list.attr('class')) {
        setting = '';
        setting_list.each(function(i) {
            setting += $(this).attr('class').replace('setting', '');
            setting += setting_list.length - 1 != i ? ',' : '';
        });
    } else {
        setting = '';
    }
    var consultation_fee_list = $('[name=consultation_fee_list-filter]>span[class^=consultation_fee]');
    if (consultation_fee_list.attr('class')) {
        consultation_fee = '';
        consultation_fee_list.each(function(i) {
            consultation_fee += $(this).attr('class').replace('consultation_fee', '');
            consultation_fee += consultation_fee_list.length - 1 != i ? ',' : '';
        });
    } else {
        consultation_fee = '';
    }
    var traumatic, gender;
    var traumatic_list = $('[name=traumatic_list-filter]>span[class^=traumatic]');
    if (traumatic_list.attr('class')) {
        traumatic = '';
        traumatic_list.each(function(i) {
            traumatic += $(this).attr('class').replace('traumatic', '');
            traumatic += traumatic_list.length - 1 != i ? ',' : '';
        });
    } else {
        traumatic = '';
    }
    if ($('#gender-filter>span').attr('class')) {
        gender = $('#gender-filter>span').attr('class');
    } else {
        gender = '';
    }
    // task_id=28821
    var consultantList = ['feebase_consultation', 'consultation', 'emdr_basic_training', 'emdr_ceu','face', 'phone', 'email', 'skype', 'forum', 'trainee', 'individual', 'group', 'specifypopulation', 'emdria_cert', 'studygroup', 'non_training_oppty', 'clinical_supervision'];
    var feebase_consultation, consultation, emdr_basic_training, emdr_ceu,face, phone, email, skype, forum, trainee, individual, group, specifypopulation, emdria_cert, studygroup, non_training_oppty, clinical_supervision = '';
    $.each(consultantList, function(key, value) {
        var var_list = $('[name=' + value + '-filter]>span[class^=' + value + ']');
        if (var_list.attr('class')) {
            var return_list = '';
            var_list.each(function(i) {
                return_list += $(this).attr('class').replace(value, '');
                return_list += var_list.length - 1 != i ? ',' : '';
            });
        } else {}
        var return_list = '';
        if ($('#' + value + '-filter>span').attr('class')) {
            return_list = $('#' + value + '-filter>span').attr('class');
        } else {
            return_list = 0;
        }
        if (value.indexOf('feebase_consultation') >= 0) {
            feebase_consultation = return_list;
        }
        if (value.indexOf('consultation') >= 0) {
            consultation = return_list;
        }
        if (value.indexOf('emdr_basic_training') === 0) {
            emdr_basic_training = return_list;
        }
        if (value.indexOf('emdr_ceu') === 0) {
            emdr_ceu = return_list;
        }
        if (value.indexOf('face') >= 0) {
            face = return_list;
        }
        if (value.indexOf('phone') >= 0) {
            phone = return_list;
        }
        if (value.indexOf('email') >= 0) {
            email = return_list;
        }
        if (value.indexOf('skype') >= 0) {
            skype = return_list;
        }
        if (value.indexOf('forum') >= 0) {
            forum = return_list;
        }
        if (value.indexOf('trainee') >= 0) {
            trainee = return_list;
        }
        if (value.indexOf('individual') >= 0) {
            individual = return_list;
        }
        if (value.indexOf('group') === 0) {
            group = return_list;
        }
        if (value.indexOf('specifypopulation') >= 0) {
            specifypopulation = return_list;
        }
        if (value.indexOf('emdria_cert') >= 0) {
            emdria_cert = return_list;
        }
        if (value.indexOf('studygroup') === 0) {
            studygroup = return_list;
        }
        if (value.indexOf('non_training_oppty') >= 0) {
            non_training_oppty = return_list;
        }
        if (value.indexOf('clinical_supervision') >= 0) {
            clinical_supervision = return_list;
        }
    });
    /*
     if($('#consultation-filter>span').attr('class')){
     var consultation = $('#consultation-filter>span').attr('class');
     }
     else{
     var consultation = '';
     }

     if($('#emdr_ceu-filter>span').attr('class')){
     var emdr_ceu = $('#emdr_ceu-filter>span').attr('class');
     }
     else{
     var emdr_ceu = '';
     }

     if($('#clinical_supervision-filter>span').attr('class')){
     var clinical_supervision = $('#clinical_supervision-filter>span').attr('class');
     }
     else{
     var clinical_supervision = '';
     }

     if($('#emdr_basic_training-filter>span').attr('class')){
     var emdr_basic_training = $('#emdr_basic_training-filter>span').attr('class');
     }
     else{
     var emdr_basic_training = '';
     }
     if($('#group-filter>span').attr('class')){
     var group = $('#group-filter>span').attr('class');
     }
     else{
     var group = '';
     }
     */
    if ($('#language-filter>span').attr('class')) {
        var language = $('#language-filter>span').attr('class');
    } else {
        var language = '';
    }
    if ($('#practice_yrs-filter>span').attr('class')) {
        var practice_yrs = $('#practice_yrs-filter>span').attr('class');
    } else {
        var practice_yrs = '';
    }
    // task_id=28820
    if ($('#emdr_yrs-filter>span').attr('class')) {
        var emdr_yrs = $('#emdr_yrs-filter>span').attr('class');
    } else {
        var emdr_yrs = '';
    }
    if ($('#transportation-filter>span').attr('class')) {
        var transportation = $('#transportation-filter>span').attr('class');
    } else {
        var transportation = 0;
    }
    if ($('#accessible-filter>span').attr('class')) {
        var accessible = $('#accessible-filter>span').attr('class');
    } else {
        var accessible = 0;
    }
    if ($('#list_countries-filter>span').attr('class')) {
        var country = $('#list_countries-filter>span').attr('class');
    } else {
        var country = '';
    }
    if ($('#list_states-filter>span').attr('class')) {
        var state = $('#list_states-filter>span').attr('class');
    } else {
        var state = '';
    }
    if ($('#list_cities-filter>span').attr('class')) {
        var city = $('#list_cities-filter>span').attr('class');
    } else {
        var city = '';
    }
    if ($('#rows_numbers').val() !== "") {
        var rows = $('#rows_numbers').val();
    } else {
        var rows = '10';
    }
    if ($("[name=distance]").val() !== "") {
        var distance = $("[name=distance]").val();
    } else {
        var distance = '25';
    }

    // #32369
    if ($("#distances_n").val() !== "") {
        var distance = $("#distances_n").val();
    } else {
        var distance = '25';
    }
    /*
     uncomment for distance

     if($('#distances-filter>span').attr('class')){
     var distance = $('#distances-filter>span').attr('class');
     }
     else{
     var distance = '';
     }*/
    var profession = $('[name=profession-filter]>span[class^=profession]');
    if (profession.attr('class')) {
        var prof = '';
        profession.each(function(i) {
            prof += $(this).attr('class').replace('profession', '');
            prof += profession.length - 1 != i ? ',' : '';
        });
    } else {
        var prof = '';
    }
    consultant = $('#search_consultant').val();
    // task_id=28820
    var newList = ['types', 'ages', 'population', 'modalities', 'specialtiesconditions', 'religious', 'training_completed','advancedtraining', 'acceptphoneconsultationfree'];
    var city, country, postal, types, ages, population, modalities, specialtiesconditions, religious, training_completed,advancedtraining, acceptphoneconsultationfree = '';
    $.each(newList, function(key, value) {
        var var_list = $('[name=' + value + '-filter]>span[class^=' + value + ']');
        if (var_list.attr('class')) {
            var return_list = '';
            var_list.each(function(i) {
                return_list += $(this).attr('class').replace(value, '');
                return_list += var_list.length - 1 != i ? ',' : '';
            });
        } else {
            var return_list = '';
        }
        if (value.indexOf('types') >= 0) {
            types = return_list;
        }
        if (value.indexOf('ages') >= 0) {
            ages = return_list;
        }
        if (value.indexOf('population') >= 0) {
            population = return_list;
        }
        if (value.indexOf('modalities') >= 0) {
            modalities = return_list;
        }
        if (value.indexOf('specialtiesconditions') >= 0) {
            specialtiesconditions = return_list;
        }
        if (value.indexOf('religious') >= 0) {
            religious = return_list;
        }
        if (value.indexOf('training_completed') >= 0) {
            training_completed = return_list;
        }
        if (value.indexOf('advancedtraining') >= 0) {
            advancedtraining = return_list;
            console.log("DH--got advancedtraining");
        }
        if (value.indexOf('acceptphoneconsultationfree') >= 0) {
            acceptphoneconsultationfree = return_list;
        }
    });
    var newList2 = ['cities', 'postal']; //'counties',
    $.each(newList2, function(key, value) {
        var return_list = '';
        if ($('#' + value + '-filter>span').attr('class')) {
            return_list = $('#' + value + '-filter>span').attr('class');
        }
        //console.log(return_list);
        if (value.indexOf('cities') >= 0) {
            city = return_list;
        }
        if (value.indexOf('counties') >= 0) {
            country = return_list;
        }
        if (value.indexOf('postal') >= 0) {
            postal = return_list;
        }
    });
    var hashes = {
        "query": query,
        "narrow": narrow,
        "insurance": insurance,
        "othertherapy": othertherapy,
        "performance": performance,
        "situation": situation,
        "setting": setting,
        "traumatic": traumatic,
        "gender": gender,
        "consultation_fee": consultation_fee,
        "language": language,
        "practice_yrs": practice_yrs,
        "profession": prof,
        "consultant": consultant,
        "distance": distance,
        "rows": rows,
        "country": country,
        "state": state,
        "city": city,
        "page": page,
        'postal': postal,
        'types': types,
        'ages': ages,
        'population': population,
        'modalities': modalities,
        'specialtiesconditions': specialtiesconditions,
        'religious': religious,
        'transportation': transportation,
        'accessible': accessible,
        'emdr_yrs': emdr_yrs,
        'training_completed': training_completed,
        'advancedtraining': advancedtraining,
        'acceptphoneconsultationfree': acceptphoneconsultationfree,
        'feebase_consultation': feebase_consultation,
        "consultation": consultation,
        "emdr_basic_training": emdr_basic_training,
        "emdr_ceu": emdr_ceu,
        "clinical_supervision": clinical_supervision,
        'face': face,
        'phone': phone,
        'email': email,
        'skype': skype,
        'forum': forum,
        'trainee': trainee,
        'individual': individual,
        "group": group,
        'specifypopulation': specifypopulation,
        'emdria_cert': emdria_cert,
        'studygroup': studygroup,
        'non_training_oppty': non_training_oppty,
        'no_location':no_location
    };
    //console.log(hashes); return;
    location.hash = '#query:' + hashes.query + ';narrow:' + hashes.narrow + ';insurance:' + hashes.insurance + ';othertherapy:' + hashes.othertherapy + ';performance:' + hashes.performance + ';situation:' + hashes.situation + ';setting:' + hashes.setting + ';traumatic:' + hashes.traumatic + ';gender:' + hashes.gender + ';consultation_fee:' + hashes.consultation_fee + ';language:' + hashes.language + ';practice_yrs:' + hashes.practice_yrs + ';profession:' + hashes.profession + ';consultant:' + hashes.consultant + ';distance:' + hashes.distance + ';rows:' + hashes.rows + ';country:' + hashes.country + ';state:' + hashes.state + ';city:' + hashes.city + ';postal:' + hashes.postal + ';types:' + hashes.types + ';ages:' + hashes.ages + ';modalities:' + hashes.modalities + ';population:' + hashes.population + ';specialtiesconditions:' + hashes.specialtiesconditions + ';religious:' + hashes.religious + ';transportation:' + hashes.transportation + ';accessible:' + hashes.accessible + ';emdr_yrs:' + hashes.emdr_yrs + ';acceptphoneconsultationfree:' + hashes.acceptphoneconsultationfree + ';training_completed:' + hashes.training_completed + ';advancedtraining:' + hashes.advancedtraining + ';feebase_consultation:' + feebase_consultation + ';consultation:' + hashes.consultation + ';emdr_basic_training:' + hashes.emdr_basic_training + ';emdr_ceu:' + hashes.emdr_ceu + ';clinical_supervision:' + hashes.clinical_supervision + ';face:' + hashes.face +';phone:' + hashes.phone + ';email:' + hashes.email + ';skype:' + hashes.skype + ';forum:' + hashes.forum + ';trainee:' + hashes.trainee + ';individual:' + hashes.individual + ';group:' + hashes.group + ';specifypopulation:' + hashes.specifypopulation + ';emdria_cert:' + hashes.emdria_cert + ';studygroup:' + hashes.studygroup + ';non_training_oppty:' + hashes.non_training_oppty + ';no_location:' + hashes.no_location  + ';page:' + hashes.page;
    
    //searchTherapists(hashes);
}
// task_id=28820
var hash_keys = ['query', 'narrow', 'insurance', 'othertherapy', 'performance', 'situation', 'setting', 'traumatic', 'gender', 'consultation_fee', 'language', 'practice_yrs', 'profession', 'consultant', 'distance', 'rows', 'country', 'state', 'city', 'page', 'postal', 'types', 'ages', 'population', 'modalities', 'specialtiesconditions', 'religious', 'transportation', 'accessible', 'emdr_yrs', 'training_completed','advancedtraining', 'acceptphoneconsultationfree', 'feebase_consultation', 'consultation', 'emdr_basic_training', 'emdr_ceu','face' ,'phone', 'email', 'skype', 'forum', 'trainee', 'individual', 'group', 'specifypopulation', 'emdria_cert', 'studygroup', 'non_training_oppty', 'clinical_supervision','no_location'];
$(window).on('hashchange', function(e) {
    console.log('hashchange');
    /*if(typeof e.originalEvent !== 'undefined'){
        console.log(e.originalEvent.oldURL);
        console.log(e.originalEvent.newURL);
    }*/ 
        
    
    parseHash();
});

function parseHash() {
    var hashes = {};
    var count_filter = 0;
    var hash_str = location.hash;
    console.log('tracy test parseHash = ',hash_str);
    hash_str = $.trim(hash_str).replace("#", "")
    var arr1 = hash_str.split(';');
    for (var i = 0; i < arr1.length; i++) {
        if ($.trim(arr1[i]) != '') {
            var arr2 = arr1[i].split(':');
            if ($.trim(arr2[0]) != '' && hash_keys.indexOf($.trim(arr2[0]).toLowerCase()) != -1) {
                if ($.trim(arr2[1]) != '' && $.trim(arr2[1]) != '0' && $.trim(arr2[1]) != 'undefined' && $.trim(arr2[0]) != 'query' && $.trim(arr2[0]) != 'consultant' && $.trim(arr2[0]) != 'distance' && $.trim(arr2[0]) != 'rows' && $.trim(arr2[0]) != 'page') count_filter++; // task_id=29162     && &task_id=29166
                hashes[$.trim(arr2[0]).toLowerCase()] = (arr2[1]) ? $.trim(arr2[1]) : '';
            }
        }
    }
    console.log('parseHash = ',hashes);
    // task_id=29162    && &task_id=29166
    if (count_filter && $("#profession > li").length) { // task_id=28820
        //$("#profession").parent().show(); // task_id=30600
    } else $("#profession").parent().hide();
    searchTherapists(hashes);
}

function toggleFavorite(therapist_name, that, is_profile) {
    var $that = $(that);
    // Destroy the first instance.
    $that.tooltipster("destroy");
    if ($that.hasClass("favorites-active")) {
        $('#favoriteModal .modal-body>p').html("<b>" + therapist_name + "</b> has been removed from your favorites list!");
        $that.removeClass("favorites-active");
        removeFavorites(therapist_name);
        if (is_profile) {
            $that.html("Add Favorite");
        }
        //task_id=38182        
        $that.prop('title', 'Add Favorite'); 
    } else {
        $('#favoriteModal .modal-body>p').html("<b>" + therapist_name + "</b> has been added to your favorites list!");
        $that.addClass("favorites-active");
        addFavorites(therapist_name);
        if (is_profile) {
            $that.html('<span class="icn-star favorite_result"></span> Favorite');
        }
        $that.prop('title', 'Remove Favorite');
    }
    $that.tooltipster({ theme: 'tooltipster-light', debug:false});
     
    
    $('#favoriteModal').modal();
    setTimeout(function() {
        $('#favoriteModal').modal('hide');
    }, 2000);
}
jQuery(document).ready(function($) {
    $(".all-favorites").click(function() {
        $('#favoritesModal .modal-title').html("The therapist(s) in your favorites list!");
        $('#favoritesModal .modal-body li').remove();
        $('#favoritesModal .modal-body p.favorites-empty').remove();
        var therapists = getFavorites();
        if (therapists && therapists.length > 0) {
            for (var i = 0; i < therapists.length; i++) {

                var profile_url = '<a href="/' + (therapists[i].replace(' ', '.')).toLowerCase() + '" target="_blank">' + therapists[i] + '</a>';

                $('#favoritesModal .modal-body>ul').append("<li data-row='" + therapists[i] + "'>" + profile_url + " <a href='javascript:void(0);' class='favorites-remove'>remove</a></li>");
            }
        } else {
            $('#favoritesModal .modal-body').append("<p class='favorites-empty'>It's empty in your favorites list now</p>");
        }
        $('#favoritesModal .modal-body>ul a.favorites-remove').click(function() {
            removeFavorites($(this).parent().attr("data-row"));

            var name = $(this).parent().attr("data-row");
            $('div[data-name="'+name+'"]').find('.btn-favorite').removeClass("favorites-active");

            $(this).parent().remove();
        });
        $('#favoritesModal').modal();
    });
    $('#favoritesModal .add-favorites').click(function() {
        $(".search-results .result.row").each(function() {
            var therapist_name = $(this).attr("data-name");
            if (findFavorites(therapist_name)) {
                if (!$(this).find(".btn-favorite").hasClass("favorites-active")) $(this).find(".btn-favorite").addClass("favorites-active");
            } else {
                $(this).find(".btn-favorite").removeClass("favorites-active");
            }
        });
        $('#favoritesModal').modal('hide');
    });
    $(".btn-sendemail").click(function() {
        $("#sendmail_result").removeClass("error").removeClass("succ").html("");
        if (validateEmailForm()) {
            var query = $("form[name=frm-sendemail]").serialize();
            $.ajax({
                type: 'POST',
                url: admin_ajax_url + "?" + query,
                dataType: 'json',
                cache: false,
                data: {
                    action: 'sendemail_to_Terapist'
                },
                success: function(response) {
                    // update view email count
                    $.ajax({
                        url: '/vtiger/updateViewCount.php?contact_name=' + $('input[name=terapist_url]').val() + '&view_mode=view_count_2'
                    });
                    console.log(response);
                    if (response.result == "success") {
                        var confirm_text = "Thank you for contacting me. I/my staff will respond within " + response.emails_responded_business_days + " business days.";
                        $("#sendmail_result").removeClass("error").addClass("succ").html("<p>The email has been sent successfully!</p>");
                        $.confirm({
                            text: confirm_text,
                            cancelButton: false,
                            confirm: function() {
                                $('#emailModal').modal('hide');
                            },
                            confirmButton: "Close",
                        });

                        //setTimeout(function() {
                        //    $('#emailModal').modal('hide');
                        //}, 2000);
                    } else {
                        $("#sendmail_result").removeClass("succ").addClass("error").html("<p>" + response.error_msg + "</p>");
                    }
                },
                error: function(response) {
                    console.log(response.responseText);
                },
                complete: function() {
                    loadimg();
                    $('#loader').hide();
                }
            });
        } else {
            $("#sendmail_result").removeClass("succ").addClass("error");
        }
        return false;
    });

    loadimg();
});
function loadimg(){
    var url = '/wp-content/themes/emdr-v2/lib/captcha_code_file.php?time='+Date.now();
    $('#captchaimg').attr('src',url);
}
function addFavorites(therapist) {
    var therapists = getFavorites();
    if (therapists && therapists.length > 0) {
        if (therapists.indexOf(therapist) == -1) {
            therapists.push(therapist);
        }
        therapists = therapists.join();
    } else {
        therapists = therapist;
    }
    $.cookie("emdr.favorites.list", therapists, {
        path: '/'
    });
}

function removeFavorites(therapist) {
    var therapists = getFavorites();
    if (therapists && therapists.length > 0) {
        var index = therapists.indexOf(therapist)
        if (index != -1) {
            therapists.splice(index, 1);
        }
        therapists = therapists.join();
        $.cookie("emdr.favorites.list", therapists, {
            path: '/'
        });
    }
}

function findFavorites(therapist) {
    var therapists = getFavorites();
    if (therapists && therapists.length > 0) {
        var index = therapists.indexOf(therapist)
        if (therapists.indexOf(therapist) == -1) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}

function getFavorites() {
    var therapists = $.cookie("emdr.favorites.list");
    if (therapists && therapists != "") {
        therapists = therapists.split(',');
        return therapists;
    } else return null;
}

function sendEmailModal(terapist_url, terapist_name, title) {
    $("#emailModal").find("input[type=text],textarea").val("");
    $("#sendmail_result").removeClass("error").removeClass("succ").html("");
    $("#emailModal [name=terapist_name]").val(terapist_name);
    $("#emailModal [name=terapist_url]").val(terapist_url);
    $("#emailModal .modal-title .contact-name").html(title);
    $("#emailModal").modal();
}

function visitWebsite(terapist_url, website_url) {
    // update view website count
    is_viewed = $.cookie("emdr." + terapist_url);
    if (is_viewed == 1) {
        view_count_mode = 'view_count_3';
    } else {
        var date = new Date();
        var minutes = 60 * 24 * 365 * 50;
        date.setTime(date.getTime() + (minutes * 60 * 1000));
        $.cookie("emdr." + terapist_url, 1, {
            path: '/',
            expires: date
        });
        view_count_mode = 'view_count_5';
    }
    $.ajax({
        url: '/vtiger/updateViewCount.php?contact_name=' + terapist_url + '&view_mode=' + view_count_mode,
        success: function() {
            if (website_url.indexOf('//') > -1) {
            	window.open(website_url); 
            } else {
            	window.open('//' + website_url); 
            }
        }
    });
}

function validateEmailForm() {
    var result = true;
    var er = document.getElementById('sendmail_result');
    er.innerHTML = "";
    label = document.getElementById("nameTD");
    label.style.color = "black";
    if (validate_required(er, document.getElementsByName('contact_name')[0], "Please, enter your name.") == false || validate_text(er, document.getElementsByName('contact_name')[0], "entered name") == false) {
        label.style.color = "red";
        result = false;
    }
    label = document.getElementById("mail1TD");
    label.style.color = "black";
    if (validate_required(er, document.getElementsByName('contact_mail1')[0], "Please, enter your E-mail.") == false || validate_email(er, document.getElementsByName('contact_mail1')[0]) == false) {
        label.style.color = "red";
        result = false;
    }
    
    if (result) {
        //  Check email retype
        label = document.getElementById("mail2TD");
        label.style.color = "black";
        if (validate_required(er, document.getElementsByName('contact_mail2')[0], "Please, re-enter your E-mail.") == false) {
            label.style.color = "red";
            result = false;
        } else if (document.getElementsByName('contact_mail1')[0].value != document.getElementsByName('contact_mail2')[0].value) {
            label.style.color = "red";
            inp1 = document.createElement("p"); // error messages
            inp1.appendChild(document.createTextNode("The two email addresses that you entered do not match."));
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
    //label = document.getElementById("subjectTD");
    //label.style.color = "black";
    //if (validate_widetext(er, document.getElementsByName('subject')[0], "subject for message") == false) {
    //    label.style.color = "red";
    //    result = false;
    //}
    label = document.getElementById("messageTD");
    label.style.color = "black";
    if (validate_required(er, document.getElementsByName('message')[0], "Please, enter message text.") == false || validate_widetext(er, document.getElementsByName('message')[0], "message text", 1024) == false) {
        label.style.color = "red";
        result = false;
    }
    label = document.getElementById("captchaTextId");
    label.style.color = "black";
    if (validate_required(er, document.getElementsByName('security_code')[0], "Please, enter captcha text") == false) {
        label.style.color = "red";
        result = false;
    }
    if (result) SubmitDisplayLoader();
    return result;
}

function SubmitDisplayLoader() {
    DisplayLoader();
    setTimeout(function() {
        document.getElementById('loader').src = template_directory + '/assets/img/loader.gif';
    }, 0);
}

function generateAfflictions(list) {
    // alert(list.toSource());
    if (list) {
        //task_id=29177
        if (typeof list !== 'undefined' && list.length > 0) {
            $('#affliction').empty();
            $.each(list, function(i, v) {
                $('#affliction').append('<li><a href="javascript:void(0)" class="narrow' + v.id + '">' + v.name + '</a></li>');
            });
        }
    }
    if ($('#affliction li.hide').length == 0) {
        $('#affliction li').each(function() {
            if ($(this).index() > 3) {
                $(this).addClass('hide');
            }
        });
        $('#showMoreAffliction').text('Show More');
    }
    if (!list.length || list.length <= 13) {
        $('#showMoreAffliction').hide();
    }
}

function generateinsurance_lists(list) {
    // alert(list.toSource());
    if (list) {
        //task_id=29177
        if (typeof list !== 'undefined' && list.length > 0) {
            $('#insurance_list').empty();
            //$('.show_more_insurance_list').hide(); // fix task_id=30600
            $.each(list, function(i, v) {
                if (v.name.length == 0) return true;
                $('#insurance_list').append('<li><a   href="javascript:void(0)" class="insurance' + v.id + '">' + v.name + '</a></li> ');
            });
        }
    }
    if ($('#insurance_list li.hide').length == 0) {
        $('#insurance_list li').each(function() {
            if ($(this).index() > 3) {
                //$(this).addClass('hide');// fix task_id=30600
            }
        });
        $('#showMoreInsurance').text('Show More');
        $('#showMoreInsurance').show();
    }
    if (!list.length || list.length <= 4) {
        $('#showMoreInsurance').hide();
    }
}

function generateothertherapy_lists(list) {
    $("#othertherapy_list_li").closest('ul.unstyled').show();
    var list_val = '';
    $.each(list, function(i, v) {
        list_val += '<li><a href="javascript:void(0)" class="othertherapy' + v.id + '">' + v.name + '</a></li>';
    });
    $('#othertherapy_list').html('  ' + list_val.substring(0, list_val.length - 2));
    var realWidth = $("#othertherapy_list_li").outerWidth();
    var parentWidth = $("aside").width();
    $("#othertherapy_list_li").css({
        width: parentWidth + "px",
        overflow: "hidden"
    });
    if (realWidth <= parentWidth) {
        //$('.showmore-othertherapy_list').find('.cplus').hide(); //task_id=30600
    }
    $("#othertherapy_list_li").closest('.unstyled').hide();
    return;
    // alert(list.toSource());
    if (list) {
        //task_id=29177
        if (typeof list !== 'undefined' && list.length > 0) {
            $('#othertherapy_list').empty();
            $.each(list, function(i, v) {
                $('#othertherapy_list').append('<li><a  href="javascript:void(0)" class="othertherapy' + v.id + '">' + v.name + '</a></li> ');
            });
        }
    }
    if ($('#othertherapy_list li.hide').length == 0) {
        $('#othertherapy_list li').each(function() {
            if ($(this).index() > 3) {
                $(this).addClass('hide');
            }
        });
        $('#showMoreOthertherapy').text('Show More');
        $('#showMoreOthertherapy').show();
    }
    if (!list.length || list.length <= 4) {
        $('#showMoreOthertherapy').hide();
        if (!list.length) {
            $('#othertherapy_list').empty();
        }
    }
}

function generateperformance_lists(list) {
    $("#performance_list_li").closest('ul.unstyled').show();
    var list_val = '';
    $.each(list, function(i, v) {
        list_val += '<li ><a  href="javascript:void(0)" class="performance' + v.id + '">' + v.name + '</a></li>';
    });
    $('#performance_list').html('  ' + list_val.substring(0, list_val.length - 2));
    var realWidth = $("#performance_list_li").outerWidth();
    var parentWidth = $("aside").width();
    $("#performance_list_li").css({
        width: parentWidth + "px",
        overflow: "hidden"
    });
    if (realWidth <= parentWidth) {
        //$('.showmore-performance_list').find('.cplus').hide(); // task_id=30600
    }
    $("#performance_list_li").closest('.unstyled').hide();
    return;
    // alert(list.toSource());
    if (list) {
        //task_id=29177
        if (typeof list !== 'undefined' && list.length > 0) {
            $('#performance_list').empty();
            $.each(list, function(i, v) {
                $('#performance_list').append('<li><a href="javascript:void(0)" class="performance' + v.id + '">' + v.name + '</a></li>');
            });
        }
    }
    if ($('#performance_list li.hide').length == 0) {
        $('#performance_list li').each(function() {
            if ($(this).index() > 3) {
                $(this).addClass('hide');
            }
        });
        $('#showMorePerformance').text('Show More');
        $('#showMorePerformance').show();
    }
    if (!list.length || list.length <= 4) {
        $('#showMorePerformance').hide();
    }
}

function generateSelect_Practice(id, list) {
    if (id == 'practice_yrs') {
        var list_val = '<option value=""></option>';
        list.sort(function(a, b) {
               return (parseInt(a.id) > parseInt(b.id)) ? 1 : -1;
            });
        
        $.each(list, function(i, v) {
            list_val += '<option value="' + v.id + '">' + v.name + '</option> ';
        });

        $('#' + id).html(list_val);
        return;
    }
}

function generateSelect_InEMDR(id, list) {
    if (id == 'emdr_yrs') {
        var list_val = '<option value=""></option>';
        list.sort(function(a, b) {
           return (parseInt(a.id) > parseInt(b.id)) ? 1 : -1;
        });
        $.each(list, function(i, v) {
            list_val += '<option value="' + v.id + '">' + v.name + '</option> ';
        });
        $('#' + id).html(list_val);
        return;
    }
}
//task_id=28820
function generateSelect_lists(id, list) {
    if (id == 'types' || id == 'ages' || id == 'specialtiesconditions') {
        $("#" + id + "_li").closest('ul.unstyled').show();
        var list_val = '';
        $.each(list, function(i, v) {
            list_val += '<li ><a  href="javascript:void(0)" data-name=' + id + ' class="' + id + v.id + '">' + v.name + '</a></li>';
        });
        $('#' + id).html('  ' + list_val.substring(0, list_val.length - 2));
        var realWidth = $("#" + id + "_li").outerWidth();
        var parentWidth = $("aside").width();
        // console.log(realWidth);
        // console.log(parentWidth);
        $("#" + id + "_li").css({
            width: parentWidth + "px",
            overflow: "hidden"
        });
        /*
        if( realWidth <= parentWidth ){
            $('.showmore-'+id).find('.cplus').hide();
        }
        */
        //task_id=30600
        //$("#"+id+"_li").closest('.unstyled').hide();
        return;
    }
    if (list) {
        //task_id=29177
        if (typeof list !== 'undefined' && list.length > 0) {
            $('#' + id).empty();
            $.each(list, function(i, v) {
                $('#' + id).append('<li><a href="javascript:void(0)" data-name=' + id + ' class="' + id + v.id + '">' + v.name + '</a></li>');
            });
        }
    }
}
//task_id=29285
function generateValue_text(id, list) {
    if (list.length > 0) {
        var cities_val = '';
        $.each(list, function(i, v) {
            cities_val += v;
            if (i + 1 < list.length) cities_val += ', ';
        });
        $('#' + id).html(cities_val);
    } else {
        if ($('#' + id).length > 0) {
            //$('#'+id).parent.hide();
        }
    }
}

function generateValue_lists(id, list) {
    if (id == 'cities') {
        // list = ['EMDR', 'Therapists', 'Chica'];
        // list = ['EMDR', 'Therapists', 'Chicago IL', 'Therapists', 'Therapists'];
        var cities_val = '';
        $.each(list, function(i, v) {
            cities_val += '<li ><a  href="javascript:void(0)" data-name=' + id + ' class="' + v + '">' + v + '</a></li>';
        });
        $('#cities').html('  ' + cities_val.substring(0, cities_val.length - 2));
        var realWidth = $("#cities_li").outerWidth();
        var parentWidth = $("aside").width();
        $("#cities_li").css({
            width: parentWidth + "px",
            overflow: "hidden"
        });
        if (realWidth <= parentWidth) {
            //$('.showmore-cities').find('.cplus').hide(); // task_id=30600
        }
        return;
    }
    if (list) {
        //task_id=29177
        if (typeof list !== 'undefined' && list.length > 0) {
            $('#' + id).empty();
            $.each(list, function(i, v) {
                $('#' + id).append('<li><a href="javascript:void(0)" data-name=' + id + ' class="' + v + '">' + v + '</a></li>');
            });
        }
    }
}

function generatesituation_lists(list) {
    $("#situation_list_li").closest('ul.unstyled').show();
    var list_val = '';
    $.each(list, function(i, v) {
        list_val += '<li ><a  href="javascript:void(0)" class="situation' + v.id + '">' + v.name + '</a></li>';
    });
    $('#situation_list').html('  ' + list_val.substring(0, list_val.length - 2));
    var realWidth = $("#situation_list_li").outerWidth();
    var parentWidth = $("aside").width();
    $("#situation_list_li").css({
        width: parentWidth + "px",
        overflow: "hidden"
    });
    if (realWidth <= parentWidth) {
        //$('.showmore-situation_list').find('.cplus').hide();// task_id=30600
    }
    $("#situation_list_li").closest('.unstyled').hide();
    return;
    // alert(list.toSource());
    if (list) {
        //task_id=29177
        if (typeof list !== 'undefined' && list.length > 0) {
            $('#situation_list').empty();
            $.each(list, function(i, v) {
                $('#situation_list').append('<li><a href="javascript:void(0)" class="situation' + v.id + '">' + v.name + '</a></li>');
            });
        }
    }
    if ($('#situation_list li.hide').length == 0) {
        $('#situation_list li').each(function() {
            if ($(this).index() > 3) {
                $(this).addClass('hide');
            }
        });
        $('#showMoreSituation').text('Show More');
        $('#showMoreSituation').show();
    }
    if (!list.length || list.length <= 4) {
        $('#showMoreSituation').hide();
    }
}

function generatetraumatic_lists(list) {
    $("#traumatic_list_li").closest('ul.unstyled').show();
    var list_val = '';
    $.each(list, function(i, v) {
        list_val += '<li ><a  href="javascript:void(0)" class="traumatic' + v.id + '">' + v.name + '</a></li>';
    });
    $('#traumatic_list').html('  ' + list_val.substring(0, list_val.length - 2));
    var realWidth = $("#traumatic_list_li").outerWidth();
    var parentWidth = $("aside").width();
    $("#traumatic_list_li").css({
        width: parentWidth + "px",
        overflow: "hidden"
    });
    if (realWidth <= parentWidth) {
        //$('.showmore-traumatic_list').find('.cplus').hide(); // task_id=30600
    }
    $("#traumatic_list_li").closest('.unstyled').hide();
    return;
    // alert(list.toSource());
    if (list) {
        //task_id=29177
        if (typeof list !== 'undefined' && list.length > 0) {
            $('#traumatic_list').empty();
            $.each(list, function(i, v) {
                $('#traumatic_list').append('<li><a href="javascript:void(0)" class="traumatic' + v.id + '">' + v.name + '</a></li>');
            });
        }
    }
    if ($('#traumatic_list li.hide').length == 0) {
        $('#traumatic_list li').each(function() {
            if ($(this).index() > 3) {
                $(this).addClass('hide');
            }
        });
        $('#showMoreTraumatic').text('Show More');
        $('#showMoreTraumatic').show();
    }
    if (!list.length || list.length <= 4) {
        $('#showMoreTraumatic').hide();
    }
}

function showMoreAfflictions() {
    if ($('#affliction li.hide').length == 0) {
        $('#affliction li').each(function() {
            if ($(this).index() > 3) {
                $(this).addClass('hide');
            }
        });
        $('#showMoreAffliction').text('Show More');
    } else if ($('#affliction li').not('.hide').length == 4) {
        $('#affliction li').each(function() {
            $(this).removeClass('hide');
        });
        $('#affliction li').each(function() {
            if ($(this).index() > 13) {
                $(this).addClass('hide');
            }
        });
        $('#showMoreAffliction').text('Show More');
    } else {
        $('#affliction li').each(function() {
            $(this).removeClass('hide');
        });
        $('#showMoreAffliction').text('Show Fewer');
    }
}

function showMoreInsurances() {
    if ($('#insurance_list li.hide').length == 0) {
        $('#insurance_list li').each(function() {
            if ($(this).index() > 3) {
                $(this).addClass('hide');
            }
        });
        $('#showMoreInsurance').text('Show More');
    } else if ($('#insurance_list li').not('.hide').length == 4) {
        $('#insurance_list li').each(function() {
            $(this).removeClass('hide');
        });
        $('#insurance_list li').each(function() {
            if ($(this).index() > 13) {
                $(this).addClass('hide');
            }
        });
        $('#showMoreInsurance').text('Show More');
    } else {
        $('#insurance_list li').each(function() {
            $(this).removeClass('hide');
        });
        $('#showMoreInsurance').text('Show Fewer');
    }
}

function showMoreOthertherapys() {
    if ($('#othertherapy_list li.hide').length == 0) {
        $('#othertherapy_list li').each(function() {
            if ($(this).index() > 3) {
                $(this).addClass('hide');
            }
        });
        $('#showMoreOthertherapy').text('Show More');
    } else if ($('#othertherapy_list li').not('.hide').length == 4) {
        $('#othertherapy_list li').each(function() {
            $(this).removeClass('hide');
        });
        $('#othertherapy_list li').each(function() {
            if ($(this).index() > 13) {
                $(this).addClass('hide');
            }
        });
        $('#showMoreOthertherapy').text('Show More');
    } else {
        $('#othertherapy_list li').each(function() {
            $(this).removeClass('hide');
        });
        $('#showMoreOthertherapy').text('Show Fewer');
    }
}

function showMorePerformances() {
    if ($('#performance_list li.hide').length == 0) {
        $('#performance_list li').each(function() {
            if ($(this).index() > 3) {
                $(this).addClass('hide');
            }
        });
        $('#showMorePerformance').text('Show More');
    } else if ($('#performance_list li').not('.hide').length == 4) {
        $('#performance_list li').each(function() {
            $(this).removeClass('hide');
        });
        $('#performance_list li').each(function() {
            if ($(this).index() > 13) {
                $(this).addClass('hide');
            }
        });
        $('#showMorePerformance').text('Show More');
    } else {
        $('#performance_list li').each(function() {
            $(this).removeClass('hide');
        });
        $('#showMorePerformance').text('Show Fewer');
    }
}

function showMoreSituations() {
    if ($('#situation_list li.hide').length == 0) {
        $('#situation_list li').each(function() {
            if ($(this).index() > 3) {
                $(this).addClass('hide');
            }
        });
        $('#showMoreSituation').text('Show More');
    } else if ($('#situation_list li').not('.hide').length == 4) {
        $('#situation_list li').each(function() {
            $(this).removeClass('hide');
        });
        $('#situation_list li').each(function() {
            if ($(this).index() > 13) {
                $(this).addClass('hide');
            }
        });
        $('#showMoreSituation').text('Show More');
    } else {
        $('#situation_list li').each(function() {
            $(this).removeClass('hide');
        });
        $('#showMoreSituation').text('Show Fewer');
    }
}

function showMoreTraumatics() {
    if ($('#traumatic_list li.hide').length == 0) {
        $('#traumatic_list li').each(function() {
            if ($(this).index() > 3) {
                $(this).addClass('hide');
            }
        });
        $('#showMoreTraumatic').text('Show More');
    } else if ($('#traumatic_list li').not('.hide').length == 4) {
        $('#traumatic_list li').each(function() {
            $(this).removeClass('hide');
        });
        $('#traumatic_list li').each(function() {
            if ($(this).index() > 13) {
                $(this).addClass('hide');
            }
        });
        $('#showMoreTraumatic').text('Show More');
    } else {
        $('#traumatic_list li').each(function() {
            $(this).removeClass('hide');
        });
        $('#showMoreTraumatic').text('Show Fewer');
    }
}

function generateProfessions(list) {
    if (list) {
        //task_id=29177
        if (typeof list !== 'undefined' && list.length > 0) {
            $('#profession').empty();
            $.each(list, function(i, v) {
                $('#profession').append('<li><a href="javascript:void(0)" class="profession' + v.id + '">' + v.name + '</a></li>');
            });
        }
    }
    if ($('#profession li.hide').length == 0) {
        $('#profession li').each(function() {
            if ($(this).index() > 3) {
                $(this).addClass('hide');
            }
        });
        $('#showMoreProfession').text('Show More');
        $('#showMoreProfession').show();
    }
    if (!list.length || list.length <= 4) {
        $('#showMoreProfession').hide();
    }
}

function showMoreProfessions() {
    if ($('#profession li.hide').length == 0) {
        $('#profession li').each(function() {
            if ($(this).index() > 3) {
                $(this).addClass('hide');
            }
        });
        $('#showMoreProfession').text('Show More');
    } else if ($('#profession li').not('.hide').length == 4) {
        $('#profession li').each(function() {
            $(this).removeClass('hide');
        });
        $('#profession li').each(function() {
            if ($(this).index() > 13) {
                $(this).addClass('hide');
            }
        });
        $('#showMoreProfession').text('Show More');
    } else {
        $('#profession li').each(function() {
            $(this).removeClass('hide');
        });
        $('#showMoreProfession').text('Show Fewer');
    }
}

function generateLanguages(list) {
    $("#language_li").closest('ul.unstyled').show();
    var language_val = '';
    $.each(list, function(i, v) {
        language_val += '<li ><a  href="javascript:void(0)" class="' + v + '">' + v + '</a></li>';
    });
    $('#language').html('  ' + language_val.substring(0, language_val.length - 2));
    var realWidth = $("#language_li").outerWidth();
    var parentWidth = $("aside").width();
    $("#language_li").css({
        width: parentWidth + "px",
        overflow: "hidden"
    });
    /*if( realWidth <= parentWidth ){ // task_id=30600
        $('.showmore-language').find('.cplus').hide();
    }*/
    //$("#language_li").closest('ul.unstyled').hide(); // fix for task_id=30600
    return;
    if (list) {
        //task_id=29177
        if (typeof list !== 'undefined' && list.length > 0) {
            $('#language').empty();
            $.each(list, function(i, v) {
                $('#language').append('<li><a href="javascript:void(0)" class="' + v + '">' + v + '</a></li>');
            });
        }
    }
    if ($('#language li.hide').length == 0) {
        $('#language li').each(function() {
            if ($(this).index() > 3) {
                $(this).addClass('hide');
            }
        });
        $('#showMoreLanguage').text('Show More');
        $('#showMoreLanguage').show();
    }
    if (!list.length || list.length <= 4) {
        $('#showMoreLanguage').hide();
    }
}

function showMoreLanguages() {
    if ($('#language li.hide').length == 0) {
        $('#language li').each(function() {
            if ($(this).index() > 3) {
                $(this).addClass('hide');
            }
        });
        $('#showMoreLanguage').text('Show More');
    } else if ($('#language li').not('.hide').length == 4) {
        $('#language li').each(function() {
            $(this).removeClass('hide');
        });
        $('#language li').each(function() {
            if ($(this).index() > 13) {
                $(this).addClass('hide');
            }
        });
        $('#showMoreLanguage').text('Show More');
    } else {
        $('#language li').each(function() {
            $(this).removeClass('hide');
        });
        $('#showMoreLanguage').text('Show Fewer');
    }
}

function submitSearch() {
    var search_query = $.trim($('#search_query').val());
    $('#search_query').val(search_query);
    if($('#search_query').val() != '') {
        document.frm_search.submit();
    } else {
        var current_location = window.location.href;
        if(current_location.indexOf('emdr-training') > -1) {
            window.location = '/find-emdr-consultants/';
        } else {
            window.location = '/find-emdr-therapists/';
        }
    }
}