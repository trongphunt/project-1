<div class="<?php if( $active_layers ) echo 'active'; ?> tab tab-last" id="tab-layer">
    <div class="tab-main tab-scroll">
        <div class="inner-tab-layer">
            <ul class="menu-layer" nbd-layer="sortLayer(srcIndex, dstIndex)">
                <li class="menu-item item-layer-text" data-index="{{layer.index}}" ng-click="activeLayer(layer.index)" ng-class="{'lock-active': !layer.selectable, 'nbd-disable-event': !isTemplateMode && layer.forceLock, 'active' : stages[currentStage].states.isLayer && stages[currentStage].states.itemId == layer.itemId}" data-id="{{layer.itemId}}" ng-repeat="layer in stages[currentStage].layers">
                    <i ng-if="layer.type != 'image'" class="icon-nbd item-left" ng-class="'icon-nbd-' + layer.icon_class"></i>
                    <img ng-if="layer.type == 'image'" style="max-width: 34px; max-height: 34px; display: inline-block; padding: 5px;" ng-src="{{layer.src}}" />
                    <div ng-if="layer.type == 'text'" class="item-center"><input ng-class="layer.editable ? '' : 'nbd-disabled'" style="border: none;" ng-change="setLayerAttribute('text', layer.text, layer.index, $index)" ng-model="layer.text" type="text"/></div>
                    <span ng-if="layer.type != 'text'" class="item-center">{{settings.nbdlangs[layer.type]}}</span>
                    <span class="item-right">
                        <i style="color: #ffa726;opacity: 1;" class="icon-nbd icon-nbd-baseline-warning" ng-if="layer.lostChar"></i>
                        <i ng-click="setLayerAttribute('visible', !layer.visible, layer.index, $index); $event.stopPropagation();" ng-class="layer.visible ? 'icon-nbd-fomat-visibility' : 'icon-nbd-fomat-visibility-off'" class="icon-nbd icon-visibility" data-active="true" data-act="visibility" title="<?php _e('Show/Hide', 'web-to-print-online-designer'); ?>"></i>
                        <i ng-click="setLayerAttribute('selectable', !layer.selectable, layer.index, $index); $event.stopPropagation();" ng-class="layer.selectable ? 'icon-nbd-fomat-lock-open' : 'icon-nbd-fomat-lock-outline'" class="icon-nbd icon-lock" data-active="true" data-act="lock" title="<?php _e('Lock/Unlock', 'web-to-print-online-designer'); ?>"></i>
                        <i ng-click="deleteLayers(layer.index); $event.stopPropagation();" class="icon-nbd icon-nbd-fomat-highlight-off icon-close" data-act="close" title="<?php _e('Delete', 'web-to-print-online-designer'); ?>"></i>
                    </span>
                </li>
            </ul>
        </div>
    </div>
</div>