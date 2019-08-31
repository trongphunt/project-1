<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Capisco_Fitout_Seating
 */

?>

	</div><!-- #content -->

	<footer id="colophon" class="site-footer" role="contentinfo">
		<div class="footer">
		<div class="container">
		<div class="footer-left">
			 <?php dynamic_sidebar('footer-1'); ?> 
			<p class="certificate"><?php echo get_option('capisco_certificate');?></p>
		</div><div class="footer-right">
		    <?php $contact = get_option('capisco_contact'); ?>
			<h2>Contact</h2>
			<p class="contact"><a href="tel:<?php echo $contact;?>"><span><?php echo $contact;?></span></a> Australia-wide</p>
			<?php $email = get_option('capisco_email'); ?>
			<p class="email"><a href="mailto:<?php echo $email;?>"><span><?php echo $email;?></span></a></p>
			<div class="social-icon">
				<a href="<?php echo get_option('capisco_linkedin') ?>" target="_blank"><img src="<?php echo get_option('capisco_linkedinlogo') ?>"></a>
				<a href="<?php echo get_option('capisco_fb') ?>" target="_blank"><img src="<?php echo get_option('capisco_facebooklogo') ?>"></a>
				<a href="<?php echo get_option('capisco_insta') ?>" target="_blank"><img src="<?php echo get_option('capisco_instagramlogo') ?>"></a>
			</div>
		</div>
	</div>
		</div>
		
	</footer><!-- #colophon -->
  <div id="inquirybtn">
   <a href="/contact/" class="show_block wpi-button" id="inquiry">Make an Enquiry</a>
</div>
</div><!-- #page -->

<?php wp_footer(); ?>
<script>
jQuery(document).ready(function () {
   var holdWidth = jQuery(window).width();
   var holdHeight = jQuery(window).height();
   var holdAverageSize = (holdWidth + holdHeight) / 2;
   jQuery(window).on('resize', function () {
       newAverageSize = (jQuery(window).width() + jQuery(window).height()) / 2;
       newPercentage = ((newAverageSize / holdAverageSize) * 100) + "%";
       jQuery("html").css("font-size", newPercentage)
       console.log(newPercentage);
   });
});

jQuery('.main-navigation ul ul li span:contains(Chair Type)').parent().parent().hide();
jQuery('.product-tabs ul li span:contains(Chair Type)').parent().parent().hide();
jQuery('#responsive-menu .responsive-menu-submenu li a span:contains(Chair Type)').parent().parent().hide();
jQuery(".wocommerce #wpp-buttons a").attr('target', '_blank');
var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
    var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
    var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
    var is_safari = navigator.userAgent.indexOf("Safari") > -1;
    var is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;
    if ((is_chrome)&&(is_safari)) {is_safari=false;}
    if ((is_chrome)&&(is_opera)) {is_chrome=false;}
   if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
   
    jQuery("body").addClass("safari")
   }

jQuery(window).scroll(function(){

      if (jQuery(this).scrollTop() > 50) {
		 jQuery('#inquirybtn').addClass('fixed');
          jQuery('#enquiryblk').addClass('fixed');	
           jQuery('.footer').addClass('stickyfooter');
          jQuery('.product-template-default .footer').addClass('stickyfooter');
         
}
else
{ jQuery('#inquirybtn').removeClass('fixed');
	 jQuery('#enquiryblk').removeClass('fixed');
          jQuery('.footer').removeClass('stickyfooter');
	 jQuery('.product-template-default .footer').removeClass('stickyfooter');
         
}
});
jQuery(document).ready(function(){


        jQuery(".show_block").click(function() {
            var parent_id = jQuery(this).parents().find('h1').html();
             jQuery(".enquiry_form .wpcf7-textarea").val(parent_id);     
        });

        jQuery('.show_block').click(function(){
          //  jQuery('.enquiry_block').css('display','block');
         //   jQuery('.woocustom, .downloadbtn, #enquiryblk').css('display','none');
        });

        jQuery('.back_block').click(function(){
            jQuery('.enquiry_block').css('display','none');
            jQuery('.woocustom, .downloadbtn, #enquiryblk').css('display','block');
 

        });
     jQuery("#responsive-menu-container #responsive-menu li.responsive-menu-item a span:contains(Make An Enquiry)").parent().css("display","none");
       jQuery(".navigation #primary-menu li a span:contains(Make An Enquiry)").closest('li').addClass( "makebtn" );
    });
</script>
</body>
</html>
