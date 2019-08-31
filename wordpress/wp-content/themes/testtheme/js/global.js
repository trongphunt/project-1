// Common
function gotoUrl(str) {
    window.location.href = str;
}

function moneyFormat(n) {
    var t = n == null ? "0" : n.toString();
    return t.replace(/\d(?=(?:\d{3})+(?!\d))/g, "$&,")
}
// End common
if ($(window).width() > 1200) {
    $("a.dropdown-toggle").click(function() {
        location.href = $(this).attr('href');
    });
}
$(document).ready(function() {
    $('.owl-camketdichvu').owlCarousel({
        loop: true,
        margin: 30,
        responsiveClass: true,
        dots: true,
        responsive: {
            0: {
                items: 1,
                dots: true,

            },
            600: {
                items: 3,
                dots: true,
            },
            1000: {
                items: 4,
                dots: true,

            },
            1900: {
                items: 4,
                dots: true,
            }
        }
    })
});
$(document).ready(function() {
    var doitac = $("#owl-doitac");
    if (doitac.length > 0) {
        doitac.owlCarousel({
            items: 5, //10 items above 1000px browser width
            itemsDesktop: [1000, 3], //5 items between 1000px and 901px
            itemsDesktopSmall: [900, 2], // 3 items betweem 900px and 601px
            itemsTablet: [600, 2], //2 items between 600 and 0;
            itemsMobile: [400, 1], // itemsMobile disabled - inherit from itemsTablet option
        });
    }
});
//
function RegisterEmail() {
    rg_name = $("#rg_name").val();
    rg_email = $("#rg_email").val();
    $.ajax({
        type: "POST",
        url: vncms_url + "/?mod=home&act=saveMail",
        dataType: "text",
        data: { rg_name: rg_name, rg_email: rg_email }
    }).done(function(key) {
        if (key == 1) {
            var tag_img = "<img src=" + URL_IMAGES + "/success-icon-10.png \" style='width:100px;'/><br>";
            $('#result_okok').html(tag_img + "Ã„ÂÄ‚Â£ gÃ¡Â»Â­i thÄ‚Â´ng tin thÄ‚ nh cÄ‚Â´ng<br>Xin quÄ‚Â½ khÄ‚Â¡ch vui lÄ‚Â²ng Ã„â€˜Ã¡Â»Â£i trong Ä‚Â­t phÄ‚Âºt, chÄ‚Âºng tÄ‚Â´i sÃ¡ÂºÂ½ liÄ‚Âªn hÃ¡Â»â€¡ lÃ¡ÂºÂ¡i ngay.");
        } else {
            $('#result_okok p').html("BÃ¡ÂºÂ¡n vui lÄ‚Â²ng nhÃ¡ÂºÂ­p Ã„â€˜Ã¡ÂºÂ§y Ã„â€˜Ã¡Â»Â§ vÄ‚  chÄ‚Â­nh xÄ‚Â¡c thÄ‚Â´ng tin, email, sÃ¡Â»â€˜ Ã„â€˜iÃ¡Â»â€¡n thoÃ¡ÂºÂ¡i !");
        }
    });
}


/*
|--------------------------------------------------------------------------
| ÄÄƒng kÃ½ nháº­n bÃ¡o giÃ¡
|--------------------------------------------------------------------------
|
| khi nháº­p Ä‘áº©y Ä‘á»§ thÃ´ng tin thÃ¬ aabbb
| 
| 
|
*/
function Dangkynhanbaogia() {
    bg_catid = $("#bg_catid").val();
    bg_name = $("#bg_name").val();
    bg_phone = $("#bg_phone").val();
    bg_email = $("#bg_email").val();
    bg_content = $("#bg_content").val();
    // alert("okokk");

    $('#dangkynhanbaogia input').focus(function() {
        $(this).removeClass('required');
    });

    if (bg_email == '') {
        $('#bg_email').addClass('required');
        return false;
    }
    if (bg_phone == '') {
        $('#bg_phone').addClass('required');
        return false;
    }
    if (bg_name == '') {
        $('#bg_name').addClass('required');
        return false;
    }
    $.ajax({
        type: "POST",
        url: vncms_url + "/?mod=home&act=registerbaogia",
        dataType: "text",
        data: { bg_catid: bg_catid, bg_name: bg_name, bg_phone: bg_phone, bg_email: bg_email, bg_content: bg_content }
    }).done(function(key) {
        if (key == 0) {
            $('#dangkynhanbaogia p').html("Vui lÃ²ng nháº­p Ä‘áº§y Ä‘á»§ vÃ  chÃ­nh xÃ¡c thÃ´ng tin !");
        } else {
            $('#dangkynhanbaogia').html(key);
        }
    });
}


$(document).ready(function() {
    var topDivcssmenu = $("#navfixed").offset().top;
    $(window).scroll(function() {
        var x_scroll = $(this).scrollTop();
        if (x_scroll > topDivcssmenu) {
            $("#navfixed").addClass("fixedToppage");
        } else {
            $("#navfixed").removeClass("fixedToppage");
        }
    });
});
$(document).ready(function() {
    $('.dropdown-submenu .ducnh').on("click", function(e) {
        e.stopPropagation();
        e.preventDefault();
        $(this).next('ul').toggle();

    });
});


$("#e-about .e-column").first().removeClass('col-sm-2').addClass("col-sm-4");
$('#e-about .e-column').hover(function() {
    $('#e-about .e-column').removeClass('col-sm-2 col-sm-4').addClass('col-sm-2');
    $(this).removeClass('col-sm-2').addClass('col-sm-4');

});


function setMenuClicked(i) {
    var options = { path: '/', expires: 1 };
    $.cookie('itemMenuclicked', i, options);
}

function getMenuClicked() {
    return $.cookie('itemMenuclicked');
}

function deletetMenuClicked() {
    var options = { path: '/', expires: 1 };
    $.cookie('menu_a_clicked', null, options);
}

function setMenuActive() {
    var i;
    i = getMenuClicked();
    if (i == 0 || i == null) i = 0;
    $("#menu_a_" + i).addClass("active");
}
$(document).ready(function() {

    setMenuActive();
});

(function($) {
    $.fn.menumaker = function(options) {
        var cssmenu = $(this),
            settings = $.extend({
                format: "dropdown",
                sticky: false
            }, options);
        return this.each(function() {
            $(this).find(".button").on('click', function() {
                $(this).toggleClass('menu-opened');
                var mainmenu = $(this).next('ul');
                if (mainmenu.hasClass('open')) {
                    mainmenu.slideToggle().removeClass('open');
                } else {
                    mainmenu.slideToggle().addClass('open');
                    if (settings.format === "dropdown") {
                        mainmenu.find('ul').show();
                    }
                }
            });
            cssmenu.find('li ul').parent().addClass('has-sub');
            multiTg = function() {
                cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
                cssmenu.find('.submenu-button').on('click', function() {
                    $(this).toggleClass('submenu-opened');
                    if ($(this).siblings('ul').hasClass('open')) {
                        $(this).siblings('ul').removeClass('open').slideToggle();
                    } else {
                        $(this).siblings('ul').addClass('open').slideToggle();
                    }
                });
            };
            if (settings.format === 'multitoggle') multiTg();
            else cssmenu.addClass('dropdown');
            if (settings.sticky === true) cssmenu.css('position', 'fixed');
            resizeFix = function() {
                var mediasize = 1000;
                if ($(window).width() > mediasize) {
                    cssmenu.find('ul').show();
                }
                if ($(window).width() <= mediasize) {
                    cssmenu.find('ul').hide().removeClass('open');
                }
            };
            resizeFix();
            return $(window).on('resize', resizeFix);
        });
    };
})(jQuery);

(function($) {
    $(document).ready(function() {
        $("#cssmenu").menumaker({
            format: "multitoggle"
        });
    });
})(jQuery);

