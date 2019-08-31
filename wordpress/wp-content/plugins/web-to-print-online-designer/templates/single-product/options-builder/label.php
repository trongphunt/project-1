<?php if (!defined('ABSPATH')) exit; ?>
<div class="nbd-option-field <?php echo $class; ?>" ng-if="nbd_fields['<?php echo $field['id']; ?>'].enable">
    <?php include( NBDESIGNER_PLUGIN_DIR .'templates/single-product/options-builder/field-header.php' ); ?>
    <div class="nbd-field-content">
        <div class="nbd-label-wrap">
        <?php 
            foreach ($field['general']['attributes']["options"] as $key => $attr): 
                $enable_subattr = isset($attr['enable_subattr']) ? $attr['enable_subattr'] : 0;
                $attr['sub_attributes'] = isset( $attr['sub_attributes'] ) ? $attr['sub_attributes'] : array();
                $show_subattr = ($enable_subattr == 'on' && count($attr['sub_attributes']) > 0) ? true : false;
                $field['general']['attributes']["options"][$key]['show_subattr'] = $show_subattr;
        ?>
        <input ng-change="check_valid()" value="<?php echo $key; ?>" ng-model="nbd_fields['<?php echo $field['id']; ?>'].value" name="nbd-field[<?php echo $field['id']; ?>]<?php if($show_subattr) echo '[value]'; ?>" type="radio" id='nbd-field-<?php echo $field['id'].'-'.$key; ?>' 
            <?php 
                if( isset($form_values[$field['id']]) ){
                    $fvalue = (is_array($form_values[$field['id']]) && isset($form_values[$field['id']]['value'])) ? $form_values[$field['id']]['value'] : $form_values[$field['id']];
                    checked( $fvalue, $key );
                }else{
                    checked( isset($attr['selected']) ? $attr['selected'] : 'off', 'on' ); 
                }
            ?> />
        <label class="nbd-label" for='nbd-field-<?php echo $field['id'].'-'.$key; ?>' >
            <?php echo $attr['name']; ?> 
        </label>
        <?php endforeach; ?>
        </div>
        <?php 
            foreach ($field['general']['attributes']["options"] as $key => $attr): 
                if( $attr['show_subattr'] ):
                    $sattr_display_type = isset( $attr['sattr_display_type'] ) ? $attr['sattr_display_type'] : 'l';
                    switch($sattr_display_type){
                        case 's':
                            $tempalte = NBDESIGNER_PLUGIN_DIR .'templates/single-product/options-builder/sattr_swatch'.$prefix.'.php';
                            $wrap_class = 'nbd-swatch-wrap';
                            break;
                        case 'l':
                            $tempalte = NBDESIGNER_PLUGIN_DIR .'templates/single-product/options-builder/sattr_label.php';
                            $wrap_class = 'nbd-label-wrap';
                            break;            
                        case 'r':
                            $tempalte = NBDESIGNER_PLUGIN_DIR .'templates/single-product/options-builder/sattr_radio.php';
                            $wrap_class = 'nbd-radio';
                            break;
                        default:
                            $tempalte = NBDESIGNER_PLUGIN_DIR .'templates/single-product/options-builder/sattr_dropdown.php';
                            $wrap_class = '';
                            break;            
                    }
        ?>
        <div ng-if="nbd_fields['<?php echo $field['id']; ?>'].value == '<?php echo $key; ?>'" class="nbo-sub-attr-wrap <?php echo $wrap_class; ?>">
        <?php include($tempalte); ?>
        </div>
        <?php endif; endforeach; ?>
    </div>
</div>

