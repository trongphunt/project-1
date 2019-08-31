<div class="nbd-popup popup-template" data-animate="bottom-to-top">
    <div class="overlay-popup"></div>
    <div class="main-popup">
        <i class="icon-nbd icon-nbd-clear close-popup"></i>
        <div class="overlay-main active">
            <div class="loaded">
                <svg class="circular" viewBox="25 25 50 50" style="width: 40px;height: 40px;">
                    <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
                </svg>
            </div>
        </div>
        <div class="head">
            <h2 style="font-size: 18px;margin: 0;margin-bottom: 20px;font-weight: bold;text-transform: uppercase;"><?php _e('Save this template','web-to-print-online-designer'); ?></h2>
        </div>
        <div class="body">
            <div class="main-body">
                <div>
                    <label style="min-width: 200px;" for="category_template"><?php _e('Category','web-to-print-online-designer'); ?></label>
                    <select style="line-height: 30px; width: 200px; height: 30px;" class="process-select" ng-model="templateCat" id="category_template">
                        <option ng-repeat="cat in templateCats" ng-value="{{cat.id}}"><span>{{cat.name}}</span></option>
                    </select>
                </div>
                <div style="margin-top: 20px;">
                    <label style="min-width: 200px;" for="template-name"><?php _e('Name','web-to-print-online-designer'); ?></label>
                    <input style="line-height: 30px; width: 200px;" ng-model="templateName" id="template-name"/>
                </div>
                <div style="text-align: center; margin-top: 20px;">
                    <button ng-class="templateName != '' ? '' : 'nbd-disabled' " class="nbd-button" ng-click="saveData('template')">Save</button>
                </div>
            </div>
        </div>
        <div class="footer"></div>
    </div>
</div>
