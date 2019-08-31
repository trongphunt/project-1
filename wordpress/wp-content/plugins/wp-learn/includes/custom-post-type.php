<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

add_action('init', 'create_video_type');
 
function create_video_type() {
    register_post_type('video', array(
            'labels' => array(
                'name'          => __('Videos'),
                'singular_name' => __('Video'),
                'add_new_item'  => __('Add New Video'),
                'new_item'      => __('New Video'),
                'add_new'       => __('Add Video'),
                'edit_item'     => __('Edit Video'),
                'search_items'  => __('Search Videos'),
                'all_items'  => __('Videos'),
                // Còn nhiều nữa các bạn tự thêm nhé
            ),
            'public' => true,
            'has_archive' => true,
            'exclude_from_search' => true            
            // Còn nhiều nữa ...
        )
    );
}