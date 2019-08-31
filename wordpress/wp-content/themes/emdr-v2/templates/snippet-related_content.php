<?php if ( function_exists('get_field') ) {

  $related_content = get_field('related_content');

  if($related_content) { ?>
  <div class="related-content">
    <hr>
    <h3 class="h2 primary">Whether you want help for yourself, your child or your relationship, EMDR may be able to help.</h3>
    <ul>
    <?php foreach($related_content as $link)
    {
      echo '<li><a href="' . get_permalink($link->ID) . '">'.get_the_title($link->ID) . '</a></li>';
    } ?>
    </ul>
  </div>

  <?php } ?>
<?php } ?>