<div class="nbd-popup popup-nbd-user-design" data-animate="scale">
    <div class="main-popup" style="padding: 0;width: 80% !important; height: 80%; box-sizing: border-box;">
        <div class="overlay-main">
            <div class="loaded">
                <svg class="circular" viewBox="25 25 50 50" style="width: 40px;height: 40px;">
                    <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
                </svg>
            </div>
        </div>
        <i class="icon-nbd icon-nbd-clear close-popup"></i>
        <div class="head">
            <h2 style="font-size: 18px;margin: 0;padding: 20px;font-weight: bold;text-transform: uppercase; border-bottom: 1px solid #ddd;"><?php _e('My design','web-to-print-online-designer'); ?></h2>
        </div>
        <div class="body" style="padding: 20px; height: calc(100% - 60px);">
            <div class="main-body" style="height: 100%;">
                <div class="tab-scroll">
                    <div class="nbd-user-design" ng-repeat="design in resource.myDesigns" ng-click="loadUserDesigns(design.id)">
                        <img style="max-width: 100%;" ng-src="{{design.preview}}" />
                        <span class="action-button left" ng-click="loadUserDesigns(design.id); $event.stopPropagation();"><?php _e('Select','web-to-print-online-designer'); ?></span>
                        <span class="action-button right" ng-click="deleteUserDesign(design.id, $index); $event.stopPropagation();">
                            <i style="color: #fff; font-size: 16px;" class="icon-nbd icon-nbd-clear" title="<?php _e('Delete','web-to-print-online-designer'); ?>"></i> <?php _e('Delete','web-to-print-online-designer'); ?>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer"></div>
    </div>
</div>

