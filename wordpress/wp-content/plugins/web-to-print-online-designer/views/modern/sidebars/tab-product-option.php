
    <div style="padding: 10px">
        <h3 class="color-palette-label" style="font-size: 11px; text-align: left; margin: 0 0 5px; text-transform: uppercase;"><?php _e('Document colors','web-to-print-online-designer'); ?></h3>
        <ul class="main-color-palette nbd-perfect-scroll" style="margin-bottom: 10px; max-height: 220px">
            <li class="color-palette-add" ng-click="showBgColorPalette()" ng-style="{'background-color': currentColor}"></li>
            <li ng-repeat="color in listAddedColor track by $index" ng-click="changeBackground(color)" class="color-palette-item" data-color="{{color}}" title="{{color}}" ng-style="{'background-color': color}"></li>
        </ul>
        <div class="pinned-palette default-palette" style="margin-bottom: 10px">
            <h3 class="color-palette-label" style="font-size: 11px; text-align: left; margin: 0 0 5px; text-transform: uppercase;"><?php _e('Default palette','web-to-print-online-designer'); ?></h3>
            <ul class="main-color-palette" ng-repeat="palette in resource.defaultPalette" style="margin-bottom: 15px;">
                <li ng-class="{'first-left': $first, 'last-right': $last}" ng-repeat="color in palette track by $index" ng-click="changeBackground(color)" class="color-palette-item" data-color="{{color}}" title="{{color}}" ng-style="{'background': color}"></li>
            </ul>   
        </div>
        <div class="nbd-text-color-picker" id="nbd-bg-color-picker" ng-class="showBgColorPicker ? 'active' : ''" style="z-index: 999;">
            <spectrum-colorpicker
                ng-model="currentColor"
                options="{
                        preferredFormat: 'hex',
                        color: '#fff',
                        flat: true,
                        showButtons: false,
                        showInput: true,
                        containerClassName: 'nbd-sp'
                }">
            </spectrum-colorpicker>
            <div style="text-align: <?php echo (is_rtl()) ? 'right' : 'left'?>">
                <button class="nbd-button" ng-click="addColor();changeBackground(currentColor);"><?php _e('Choose','web-to-print-online-designer'); ?></button>
            </div>
        </div>

    </div>

