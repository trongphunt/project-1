<?php wp_reset_query() ?>

    <?php 
    if (!is_ft()) get_template_part('templates/snippet', 'get_listed');
    ?>

    <footer id="footer" role="contentinfo">
      <div class="container">
        <div class="row">

          <div class="col-12">

            <a href="#" class="brand col-sm-3"><span class="text-hide logo"><?php bloginfo('name'); ?> | <?php bloginfo('description'); ?></span></a>

            <nav role="navigation">
              <?php 
              $ft_menu = (is_ft() ? 'For Therapists' : 'Footer Menu (Left)');
              wp_nav_menu(array(
                'container' => '',
                'menu' => __($ft_menu, 'emdrtheme'),
                'menu_class' => 'col-sm-2 footer-links clearfix',
                'theme_location' => 'footer-links',
                'before' => '',
                'after' => '',
                'link_before' => '',
                'link_after' => '',
                'depth' => 1,
              ));
              ?>
              <?php 
              if (!is_ft()) {
                wp_nav_menu(array(
                  'container' => '',
                  'menu' => __('Footer Menu (Right)', 'emdrtheme'),
                  'menu_class' => 'col-sm-3 footer-links clearfix',
                  'theme_location' => 'footer-links',
                  'before' => '',
                  'after' => '',
                  'link_before' => '',
                  'link_after' => '',
                  'depth' => 1,
                ));
              }
              ?>
            </nav>
            <div class="col-sm-4 pull-right">
              <div class="social-btns pull-right hidden-sm">
                <a target="_blank" href="http://twitter.com/<?php echo $im_social['twitter'] ?>" class="pull-left"><span class="icn-twitter text-hide">On Twitter</span></a>
                <a target="_blank" href="http://facebook.com/<?php echo $im_social['facebook'] ?>" class="pull-left"><span class="icn-facebook text-hide">On Facebook</span></a>
                <!-- <a target="_blank" href="<?php echo $im_social['google_plus'] ?>" class="pull-left"><span class="icn-google text-hide">On Google+</span></a> -->
                <a href="<?php echo get_permalink(69) ?>" class="pull-left"><span class="icn-blog text-hide">EMDR Blog</span></a>
              </div>
            </div>
            <a class="innercourage">Powered By Inner Courage &reg;<br>Inner Courage is a Registered Trademark</a>
          </div><!-- .col-12 -->
        </div>
      </div>
    </footer> <!-- #footer -->
    
    <div class="gradientbar"></div>
    
</div><!-- #footer -->
<script> 
function check_login(){
    $.ajax({
        type: 'POST',
        url: '/profilebuilder/commands/auth.php',
        data: "username=" + $('#inputUsername').val() + "&password=" +  encodeURIComponent($('#inputPassword').val()),
        success: function(response){
          console.log(response);
            if(response === 'success'){
                var previous_url = $.cookie('previous_url');
                $.cookie('previous_url', '', {expires: -1, path: '/'});
                if(previous_url != undefined && previous_url){
                    window.location.href = previous_url;
                } else {
                    window.location = "/profilebuilder/"
                }

            }
            else{
               $("#loginerror").remove();
               $("#Loginbtn").before("<div id='loginerror' style='color: red;margin-bottom: 10px;'>"+response+"</div>");
            }
        }
    }); 
}
function clickReset(){
$('#loginModal').modal('hide');
}

$( document ).ready(function() {
$("#Loginbtn").click(function(){
  check_login();
});
 

$("#ResetPassword").click(function(){
	$('#loginModal').modal('hide');
	$.ajax({
        type: 'GET',
        url: '/profilebuilder/forgotpassword.php',
        data: "email=" + $('#inputEmail').val() ,
        success: function(response){
          console.log(response);
            if(response.indexOf('forgotpassword.php') > 0){
            	$("#ResetPassword").before("<div id='loginerror' style='color: red;margin-bottom: 10px;'>Email was wrong or invalid</div>");
                   
            }
            else{
               window.location = "/profilebuilder/" ;
               
            }
        }
    }); 

	  
	});

});

</script>

<div class="modal fade" id="resetModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body">
      <!-- <div class="modal-header"> -->
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title text-center h1">Reset Password</h4><br>
      
          <div class="form-group">
            <label class="sr-only" for="inputEmail">Enter Your Email address</label>
            <input type="text" class="form-control" id="inputEmail" name="email" placeholder="Email">
          </div>
           
          <button id="ResetPassword" type="submit" class="btn btn-secondary btn-block">Reset My Password</button>
          
      
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<div class="modal fade" id="loginModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body">
      <!-- <div class="modal-header"> -->
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title text-center h1">Log In</h4><br>
      <!-- </div> -->
      <!-- <div class="modal-body"> -->
          <div class="form-group">
            <label class="sr-only" for="inputEmail">Email address</label>
            <input type="text" class="form-control" id="inputUsername" name="userName" placeholder="Email">
          </div>
          <div class="form-group">
            <label class="sr-only" for="inputPassword">Password</label>
            <input type="password" class="form-control" id="inputPassword" name="password" placeholder="Password">
          </div>
          <button id="Loginbtn" type="submit" class="btn btn-secondary btn-block">Log In</button>
          <div class="clearfix">
            <a href="/profilebuilder/_wf-p1.php" class="pull-left">Create Account</a>
            <a data-toggle="modal" onclick="clickReset()" href="#resetModal" class="pull-right">Forgot?</a>
          </div>
      <!-- </div> -->
      <!-- <div class="modal-footer"> -->
      <!-- </div> -->
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<div class="modal fade" id="favoritesModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <!-- <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> -->
        <h4 class="modal-title"></h4>
      </div>
      <div class="modal-body">
        <ul></ul>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default add-favorites">Close</button>
        <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<div class="modal fade" id="favoriteModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body">
        <p></p>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<div class="modal fade" id="emailModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title">Email to <span class="contact-name">Carol Hamilton, Psy.D</span></h4>
      </div>
      <div class="modal-body">
        <div id="sendmail_result"></div>
        <form name="frm-sendemail" mathod="post">
          <input type="hidden" name="terapist_name" />
          <input type="hidden" name="terapist_url" />
          <table>
			<tbody>
			<tr>
			    <td id="nameTD">
			        Your Name<span class="required">*</span>:&nbsp;
			    </td>
			    <td>
			        <input name="contact_name" type="text" maxlength="255" size="30" value="" />
			    </td>
			</tr>
			<tr>
			    <td id="mail1TD">
			        Your Email<span class="required">*</span>:&nbsp;
			    </td>
			    <td>
			        <input name="contact_mail1" type="text" maxlength="255" size="30" value="" />
			    </td>
			</tr>
			<tr>
			    <td id="mail2TD">
			        Re-enter Email<span class="required">*</span>:&nbsp;
			    </td>
			    <td>
			        <input name="contact_mail2" type="text" maxlength="255" size="30" value="" />
			    </td>
			</tr>
			<tr>
			    <td id="phoneTD">
			        Your Phone:&nbsp;
			    </td>
			    <td>
			        <input name="contact_phone" type="text" maxlength="255" size="30" value="" />
			    </td>
			</tr>
			<tr>
			    <td id="messageTD" style="vertical-align: top;">
			       Message<span class="required">*</span>:<br /><span>(200 word Max)</span>
			    </td>
			    <td>
			        <textarea name="message" cols="30" rows="6"></textarea>
			    </td>
			</tr>
			<tr>
			    <td id="captchaTextId" colspan="2">
			        To confirm, please enter the letters and numbers you see in the image below and click submit.<span class="required">*</span>
			    </td>
			</tr>
			<tr>
			    <td id="td-captchaimg">                                
			    	<img src="" id='captchaimg'/>
			    </td>
			    <td style="vertical-align: top;">
                    <input id="security_code" size="20" name="security_code" type="text" value="" />
                </td>
			</tr>
			</tbody>
			</table>
        </form>
      </div>
      <div class="modal-footer">
        <img id="loader" style="display: none; vertical-align: middle;" src="<?php bloginfo('template_directory'); ?>/assets/img/loader.gif" width="16" height="16" alt="Loading the EMDR Therapist Network" title="loading" />
        <button type="button" data-dismiss="modal" class="btn btn-default">Close</button>
        <button type="button" class="btn btn-primary btn-sendemail">Send email</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

  <?php include ('templates/snap_drawer.php'); ?>

    <?php wp_footer(); ?>

  <script>
  // ShareThis
  var switchTo5x=true;
  (function() {
  var stscr = document.createElement('script'); stscr.type = 'text/javascript'; stscr.async = true;
    stscr.src ="http://w.sharethis.com/button/buttons.js";
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(stscr, s);
  stscr.onload=stCB;
  stscr.onreadystatechange=function(){if(stscr.readyState=='loaded'){stCB();}};})();
  function stCB(){
    stLight.options({
        publisher:'77146cf4-719e-4508-890a-5f453d4a14d8'
      });
}
  $(document).ready(function() {
      $('.tooltip').tooltipster({ theme: 'tooltipster-light', debug:false });
  });
	    
</script>

  </body>

</html> <!-- end page. what a ride! -->
