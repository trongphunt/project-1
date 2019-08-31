<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
if(count($templates)):
    $UrlPageNBD = getUrlPageNBD('create');
?>
    <div class="nbd-gallery-item-templates">
    <?php
        foreach ($templates as $key => $temp):
        $link_template = add_query_arg(array(
            'product_id' => $temp['product_id'],
            'variation_id' => $temp['variation_id'],
            'reference'  =>  $temp['folder']
        ), $UrlPageNBD);
    ?>
        <div class="template nbd-col-<?php echo $atts['per_row']?>">
            <div class="main">
                <a href="<?php echo $link_template; ?>">
                    <img src="<?php echo $temp['image']; ?>" class="nbdesigner-img"/>
                    <span>Start design</span>
                </a>
                <p><?php echo $temp['title']; ?></p>
            </div>
        </div>
    <?php endforeach;?>
    </div>
    <?php

else:
        _e('No template', 'web-to-print-online-designer');
endif;
