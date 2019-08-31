<div class="nbd-popup popup-nbd-crop" data-animate="bottom-to-top">
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
            <h2 style="font-size: 18px;margin: 0;margin-bottom: 20px;font-weight: bold;text-transform: uppercase;"><?php _e('Crop image','web-to-print-online-designer'); ?></h2>
        </div>
        <div class="body" style="height: calc(100% - 80px);">
            <div class="main-body" style="height: 100%; position: relative;">
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; text-align: center;">
                    <img id="crop-source" style="max-height: 100%; max-width: 100%; display: inline-block;" ng-if="cropObj.status" ng-src="{{cropObj.src}}" />
                </div>
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; text-align: center;">
                    <div style="display: inline-block;">
                        <canvas id="crop-handle-wrap" style="display: inline-block;"></canvas>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer" style="border-top: 1px solid #ddd;">
            <button style="float: right" ng-click="cropImage()" class="nbd-button"><?php _e('Crop','web-to-print-online-designer'); ?> <i class="icon-nbd icon-nbd-fomat-done" style="color: #fff !important; font-size: 20px;"></i></button>
        </div>
    </div>
</div>

