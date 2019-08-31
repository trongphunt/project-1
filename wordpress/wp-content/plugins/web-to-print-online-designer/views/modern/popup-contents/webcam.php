<div class="nbd-popup popup-webcam" data-animate="top-to-bottom">
    <div class="overlay-popup"></div>
    <div class="main-popup">
        <i class="icon-nbd icon-nbd-clear close-popup"></i>
        <div class="head">
        </div>
        <div class="body">
            <div id="my_camera">
                <i class="icon-nbd icon-nbd-webcam"></i>
            </div>
        </div>
        <div class="footer">
            <div class="nbd-list-button">
                <button ng-click="pauseWebcam(true)" ng-class="resource.webcam.status ? '' : 'nbd-disabled'" class="nbd-button"><?php _e('Pause','web-to-print-online-designer'); ?></button>
                <button ng-click="pauseWebcam(false)" ng-class="resource.webcam.status ? '' : 'nbd-disabled'" class="nbd-button"><?php _e('Resume','web-to-print-online-designer'); ?></button>
                <button ng-click="resetWebcam()" class="nbd-button"><?php _e('Stop Webcam','web-to-print-online-designer'); ?></button>
                <button ng-click="takeSnapshot()" ng-class="resource.webcam.status ? '' : 'nbd-disabled'" class="nbd-button"><?php _e('Capture','web-to-print-online-designer'); ?></button>
            </div>
        </div>
    </div>
</div>