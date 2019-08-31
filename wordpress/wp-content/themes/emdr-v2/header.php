<!doctype html>

<!--[if lt IE 7]>
<html <?php language_attributes(); ?> class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if (IE 7)&!(IEMobile)]>
<html <?php language_attributes(); ?> class="no-js lt-ie9 lt-ie8"><![endif]-->
<!--[if (IE 8)&!(IEMobile)]>
<html <?php language_attributes(); ?> class="no-js lt-ie9"><![endif]-->
<!--[if gt IE 8]><!-->
<html <?php language_attributes(); ?> class="no-js"><!--<![endif]-->

<head>
    <meta charset="utf-8">

    <!-- Google Chrome Frame for IE -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

    <title><?php wp_title(''); ?></title>

    <!-- mobile meta (hooray!) -->
    <meta name="HandheldFriendly" content="True">
    <meta name="MobileOptimized" content="320">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

    <link rel="icon" href="<?php echo get_template_directory_uri(); ?>/favicon.png">
    <!--[if IE]>
    <link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/favicon.ico">
    <![endif]-->

    <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">

    <?php wp_head(); ?>
    <link rel="stylesheet" type="text/css" href="<?php bloginfo('template_directory'); ?>/assets/tooltipster/dist/css/tooltipster.bundle.min.css" />
 
    <!-- <link href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,400,600,300' rel='stylesheet' type='text/css'> -->
    <script type="text/javascript" src="//use.typekit.net/tls7zeo.js"></script>
    <script type="text/javascript">try {
            Typekit.load();
        } catch (e) {
        }</script>

    <script>if (typeof window.JSON === 'undefined') {
            document.write('<script type="text/javascript" src="<?php bloginfo('template_directory'); ?>/assets/js/json2.js"><\/script>');
        }</script>
    <script type="text/javascript" src="<?php bloginfo('template_directory'); ?>/assets/js/jquery.history.js"></script>
    <script type="text/javascript" src="<?php bloginfo('template_directory'); ?>/assets/js/jquery.cookie.js"></script>
 
    <script type="text/javascript" src="<?php bloginfo('template_directory'); ?>/assets/tooltipster/dist/js/tooltipster.bundle.min.js"></script>

    <script type="text/javascript" src="<?php bloginfo('template_directory'); ?>/assets/js/common.js"></script>
    <script type="text/javascript" src="<?php bloginfo('template_directory'); ?>/assets/js/jquery.confirm.js"></script>

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="<?php bloginfo('template_directory'); ?>/assets/js/vendor/respond.min.js"></script>
    <![endif]-->
    <style>
        .pac-container.pac-logo:last-of-type {
            box-shadow: none !important;
        }
        .pac-container.pac-logo:last-of-type:after {
            content: none !important;
        }
        .pac-container{min-width: 300px !important;}
    </style>
</head>

<?php $therapist_template = (is_ft() ? 'ft' : '') ?>

<body <?php body_class($therapist_template); ?>>

<?php if (is_ft()) { ?>
    <div id="emdrtn-back"><a href="/">&larr; Back to EMDR Therapist Network</a></div>
<?php } ?>

<div id="content" class="snap-content">
    <div class="gradientbar"></div>
    <div id="masthead" class="navbar">
        <div class="container">

            <?php
            if (!is_ft()) {
                get_template_part('templates/header');
            } else {
                get_template_part('templates/header-for-therapists');
            }
            ?>

        </div>
    </div>