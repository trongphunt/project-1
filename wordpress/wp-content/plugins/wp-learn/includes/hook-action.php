<?php

//Send mail when save a post

function send_mail_public($id,$post){
    
    if($post->status == 'public'){
        //Do send mail function
    }
    
    //attach function to hook
    add_action('save_post','send_mail_public',11,2);
    
}