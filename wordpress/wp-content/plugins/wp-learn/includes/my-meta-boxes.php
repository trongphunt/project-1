<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*PHẦN HIỂN THỊ BOX META*/
function add_metabox()
{
    add_meta_box('the-loai', 'Thể Loại', 'show_metabox_contain', 'post', 'advanced', 'high', array(1, 2, 3));
}
 
function show_metabox_contain($post, $metabox)
{
    // Input hidden bảo mật
    wp_nonce_field(basename(__FILE__), "meta-box-the-loai-nonce");
    ?>
    <select name="meta-box-the-loai">
        <?php 
            // Danh sách thể loại
            $option_values = array('Video', 'Image', "Text");
 
            // Lấy thông tin trong database
            $the_loai = get_post_meta($post->ID, "meta-box-the-loai", true);
                     
            // Lặp qua các thể loại và thiết lập selected
            foreach($option_values as $key => $value) 
            {
                if($value == $the_loai)
                {
                    ?>
                        <option selected value="<?php echo $value; ?>"><?php echo $value; ?></option>
                    <?php    
                }
                else
                {
                    ?>
                        <option value="<?php echo $value; ?>"><?php echo $value; ?></option>
                    <?php
                }
            }
        ?>
    </select>
    <?php 
}
 
add_action('add_meta_boxes', 'add_metabox');
 
 
/*PHẦN XỬ LÝ LƯU TRỮ TRONG CSDL*/
function save_metabox_data($post_id, $post, $update)
{
    // Đây chính là input hidden Security mà ta đã tạo ở hàm show_metabox_contain
    if (!isset($_POST["meta-box-the-loai"]) || !wp_verify_nonce($_POST["meta-box-the-loai-nonce"], basename(__FILE__)))
    {
        return $post_id;
    }
     
    // Kiểm tra quyền
    if(!current_user_can("edit_post", $post_id))
    {
        return $post_id;
    }
         
    // Nếu auto save thì không làm gì cả
    if(defined("DOING_AUTOSAVE") && DOING_AUTOSAVE)
    {
        return $post_id;
    }
     
    // Vì metabox này dành cho Post nên phải kiểm tra có đúng vậy không?
    if('post' != $post->post_type){
        return $post_id;
    }
      
    // Lấy thông tin từ client
    $metabox_the_loai = (isset($_POST["meta-box-the-loai"])) ? $_POST["meta-box-the-loai"] : '';
     
    // Cập nhật thông tin, hàm này sẽ tạo mới nếu như trong db chưa tồn tại
    update_post_meta($post_id, "meta-box-the-loai", $metabox_the_loai);
}
 
add_action('save_post', 'save_metabox_data', 10, 3);