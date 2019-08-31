<form role="search" method="get" class="search-form input-group" action="<?php echo home_url('/'); ?>">
  <input type="search" value="<?php if (is_search()) { echo get_search_query(); } ?>" name="s" class="search-field form-control" placeholder="<?php _e('Search EMDR Content', 'roots'); ?>" id="search_content">
  <label class="hide"><?php _e('Search for:', 'roots'); ?></label>
  <span class="input-group-btn">
    <button type="submit" class="search-submit btn btn-primary btn-small"><span class="text-hide"><?php _e('Search', 'roots'); ?></span></button>
  </span>
</form>