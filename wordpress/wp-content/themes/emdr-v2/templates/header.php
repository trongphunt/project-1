<button type="button" class="navbar-toggle">
  <span class="icon-bar"></span>
  <span class="icon-bar"></span>
  <span class="icon-bar"></span>
</button>
<a href="#" class="filter-toggle visible-sm"></a>
<a class="navbar-brand" href="<?php echo home_url(); ?>"><span class="logo text-hide"><?php bloginfo('name'); ?></span><img class="crane" src="<?php bloginfo('template_directory'); ?>/assets/img/gfx-crane.png" alt=""></a>
<div class="nav-collapse collapse">
  <ul class="nav navbar-nav">
    <?php
      if (has_nav_menu('primary_navigation')) :
        wp_nav_menu(array(
            'theme_location' => 'primary_navigation', 
            'menu_class'    => 'nav',
            'items_wrap'    => '%3$s'
        ));
      endif;
    ?>
  </ul>
</div><!--/.nav-collapse -->

<div id="utility-nav" class="hidden-sm smHide">

  <div class="form-inline">

    <div id="utility-search">
      <?php get_search_form(); ?>
    </div>

    <!-- <div class="btn-group">
      <button type="button" class="btn btn-primary btn-small dropdown-toggle" data-toggle="dropdown">A<small>A</small></button>
      <ul class="dropdown-menu">
        <li><a href="#">Action</a></li>
        <li><a href="#">Another action</a></li>
        <li><a href="#">Something else here</a></li>
      </ul>
    </div> --><!-- /btn-group -->

    <?php 
     $http_cookie = isset($_SERVER['HTTP_COOKIE'])?$_SERVER['HTTP_COOKIE']:array();
     $cookies     = explode(';', $http_cookie);
     $result = false;
     foreach($cookies as $key=>$ck){
       $pos = strpos($ck,"emdr.favorites.list=");
       if($pos !== false){
          $ch_str = trim(str_replace("emdr.favorites.list=", "", $ck)) ;
          if($ch_str){
              $result = true;
          }
       }
     }
    ?>

    <a href="javascript:void(0);" class="btn btn-xsmall btn-primary all-favorites" ><span class="text-hide<?php if($result) { ?>  btn_favorite_result <?php }?>">Your Favorites</span></a>
  
    
<style>
@media screen and (max-width: 768px) {
.smHide {

    display: none!important;
}
}


</style>
    <div class="dropdown-wrap smHide">
      <div class="btn-group">

        <a href="<?php echo get_permalink( 57 ); ?>" class="btn btn-secondary btn-xsmall">For Therapists</a>

        <button type="button" class="btn btn-secondary btn-xsmall dropdown-toggle" data-toggle="dropdown">
          <span class="caret"></span>
        </button>

        <ul class="therapist-menu dropdown-menu">
          <?php
          if (has_nav_menu('for_therapists')) :
            wp_nav_menu(array(
                'theme_location' => 'for_therapists', 
                'items_wrap'    => '%3$s'
            ));
          endif;
        ?>
        </ul>
      </div><!-- /btn-group -->      
    </div>
    
    
	<?php
	if(isset($_COOKIE['id'])) {
		echo '<a href="#" class="btn btn-secondary btn-xsmall" onclick="logOutForm2();">Therapist Logout</a>';
	} else {
		echo '<a data-toggle="modal" href="#loginModal" class="btn btn-xsmall btn-therapist smHide">Therapist Login</a>';
	}
	?>
  </div>

</div>

<script language="javascript" type="text/javascript">
	function logOutForm2() {
        $.cookie('id', '', {expires: -1, path: '/'});
        $.cookie('auth_session', '', {expires: -1, path: '/'});

        window.location = '<?php print site_url()?>';
    }
	<?php if(isset($_GET['state']) && $_GET['state']=='login'){ ?>
			$(document).ready(function() {
                <?php $email = isset($_GET['email']) ? $_GET['email'] : ''; ?>
                <?php if($email){ ?>
                    $('#inputUsername').val('<?php echo $email ?>');
                <?php } ?>
                jQuery(".btn-therapist").click();
            });
    <?php } ?>
	
</script>