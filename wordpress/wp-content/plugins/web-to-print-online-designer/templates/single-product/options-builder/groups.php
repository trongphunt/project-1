<?php if (!defined('ABSPATH')) exit; ?>
<?php 
    foreach( $options['groups'] as $group ): 
        if( isset( $group['fields'] ) && count( $group['fields'] ) > 0 ):
            $cols = (int) $group['cols'];
            if( count( $group['fields'] ) < $cols ) $cols = count( $group['fields'] );
?>
<div class="nbo-group-wrap nbo-flex-col-<?php echo $cols; ?>">
    <div class="nbo-group-header">
        <span class="group-title">
            <?php 
                if( $group['image'] != 0 ):
                    $group_image_url = nbd_get_image_thumbnail( $group['image'] );
            ?>
            <span class="nbo-group-icon"><span><img src="<?php echo $group_image_url; ?>" /></span></span>
            <?php endif; ?>
            <span><?php echo $group['title']; ?></span>
            <?php if( $group['des'] != '' ): ?>
            <span data-position="<?php echo $tooltip_position; ?>" data-tip="<?php echo $group['des']; ?>" class="nbd-help-tip"></span>
            <?php endif; ?>
        </span>
    </div>
    <div class="nbo-group-body">
        <?php 
            foreach( $group['fields'] as $f ){
                $f_index = get_field_by_id( $f, $options["fields"] );
                $field = $options["fields"][$f_index];
                $class = $field['class'];
                if( $field['general']['enabled'] == 'y' && $field['need_show'] ) include( $field['template'] );
            }
        ?>
        <span class="nbo-group-toggle" ng-click="toggle_group($event)">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="24" viewBox="0 0 24 24">
                <path d="M16.594 8.578l1.406 1.406-6 6-6-6 1.406-1.406 4.594 4.594z"/>
            </svg>
        </span>
    </div>
    <?php if( $group['note'] != '' ): ?>
    <div class="nbo-group-footer">
        <?php echo $group['note']; ?>
    </div>
    <?php endif; ?>
</div>
<?php endif; endforeach;