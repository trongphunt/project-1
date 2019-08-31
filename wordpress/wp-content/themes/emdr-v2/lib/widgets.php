<?php
/**
 * Register sidebars and widgets
 */
function roots_widgets_init() {
  // Sidebars
  register_sidebar(array(
    'name'          => __('Page Sidebar', 'roots'),
    'id'            => 'sidebar-primary',
    'before_widget' => '<section class="widget %1$s %2$s"><div class="widget-inner">',
    'before_title'  => '<header class="section-divider"><h3>',
    'after_title'   => '</h3></header>',
    'after_widget'  => '</div></section>',
  ));

  register_sidebar(array(
    'name'          => __('Blog Sidebar', 'roots'),
    'id'            => 'sidebar-blog',
    'before_widget' => '<section class="widget %1$s %2$s"><div class="widget-inner">',
    'before_title'  => '<header class="section-divider"><h3>',
    'after_title'   => '</h3></header>',
    'after_widget'  => '</div></section>',
  ));

  register_sidebar(array(
    'name'          => __('For Therapists Sidebar', 'roots'),
    'id'            => 'sidebar-therapists',
    'before_widget' => '<section class="widget %1$s %2$s"><div class="widget-inner">',
    'before_title'  => '<header class="section-divider"><h3>',
    'after_title'   => '</h3></header>',
    'after_widget'  => '</div></section>'
  ));

  // register_sidebar(array(
  //   'name'          => __('Footer', 'roots'),
  //   'id'            => 'sidebar-footer',
  //   'before_widget' => '<section class="widget %1$s %2$s"><div class="widget-inner">',
  //   'after_widget'  => '</div></section>',
  //   'before_title'  => '<h3>',
  //   'after_title'   => '</h3>',
  // ));

  // Widgets
  register_widget('Roots_Vcard_Widget');
}
add_action('widgets_init', 'roots_widgets_init');

/**
 * Example vCard widget
 */
class Roots_Vcard_Widget extends WP_Widget {
  private $fields = array(
    'title'          => 'Title (optional)',
    'street_address' => 'Street Address',
    'locality'       => 'City/Locality',
    'region'         => 'State/Region',
    'postal_code'    => 'Zipcode/Postal Code',
    'tel'            => 'Telephone',
    'email'          => 'Email'
  );

  function __construct() {
    $widget_ops = array('classname' => 'widget_roots_vcard', 'description' => __('Use this widget to add a vCard', 'roots'));

    $this->WP_Widget('widget_roots_vcard', __('Roots: vCard', 'roots'), $widget_ops);
    $this->alt_option_name = 'widget_roots_vcard';

    add_action('save_post', array(&$this, 'flush_widget_cache'));
    add_action('deleted_post', array(&$this, 'flush_widget_cache'));
    add_action('switch_theme', array(&$this, 'flush_widget_cache'));
  }

  function widget($args, $instance) {
    $cache = wp_cache_get('widget_roots_vcard', 'widget');

    if (!is_array($cache)) {
      $cache = array();
    }

    if (!isset($args['widget_id'])) {
      $args['widget_id'] = null;
    }

    if (isset($cache[$args['widget_id']])) {
      echo $cache[$args['widget_id']];
      return;
    }

    ob_start();
    extract($args, EXTR_SKIP);

    $title = apply_filters('widget_title', empty($instance['title']) ? __('vCard', 'roots') : $instance['title'], $instance, $this->id_base);

    foreach($this->fields as $name => $label) {
      if (!isset($instance[$name])) { $instance[$name] = ''; }
    }

    echo $before_widget;

    if ($title) {
      echo $before_title, $title, $after_title;
    }
  ?>
    <p class="vcard">
      <a class="fn org url" href="<?php echo home_url('/'); ?>"><?php bloginfo('name'); ?></a><br>
      <span class="adr">
        <span class="street-address"><?php echo $instance['street_address']; ?></span><br>
        <span class="locality"><?php echo $instance['locality']; ?></span>,
        <span class="region"><?php echo $instance['region']; ?></span>
        <span class="postal-code"><?php echo $instance['postal_code']; ?></span><br>
      </span>
      <span class="tel"><span class="value"><?php echo $instance['tel']; ?></span></span><br>
      <a class="email" href="mailto:<?php echo $instance['email']; ?>"><?php echo $instance['email']; ?></a>
    </p>
  <?php
    echo $after_widget;

    $cache[$args['widget_id']] = ob_get_flush();
    wp_cache_set('widget_roots_vcard', $cache, 'widget');
  }

  function update($new_instance, $old_instance) {
    $instance = array_map('strip_tags', $new_instance);

    $this->flush_widget_cache();

    $alloptions = wp_cache_get('alloptions', 'options');

    if (isset($alloptions['widget_roots_vcard'])) {
      delete_option('widget_roots_vcard');
    }

    return $instance;
  }

  function flush_widget_cache() {
    wp_cache_delete('widget_roots_vcard', 'widget');
  }

  function form($instance) {
    foreach($this->fields as $name => $label) {
      ${$name} = isset($instance[$name]) ? esc_attr($instance[$name]) : '';
    ?>
    <p>
      <label for="<?php echo esc_attr($this->get_field_id($name)); ?>"><?php _e("{$label}:", 'roots'); ?></label>
      <input class="widefat" id="<?php echo esc_attr($this->get_field_id($name)); ?>" name="<?php echo esc_attr($this->get_field_name($name)); ?>" type="text" value="<?php echo ${$name}; ?>">
    </p>
    <?php
    }
  }
}

function wp_related_posts($postid) {
  $tags = wp_get_post_tags($postid);
  if ($tags) {
    $tag_ids = array();
    foreach($tags as $individual_tag) $tag_ids[] = $individual_tag->term_id;
  
    $args=array(
      'tag__in' => $tag_ids,
      'post__not_in' => array($post->ID),
      'showposts'=>5, // Number of related posts that will be shown.
      'caller_get_posts'=>1
    );
    $related_post = new wp_query($args);
    if( $related_post->have_posts() ) {
      while ($related_post->have_posts()) {
        $related_post->the_post();
      ?>
        <li><a href="<?php the_permalink() ?>" rel="bookmark" title="Permanent Link to <?php the_title_attribute(); ?>"><?php the_title(); ?></a></li>
      <?php
      }
    }
  }
}

function wp_popular_posts() {
  global $wpdb;
  
  $result = $wpdb->get_results("SELECT comment_count,ID,post_title FROM $wpdb->posts ORDER BY comment_count DESC LIMIT 0 , 3");
  foreach ($result as $post) {
    setup_postdata($post);
    $postid = $post->ID;
    $title = $post->post_title;
    $commentcount = $post->comment_count;
    if ($commentcount != 0) {
    ?>
      <div class="popularbox clearfix">
        <div class="popular-meta left">
          <p class="ptitle"><a href="<?php echo get_permalink($postid); ?>" title="Permalink to this <?php echo $title; ?>"><?php echo $title; ?></a></p>
          <span class="ptime"><?php the_time('d F Y'); ?></span>
        </div>
      </div>
    <?php
    }
  }
}