<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function add_submenu_option(){
    add_submenu_page(
            'themes.php', // Menu cha
            'Theme Options', // Tiêu đề của menu
            'Theme Options', // Tên của menu
            'manage_options',// Vùng truy cập, giá trị này có ý nghĩa chỉ có supper admin và admin đc dùng
            'theme-options', // Slug của menu
            'access_menu_options' // Hàm callback hiển thị nội dung của menu
            );
}

function access_menu_options()
{
    if(!empty($_POST['save-theme-option']))
    {
        $email = $_POST['email'];
        $pass = $_POST['password'];
        // Cập nhật (nếu chưa có thì hệ thống tự thêm mới)
        update_option('mailer_gmail_username', $email);
        update_option('mailer_gmail_password', $pass);
    }
   
    // Lấy thông tin trong bảng Options
    $email = get_option('mailer_gmail_username');
    $pass = get_option('mailer_gmail_password');
    
    require('template/theme-option.php');
}
 
// Thêm hành động hiển thị menu con vào Action admin_menu Hooks
add_action('admin_menu', 'add_submenu_option');