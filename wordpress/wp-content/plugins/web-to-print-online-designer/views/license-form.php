<?php if (!defined('ABSPATH')) exit; // Exit if accessed directly  ?>
<div class="nbd-license">
    <h3>
        <span class="dashicons dashicons-id-alt"></span> <?php echo __("License", 'web-to-print-online-designer'); ?>
        <span> | <?php echo __("Version", 'web-to-print-online-designer'); ?></span> <b><?php echo NBDESIGNER_VERSION; ?></b>
        <a href="https://cmsmart.net/support_ticket" target="_blank" class="nbd_support"><?php _e("Support", 'web-to-print-online-designer'); ?></a>
    </h3>
    <table class="form-table">
        <tr valign="top" class="" id="nbdesigner_license" <?php if(isset($license['key'])) echo 'style="display: none;"'; ?>>
            <th scope="row" class="titledesc"><?php echo __("Get free license key", 'web-to-print-online-designer'); ?> </th>
            <td class="forminp-text">
                <input type="email" class="regular-text" name="nbdesigner[name]" placeholder="Enter your name"/><br /><br />
                <input type="email" class="regular-text" name="nbdesigner[email]" placeholder="Enter your email"/>
                <button  class="button-primary" id="nbdesigner_get_key" ><?php _e('Get key', 'web-to-print-online-designer'); ?></button>
                <img src="<?php echo NBDESIGNER_PLUGIN_URL.'assets/images/loading.gif' ?>" class="nbdesigner_loaded" id="nbdesigner_license_loading" style="margin-left: 15px;"/>
                <div class="description">
                    <small id="nbdesigner_key_mes"><?php _e('Please fill correct email. License key will be sent to your email.', 'web-to-print-online-designer'); ?></small>
                </div>
                <input type="hidden" name="nbdesigner[domain]" value="<?php echo $site_url; ?>"/>
                <input type="hidden" name="nbdesigner[title]" value="<?php echo $site_title; ?>"/>
                <?php wp_nonce_field($this->plugin_id.'-get-key', $this->plugin_id . '_getkey_hidden'); ?>
            </td>
        </tr>   
        <tr <?php if(isset($license['key'])) echo 'style="display: none;"'; ?>><td colspan="2"><hr /></td></tr>
        <tr valign="top" class="" id="nbdesigner_active_license">
            <?php wp_nonce_field('nbdesigner-active-key', '_nbdesigner_license_nonce'); ?>
            <th scope="row" class="titledesc"><?php echo __("Active license key", 'web-to-print-online-designer'); ?> </th>
            <td class="forminp-text">
                <input class="regular-text" type="text" id="nbdesigner_input_key" name="nbdesigner[license]" placeholder="Enter your key" value="<?php if(isset($license['key'])) echo $license['key']; ?>" <?php if(isset($license['key'])) echo ' readonly'; ?>/>
                <button  class="button-primary" id="nbdesigner_active_key" <?php if(isset($license['key'])) echo ' disabled'; ?>><?php _e('Active', 'web-to-print-online-designer'); ?></button>	
                <button  class="button-primary" id="nbdesigner_remove_key" ><?php _e('Remove', 'web-to-print-online-designer'); ?></button>	
                <img src="<?php echo NBDESIGNER_PLUGIN_URL.'assets/images/loading.gif' ?>" class="nbdesigner_loaded" id="nbdesigner_license_active_loading" style="margin-left: 15px;"/>
                <div>
                    <small id="nbdesigner_license_mes">
                        <?php //if(!isset($license['type'])) _e('Your license is incorrect or expired! ', 'web-to-print-online-designer');?>
                        <?php if(!isset($license['type']) || (isset($license['type']) && $license['type'] == 'free')) echo '<a class="nbd-notice-action" href="https://cmsmart.net/wordpress-plugins/woocommerce-online-product-designer-plugin?utm_source=backend&utm_medium=cpc&utm_campaign=wpol&utm_content=textlink" target="_blank">Upgrade Pro version!</a>';?>
                    </small>
                </div>
            </td>
        </tr>
    </table>    
</div>    
<script>
jQuery(document).ready(function(){
    jQuery('#nbdesigner_show_helper').on('click', function(e){
        e.preventDefault();
        jQuery("html, body").animate({ scrollTop: jQuery("#contextual-help-wrap").offset().top }, 500, function(){
            if(!jQuery('#contextual-help-wrap').is(':visible')){
                jQuery('#contextual-help-link').trigger("click");
            }
            jQuery('#tab-link-facebook a').trigger("click");     
        });        
    });
    jQuery('#nbdesigner_google_drive_helper').on('click', function(e){
        e.preventDefault();
        jQuery("html, body").animate({ scrollTop: jQuery("#contextual-help-wrap").offset().top }, 500, function(){
            if(!jQuery('#contextual-help-wrap').is(':visible')){
                jQuery('#contextual-help-link').trigger("click");                 
            }
            jQuery('#tab-link-google_drive a').trigger("click"); 
        });        
    });    
})
</script>