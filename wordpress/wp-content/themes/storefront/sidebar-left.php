<?php
/**
 * The sidebar containing the main widget area.
 *
 * @package storefront
 */

if ( ! is_active_sidebar( 'sidebar-1' ) ) {
    return;
}
?>

<div id="sidebar-left" class="sidebar-left" style="width: 28% !important;float: left !important;">
    <?php if ( function_exists('dynamic_sidebar') ) dynamic_sidebar('sidebar-left');?>
</div>