<?php if ( ! defined( 'ABSPATH' ) ) exit; ?>
<div class="nbd-popup popup-template-fields" data-animate="scale">
    <div class="overlay-popup"></div>
    <div class="main-popup">
        <i class="icon-nbd icon-nbd-clear close-popup"></i>
        <div class="head">
            <h2 style="font-size: 18px;margin: 0;padding: 20px;font-weight: bold; border-bottom: 1px solid #ddd;"><?php _e('Your Information','web-to-print-online-designer'); ?></h2>
        </div>
        <div class="body">
            <div class="main-body tab-scroll">
                <div ng-repeat="field in templateHolderFields" class="md-input-wrap">
                    <input id="fm-{{field.key}}" ng-model="field.value" ng-class="field.value.length > 0 ? 'holder' : ''"/>
                    <label for="fm-{{field.key}}" >{{field.name}}<label/>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="act-btn">
                <span class="nbd-button" ng-click="updateTemplateFields()"><?php _e('See your information','web-to-print-online-designer'); ?></span>
            </div>
        </div>
    </div>
</div>