<div class="tabs-nav">
    <?php $animation_dir = is_rtl() ? 'slideInRight' : 'slideInLeft'; ?>
    <ul class="main-tabs" data-tab="tab-1">
        <div id="selectedTab"><span></span><span></span></div>
        <li class="tab layerTab active animated <?php echo $animation_dir; ?> animate300" id="design-tab"><i class="icon-nbd icon-nbd-baseline-palette"></i><span><?php _e('Design','web-to-print-online-designer'); ?></span></li>
        <?php if( $show_nbo_option && $settings['nbdesigner_display_product_option'] == '2' && !wp_is_mobile() ): ?>
        <li class="tab <?php if( $active_product ) echo 'active'; ?> animated <?php echo $animation_dir; ?>  animate300"><i class="icon-nbd icon-nbd-package"></i><span><?php _e('Product','web-to-print-online-designer'); ?></span></li>
        <?php endif; ?>
        <?php if( $product_data["option"]['admindesign'] != "0" ): ?>
        <li id="nav-templates" data-tour="templates" data-tour-priority="1" ng-click="disableDrawMode();getProduct()" class="tab tab-first animated <?php echo $animation_dir; ?> animate400 <?php if( $active_template ) echo 'active'; ?>">
            <svg id="template-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" width="28" viewBox="0 0 27 24">
                <path d="M12 16.232c0 0.978-0.643 1.768-1.433 1.768h-5.705c-0.79 0-1.433-0.79-1.433-1.768 0-1.768 0.429-3.804 2.196-3.804 0.536 0.536 1.272 0.857 2.089 0.857s1.554-0.321 2.089-0.857c1.768 0 2.196 2.036 2.196 3.804zM10.286 10.286c0 1.42-1.152 2.571-2.571 2.571s-2.571-1.152-2.571-2.571 1.152-2.571 2.571-2.571 2.571 1.152 2.571 2.571zM24 15.857v0.857c0 0.241-0.188 0.429-0.429 0.429h-9.429c-0.241 0-0.429-0.188-0.429-0.429v-0.857c0-0.241 0.188-0.429 0.429-0.429h9.429c0.241 0 0.429 0.188 0.429 0.429zM18.857 12.429v0.857c0 0.241-0.188 0.429-0.429 0.429h-4.286c-0.241 0-0.429-0.188-0.429-0.429v-0.857c0-0.241 0.188-0.429 0.429-0.429h4.286c0.241 0 0.429 0.188 0.429 0.429zM24 12.429v0.857c0 0.241-0.188 0.429-0.429 0.429h-2.571c-0.241 0-0.429-0.188-0.429-0.429v-0.857c0-0.241 0.188-0.429 0.429-0.429h2.571c0.241 0 0.429 0.188 0.429 0.429zM24 9v0.857c0 0.241-0.188 0.429-0.429 0.429h-9.429c-0.241 0-0.429-0.188-0.429-0.429v-0.857c0-0.241 0.188-0.429 0.429-0.429h9.429c0.241 0 0.429 0.188 0.429 0.429zM25.714 20.143v-15h-24v15c0 0.228 0.201 0.429 0.429 0.429h23.143c0.228 0 0.429-0.201 0.429-0.429zM27.429 3.857v16.286c0 1.179-0.964 2.143-2.143 2.143h-23.143c-1.179 0-2.143-0.964-2.143-2.143v-16.286c0-1.179 0.964-2.143 2.143-2.143h23.143c1.179 0 2.143 0.964 2.143 2.143z"></path>
            </svg>
            <span><?php _e('Templates','web-to-print-online-designer'); ?></span>
        </li>
        <?php endif; ?>
        <li id="nav-typos" data-tour="typos" data-tour-priority="2" ng-click="disableDrawMode();getResource('typography', '#tab-typography')" class="<?php if( $active_typos ) echo 'active'; ?> tab animated <?php echo $animation_dir; ?> animate500" ng-if="settings['nbdesigner_enable_text'] == 'yes'"><i class="icon-nbd icon-nbd-text-fields" style="font-size: 28px"></i><span><?php _e('Text','web-to-print-online-designer'); ?></span></li>
        <li id="nav-cliparts" data-tour="cliparts" data-tour-priority="3" ng-click="disableDrawMode();getResource('clipart', '#tab-svg', true)" class="<?php if( $active_cliparts ) echo 'active'; ?> tab animated <?php echo $animation_dir; ?> animate600 tab-clipart" ng-if="settings['nbdesigner_enable_clipart'] == 'yes'"><i class="icon-nbd icon-nbd-sharp-star" style="font-size: 28px"></i><span><?php _e('Cliparts','web-to-print-online-designer'); ?></span></li>
        <li id="nav-photos" data-tour="photos" data-tour-priority="4" class="<?php if( $active_photos ) echo 'active'; ?> tab animated <?php echo $animation_dir; ?> animate700" ng-click="disableDrawMode()" ng-if="settings['nbdesigner_enable_image'] == 'yes'"><i class="icon-nbd icon-nbd-images" style="font-size: 21px"></i><span><?php _e('Photos','web-to-print-online-designer'); ?></span></li>
        <?php if($show_elements_tab): ?>
        <li id="nav-elements" data-tour="elements" data-tour-priority="5" class="<?php if( $active_elements ) echo 'active'; ?> tab animated <?php echo $animation_dir; ?> animate800" ng-click="disableDrawMode()"><i class="icon-nbd icon-nbd-geometrical-shapes-group"></i><span><?php _e('Elements','web-to-print-online-designer'); ?></span></li>
        <?php endif; ?>
        <?php if($settings["nbdesigner_hide_layer_tab"] == "no"): ?>
        <li id="nav-layers" data-tour="layers" data-tour-priority="6" class="<?php if( $active_layers ) echo 'active'; ?> tab animated <?php echo $animation_dir; ?> animate900" ng-click="disableDrawMode()"><i class="icon-nbd icon-nbd-stack"></i><span><?php _e('Layers','web-to-print-online-designer'); ?></span></li>
        <?php endif; ?>
        <li id="nav-end" class="tab tab-end" style="pointer-events: none"></li>
    </ul>
    <div class="keyboard-shortcuts"><i class="icon-nbd icon-nbd-info-circle nbd-tooltip-hover tooltipstered nbd-hover-shadow"></i></div>
    <div class="nbd-sidebar-close"><i class="icon-nbd icon-nbd-clear"></i></div>
</div>