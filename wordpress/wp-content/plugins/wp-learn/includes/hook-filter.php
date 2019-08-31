<?php

// Hàm bổ sung chữ freetuts.net vào chuỗi

function add_string_to_title($title){
    return $title;
}
// Đưa hàm add_string_to_title vào hook filter the_title

add_filter('the_title','add_string_to_title',10,1);
