<?php if ( ! defined( 'ABSPATH' ) ) { exit;} ?>
<tr>
    <td class="sort"></td>
    <td class="file_name">
        <input type="text" class="input_text" placeholder="<?php _e('File name', 'web-to-print-online-designer'); ?>" name="_nbdg_file_names[]" value="<?php echo esc_attr( $file['name'] ); ?>" />
    </td>
    <td class="file_ext">
        <input type="text" class="input_text" placeholder="<?php _e('ext', 'web-to-print-online-designer'); ?>" name="_nbdg_file_exts[]" value="<?php echo esc_attr( $file['ext'] ); ?>" />
    </td>
    <td class="file_url"><input type="text" class="input_text" placeholder="<?php _e('http://', 'web-to-print-online-designer'); ?>" name="_nbdg_file_urls[]" value="<?php echo esc_attr( $file['file'] ); ?>" /></td>
    <td class="file_url_choose" width="1%"><a href="#" class="button nbdg_upload_file_button" data-choose="<?php _e('Choose file', 'web-to-print-online-designer'); ?>" data-update="<?php _e('Insert file URL', 'web-to-print-online-designer'); ?>"><?php _e('Choose file', 'web-to-print-online-designer'); ?></a></td>
    <td width="1%"><a href="#" class="delete"><?php _e('Delete', 'web-to-print-online-designer'); ?></a></td>
</tr>