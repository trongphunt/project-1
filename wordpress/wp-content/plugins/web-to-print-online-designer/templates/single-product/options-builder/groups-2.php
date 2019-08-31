<?php if (!defined('ABSPATH')) exit; ?>
<?php 
    foreach( $options['groups'] as $group ): 
        if( isset( $group['fields'] ) && count( $group['fields'] ) > 0 ):
            $cols = (int) $group['cols'];
            if( count( $group['fields'] ) < $cols ) $cols = count( $group['fields'] );
?>
<div class="nbo-group-type2-wrap nbo-float-col-<?php echo $cols; ?>">
    <div class="nbo-group-type2-header">
        <span class="group-type2-title">
            <span><?php echo $group['title']; ?></span>
            <span class="nbo-group-type2-toggle" ng-click="toggle_group($event)">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M16.594 8.578l1.406 1.406-6 6-6-6 1.406-1.406 4.594 4.594z"/>
                </svg>
            </span>
        </span>
    </div>
    <div class="nbo-group-type2-body">
        <?php 
            foreach( $group['fields'] as $f ){
                $f_index = get_field_by_id( $f, $options["fields"] );
                $field = $options["fields"][$f_index];
                $class = $field['class'];
                if( $field['general']['enabled'] == 'y' && $field['need_show'] ) include( $field['template'] );
            }
        ?>
    </div>
</div>
<?php endif; endforeach;