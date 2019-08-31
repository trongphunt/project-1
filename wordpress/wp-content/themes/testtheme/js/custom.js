$(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() != 0) {
                $('#bttop').fadeIn();
            } else {
                $('#bttop').fadeOut();
            }
        });
        $('#bttop').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 800);
        });
    });


window.fbAsyncInit = function() {
        FB.init({
            appId: '1955039784517774',
            autoLogAppEvents: true,
            xfbml: true,
            version: 'v2.11'
        });
    };
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/vi_VN/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));