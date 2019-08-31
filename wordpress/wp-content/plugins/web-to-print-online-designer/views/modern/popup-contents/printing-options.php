<div class="nbd-popup popup-nbo-options" data-animate="bottom-to-top">
    <div class="overlay-popup"></div>
    <div class="main-popup" style="width: 80% !important; height: 90%; box-sizing: border-box;">
        <i class="icon-nbd icon-nbd-clear close-popup"></i>
        <div class="overlay-main active">
            <div class="loaded">
                <svg class="circular" viewBox="25 25 50 50" style="width: 40px;height: 40px;">
                    <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
                </svg>
            </div>
        </div>
        <div class="head">
            <h2 style="font-size: 18px;margin: 0;margin-bottom: 20px;font-weight: bold;text-transform: uppercase;">{{settings.task2 == '' ? "<?php _e('Choose options','web-to-print-online-designer'); ?>" : "<?php _e('Options preview','web-to-print-online-designer'); ?>"}} <?php if($task2 != ''): ?><a style="font-size:14px;text-transform:capitalize;margin-left:15px;" href="<?php echo $link_edit_option; ?>"><?php _e('Edit options','web-to-print-online-designer'); ?></a><?php endif; ?> </h2>
        </div>
        <div class="body" style="height: calc(100% - 80px);">
            <div class="main-body" style="min-height: 300px; max-height: 100%; position: relative;" id="nbo-options-wrap">
            </div>
        </div>
        <div class="footer" style="border-top: 1px solid #ddd;">
            <span style="line-height: 36px;display: inline-block;margin-top: 10px;" ng-if="!printingOptionsAvailable" class="nbd-invalid-form"><?php _e('Please choose options before apply to start design!', 'web-to-print-online-designer'); ?></span><a ng-class="printingOptionsAvailable ? '' : 'nbd-disabled'" class="nbd-button nbo-apply" ng-click="applyOptions()">{{settings.task2 == '' ? "<?php _e('Apply options','web-to-print-online-designer'); ?>" : "<?php _e('Start design','web-to-print-online-designer'); ?>" }}</a>
        </div>
    </div>
</div>
