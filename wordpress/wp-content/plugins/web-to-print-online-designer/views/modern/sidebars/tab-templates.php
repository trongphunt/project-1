<div class="tab tab-first <?php if( $active_template ) echo 'active'; ?>" id="tab-product-template"  
    <?php if( !( isset( $template_data ) && isset( $template_data['template_tags'] ) ) ): ?>
     nbd-scroll="scrollLoadMore(container, type)" data-container="#tab-product-template" data-type="globalTemplate" data-offset="30"
    <?php endif; ?>
>
<!--    <div class="nbd-search" ng-if="settings.ui_mode != '1'">
        <input type="search" name="search" placeholder="search"/>
        <i class="icon-nbd icon-nbd-fomat-search"></i>
    </div>-->
    <div class="tab-template show" id="tab-template">
        <!--            <i class="icon-nbd icon-nbd-fomat-highlight-off close-template"></i>-->
        <div class="tab-main tab-scroll">
            <?php if( isset( $template_data ) && isset( $template_data['template_tags'] ) ) include 'custom-templates-section.php'; ?>
            <div class="nbd-templates">
                <div class="main-items">
                    <div class="items" style="text-align: left; padding-left: 5px; padding-right: 5px;">       
                        <?php if( !( isset( $template_data ) && isset( $template_data['template_tags'] ) ) && $task != 'create_template' ): ?>
                        <div ng-style="{'display': settings.task == 'create_template' ? 'none' : 'inline-block' }" class="item" ng-repeat="temp in resource.templates" ng-click="insertTemplate(false, temp)">
                            <div class="main-item">
                                <div class="item-img" nbd-template-hover="{{temp.id}}">
                                    <img ng-src="{{temp.thumbnail}}" alt="<?php _e('Template','web-to-print-online-designer'); ?>">
                                </div>
                            </div>
                        </div>
                        <hr ng-hide="resource.templates.length == 0" style="margin: 2px 6px;"/>
                        <div class="item" ng-repeat="temp in resource.globalTemplate.data" ng-click="insertGlobalTemplate(temp.id, $index)">
                            <div class="main-item" image-on-load="temp.thumbnail">
                                <div class="item-img" style="position: relative;">
                                    <img ng-src="{{temp.thumbnail}}" alt="{{temp.name}}">
                                    <?php if(!$valid_license): ?>
                                    <span class="nbd-pro-mark-wrap" ng-if="$index > 4">
                                        <svg class="nbd-pro-mark" fill="#F3B600" xmlns="http://www.w3.org/2000/svg" viewBox="-505 380 12 10"><path d="M-503 388h8v1h-8zM-494 382.2c-.4 0-.8.3-.8.8 0 .1 0 .2.1.3l-2.3.7-1.5-2.2c.3-.2.5-.5.5-.8 0-.6-.4-1-1-1s-1 .4-1 1c0 .3.2.6.5.8l-1.5 2.2-2.3-.8c0-.1.1-.2.1-.3 0-.4-.3-.8-.8-.8s-.8.4-.8.8.3.8.8.8h.2l.8 3.3h8l.8-3.3h.2c.4 0 .8-.3.8-.8 0-.4-.4-.7-.8-.7z"></path></svg>
                                        <?php _e('Pro','web-to-print-online-designer'); ?>
                                    </span>
                                    <?php endif; ?>
                                </div>
                            </div>
                        </div>  
                        <?php endif; ?>
                        <?php if( $task == 'create_template' ): ?>
                        <div style="padding:5px;">
                            <div>
                                <input placeholder="Width" ng-model="lineConfig.width" style="width: 40px; border: 1px solid #404762;padding: 0px 5px; line-height: 34px;"/>
                                <input placeholder="Dash" ng-model="lineConfig.dash1" style="width: 40px; border: 1px solid #404762;padding: 0px 5px; line-height: 34px;"/>
                                <input placeholder="Dash" ng-model="lineConfig.dash2" style="width: 40px; border: 1px solid #404762;padding: 0px 5px; line-height: 34px;"/>
                                <input placeholder="Stroke color" ng-model="lineConfig.color" style="width: 60px; border: 1px solid #404762;padding: 0px 5px; line-height: 34px;"/>
                                <button style="margin-left: 0" class="nbd-button" ng-click="addLine()">Add Line</button>
                            </div>
                            <hr style="margin: 3px 0;"/>
                            <div>
                                <button style="margin-left: 0" class="nbd-button" ng-click="uploadSvgFile()">Upload SVG</button>
                                <button style="margin-left: 0" class="nbd-button" ng-click="addText()">Add Text</button>
                                <button style="margin-left: 0" class="nbd-button" ng-click="addShape('rect')">Rectangle</button>
                                <button style="margin-left: 0" class="nbd-button" ng-click="addShape('triangle')">Triangle</button>
                                <button style="margin-left: 0" class="nbd-button" ng-click="addShape('circle')">Circle</button>
                            </div>
                            <hr />
                            <div>
                                <input placeholder="Width" ng-model="templateSize.width" ng-keyup="$event.keyCode == 13 && changeTemplateDimension()" style="width: 100px; border: 1px solid #404762;padding: 0px 5px; line-height: 34px;"/>
                                <input placeholder="Height" ng-model="templateSize.height" ng-keyup="$event.keyCode == 13 && changeTemplateDimension()" style="width: 100px; border: 1px solid #404762;padding: 0px 5px; line-height: 34px;"/>
                                <button style="margin-left: 0" class="nbd-button" ng-click="changeTemplateDimension()">Apply</button>
                            </div>
                            <hr />
<!--                            <div>
                                <button style="margin-left: 0" class="nbd-button" ng-click="debug()">Debug</button>
                            </div>
                            <hr />-->
                            <div>
                                <button style="margin-left: 0" class="nbd-button" ng-click="_loadTemplateCat()">Load templates</button>
                                <select ng-change="changeGlobalTemplate()" ng-show="templateCats.length > 0" style="line-height: 35px; width: 100%; height: 35px;border-radius: 4px;border: 1px solid #404762;" class="process-select" ng-model="templateCat" id="category_template">
                                    <option ng-repeat="cat in templateCats" ng-value="{{cat.id}}"><span>{{cat.name}}</span></option>
                                </select>
                            </div>
                        </div>
                        <div class="item" ng-repeat="temp in resource.globalTemplate.data" ng-click="insertGlobalTemplate(temp.id, $index)">
                            <div class="main-item" image-on-load="temp.thumbnail">
                                <div class="item-img" style="position: relative;">
                                    <img ng-src="{{temp.thumbnail}}" alt="{{temp.name}}">
                                    <?php if(!$valid_license): ?>
                                    <span class="nbd-pro-mark-wrap" ng-if="$index > 4">
                                        <svg class="nbd-pro-mark" fill="#F3B600" xmlns="http://www.w3.org/2000/svg" viewBox="-505 380 12 10"><path d="M-503 388h8v1h-8zM-494 382.2c-.4 0-.8.3-.8.8 0 .1 0 .2.1.3l-2.3.7-1.5-2.2c.3-.2.5-.5.5-.8 0-.6-.4-1-1-1s-1 .4-1 1c0 .3.2.6.5.8l-1.5 2.2-2.3-.8c0-.1.1-.2.1-.3 0-.4-.3-.8-.8-.8s-.8.4-.8.8.3.8.8.8h.2l.8 3.3h8l.8-3.3h.2c.4 0 .8-.3.8-.8 0-.4-.4-.7-.8-.7z"></path></svg>
                                        <?php _e('Pro','web-to-print-online-designer'); ?>
                                    </span>
                                    <?php endif; ?>
                                </div>
                            </div>
                        </div>    
                        <?php endif; ?>
                    </div>
                    <div class="pointer"></div>
                </div>
                <div class="loading-photo" style="width: 40px; height: 40px; display: none;">
                    <svg class="circular" viewBox="25 25 50 50">
                        <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="nbd-tooltip_templates">
    <div id="tooltip_content_{{temp.id}}" ng-repeat="temp in resource.templates" class="nbd-perfect-scroll nbd-tooltip-template" nbd-perfect-scroll>
        <div style="padding: 15px;">
            <div class="nbd-img-container text-center {{$last ? 'nbd-img-last' : ''}}" ng-if="stages[$index]" ng-repeat="(iIndex, img) in temp.src" ng-click="insertPartTemplate(temp.id, iIndex)">
                <img ng-src="{{img}}" alt="" style="border: 1px solid #ccc; border-radius: 4px;">
                <span style="display: block; font-size: 12px;">{{stages[$index].config.name}}</span>
            </div>
        </div>
    </div>
</div>