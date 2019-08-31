<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function add_admin_menu(){
    add_menu_page(
            'Plugin Options',
            'Plugin Options',
            'manage_options',
            'plugin-options',
            'show_plugin_options',
            '',
            '2'
            );
}

function show_plugin_options(){
    echo '<h1 style="text-align:center;">Đây là trang Plugin Options</h1>';
}

add_action('admin_menu','add_admin_menu');


function add_admin_submenu(){
    add_submenu_page(
            'plugin-options',
            'General Settings',
            'General Settings',
            'manage_options',
            'plugin-options-general-settings',
            'show_general_setting_page'
            );
    
    add_submenu_page(
            'plugin-options',
            'Advanced Settings',
            'Advanced Settings',
            'manage_options',
            'plugin-options-advanced-settings',
            'show_advanced_setting_page'
            );
}

function show_general_setting_page(){
    echo '<h1 style="text-align:center;">Đây là trang Plugin Options - General Settings</h1>';
}

function show_advanced_setting_page(){
    echo '<h1 style="text-align:center;">Đây là trang Plugin Options - Advanced Settings</h1>';
}

add_action('admin_menu', 'add_admin_submenu');