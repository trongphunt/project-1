<?php
/**
 * Utility functions
 */
function add_filters($tags, $function) {
  foreach($tags as $tag) {
    add_filter($tag, $function);
  }
}

function is_element_empty($element) {
  $element = trim($element);
  return empty($element) ? false : true;
}

function is_ft() {
  global $post;
  if(is_page()&&($post->post_parent==57||is_page(57))) 
               return true;   // we're at the page or at a sub page
  else 
               return false;  // we're elsewhere
};