<?php
/**
 * Enqueue scripts and stylesheets
 *
 * Enqueue stylesheets in the following order:
 * 1. /theme/assets/css/bootstrap.css
 * 2. /theme/assets/css/bootstrap-responsive.css
 * 3. /theme/assets/css/app.css
 *
 * Enqueue scripts in the following order:
 * 1. jquery-1.10.1.min.js via Google CDN
 * 2. /theme/assets/js/vendor/modernizr-2.6.2.min.js
 * 3. /theme/assets/js/plugins.js (in footer)
 * 4. /theme/assets/js/main.js    (in footer)
 */
function roots_scripts() {
  // wp_enqueue_style('main-style', get_template_directory_uri() . '/assets/css/style.css', false, null);
  wp_enqueue_style('site-style', get_template_directory_uri() . '/assets/dist/css/site.css', false, null);

  // jQuery is loaded using the same method from HTML5 Boilerplate:
  // Grab Google CDN's latest jQuery with a protocol relative URL; fallback to local if offline
  // It's kept in the header instead of footer to avoid conflicts with plugins.
  if (!is_admin() && current_theme_supports('jquery-cdn')) {
    wp_deregister_script('jquery');
    wp_register_script('jquery', '//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js', false, null, false);
    add_filter('script_loader_src', 'roots_jquery_local_fallback', 10, 2);
  }

  // if (is_single() && comments_open() && get_option('thread_comments')) {
  //   wp_enqueue_script('comment-reply');
  // }

  wp_register_script('modernizr', get_template_directory_uri() . '/assets/js/vendor/modernizr.custom.min.js', false, null, false);
  wp_register_script('roots_plugins', get_template_directory_uri() . '/assets/js/plugins.js', false, null, true);
  wp_register_script('roots_main', get_template_directory_uri() . '/assets/js/main.js', false, null, true);
  wp_register_script('app', get_template_directory_uri() . '/assets/dist/js/app.js', false, null, true);
  wp_enqueue_script('jquery');
  wp_enqueue_script('modernizr'); 
  // wp_enqueue_script('roots_plugins');
  wp_enqueue_script('app');
  wp_enqueue_script('roots_main');
}
add_action('wp_enqueue_scripts', 'roots_scripts', 100);

// http://wordpress.stackexchange.com/a/12450
function roots_jquery_local_fallback($src, $handle) {
  static $add_jquery_fallback = false;

  if ($add_jquery_fallback) {
    echo '<script>window.jQuery || document.write(\'<script src="' . get_template_directory_uri() . '/assets/js/vendor/jquery-1.10.1.min.js"><\/script>\')</script>' . "\n";
    $add_jquery_fallback = false;
  }

  if ($handle === 'jquery') {
    $add_jquery_fallback = true;
  }

  return $src;
}
