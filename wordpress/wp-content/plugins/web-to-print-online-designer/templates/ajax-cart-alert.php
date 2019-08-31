<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
?>
<div class="nbd-alert" id="nbd-ajax-cart-alert" data-animate="scale">
    <div class="overlay-popup"></div>
    <div class="main-popup">
        <div class="nbd-alert-head">
            <h3 id="nbd-ajax-cart-alert-title">
                <span class="success"><?php _e('Successfully!', 'web-to-print-online-designere'); ?></span>
                <span class="failure"><?php _e('Oops!', 'web-to-print-online-designere'); ?></span>
            </h3>
            <i class="close-popup">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <title>close</title>
                    <path d="M18.984 6.422l-5.578 5.578 5.578 5.578-1.406 1.406-5.578-5.578-5.578 5.578-1.406-1.406 5.578-5.578-5.578-5.578 1.406-1.406 5.578 5.578 5.578-5.578z"></path>
                </svg>
            </i>
        </div>
        <div class="nbd-alert-body">
            <div class="nbd-alert-wrapper">
                <p id="nbd-ajax-cart-alert-content"></p>
                <div class="nbd-alert-action">
                    <a class="button" href="<?php echo get_permalink( wc_get_page_id( 'shop' ) );?>"><?php _e('Return to shop', 'web-to-print-online-designere'); ?></a>
                    <a id="nbd-ajax-cart-link" class="button" href="<?php echo esc_url( wc_get_cart_url() ); ?>"><?php _e('View cart', 'web-to-print-online-designere'); ?></a>
                </div>
            </div>
        </div>
    </div>
</div>