<div class="toolbar-image" ng-show="stages[currentStage].states.isImage">
    <ul class="nbd-main-menu">
        <!--<li class="menu-item menu-filter">
            <i class="icon-nbd icon-nbd-baseline-tune"></i>
            <span>Filter</span>
            <div class="sub-menu" data-pos="left">
                <ul class="filter-presets">
                    <li class="filter-scroll scrollLeft disable"><i class="icon-nbd icon-nbd-arrow-drop-down"></i></li>
                    <li class="container-presets">
                        <ul class="main-presets">
                            <li class="preset active" ng-click="filterImage()">
                                <div class="image">
                                    <div class="inner">
                                        <img src="<?php //echo NBDESIGNER_PLUGIN_URL;?>assets/images/background/49.png"  alt="imge filter">
                                    </div>
                                </div>
                                <span class="title">Grayscale</span>
                            </li>

                        </ul>
                    </li>
                    <li class="filter-scroll scrollRight"><i class="icon-nbd icon-nbd-arrow-drop-down"></i></li>
                </ul>
                <div class="filter-ranges">
                    <ul class="main-ranges">
                        <li class="range range-brightness">
                            <label>Brightness</label>
                            <div class="main-track">
                                <input ng-model="brightness" class="slide-input" type="range" step="1" min="-100" max="100">
                                <span class="range-track"></span>
                                <span class="snap-guide"></span>
                            </div>
                            <span class="value-display1">{{brightness}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </li>-->
        <li class="menu-item menu-crop" ng-click="initCrop()">
            <i class="icon-nbd icon-nbd-round-crop nbd-tooltip-hover" title="<?php _e('Crop','web-to-print-online-designer'); ?>"></i>
        </li>
        <!--<li class="menu-item menu-crop" ng-click="createClippingMask()">
            <i style="height: 24px;" class="nbd-tooltip-hover" title="<?php _e('Create clipping mask','web-to-print-online-designer'); ?>">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#888" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
            </i>
        </li>
        <li class="menu-item menu-crop" ng-click="fixedClippingMask()">
            <i style="height: 24px;" class="nbd-tooltip-hover" title="<?php _e('Remove clipping mask','web-to-print-online-designer'); ?>">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#888" width="21" height="21" viewBox="0 0 21 21">
                    <path d="M15.487 1.313c3.043 0 5.513 2.47 5.513 5.513 0 5.993-6.477 7.851-10.5 13.933-4.256-6.12-10.5-7.743-10.5-13.933 0-3.043 2.47-5.513 5.513-5.513 1.238 0 2.379 0.565 3.298 1.391l-1.591 2.546 4.594 2.625-2.625 6.563 7.219-7.875-4.594-2.625 1.269-1.904c0.726-0.446 1.542-0.721 2.405-0.721z"></path>
                </svg>
            </i>
        </li>
        <li class="menu-item menu-crop" ng-click="removeClippingMask()">
            <i style="height: 24px;" class="nbd-tooltip-hover" title="<?php _e('Remove clipping mask','web-to-print-online-designer'); ?>">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#888" width="21" height="21" viewBox="0 0 21 21">
                    <path d="M15.487 1.313c3.043 0 5.513 2.47 5.513 5.513 0 5.993-6.477 7.851-10.5 13.933-4.256-6.12-10.5-7.743-10.5-13.933 0-3.043 2.47-5.513 5.513-5.513 1.238 0 2.379 0.565 3.298 1.391l-1.591 2.546 4.594 2.625-2.625 6.563 7.219-7.875-4.594-2.625 1.269-1.904c0.726-0.446 1.542-0.721 2.405-0.721z"></path>
                </svg>
            </i>
        </li>
        <li class="menu-item menu-crop" ng-click="debug()">
            <i style="height: 24px;" class="nbd-tooltip-hover" title="<?php _e('Remove clipping mask','web-to-print-online-designer'); ?>">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#888" width="21" height="21" viewBox="0 0 21 21">
                    <path d="M15.487 1.313c3.043 0 5.513 2.47 5.513 5.513 0 5.993-6.477 7.851-10.5 13.933-4.256-6.12-10.5-7.743-10.5-13.933 0-3.043 2.47-5.513 5.513-5.513 1.238 0 2.379 0.565 3.298 1.391l-1.591 2.546 4.594 2.625-2.625 6.563 7.219-7.875-4.594-2.625 1.269-1.904c0.726-0.446 1.542-0.721 2.405-0.721z"></path>
                </svg>
            </i>
        </li> -->       
    </ul>
</div>