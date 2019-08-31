<?php
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
if( !class_exists('Nbdesigner_Libraries') ) {    
    class Nbdesigner_Libraries{
        public static function get_options() {
            return apply_filters('nbdesigner_libraries_settings', array(
                'js-settings' => array(
//                    array(
//                        'title' => __( 'Enable perfect-scrollbar js', 'web-to-print-online-designer'),
//                        'id' 		=> 'nbdesigner_enable_perfect_scrollbar_js',
//                        'description' 	=> __('Library source: https://github.com/utatti/perfect-scrollbar <br /> Disable if the theme or other plugin included', 'web-to-print-online-designer'),
//                        'default'	=> 'yes',
//                        'type' 		=> 'radio',
//                        'options'   => array(
//                            'yes' => __('Yes', 'web-to-print-online-designer'),
//                            'no' => __('No', 'web-to-print-online-designer')
//                        )                      
//                    ),
                    array(
                        'title' => __( 'Angular js', 'web-to-print-online-designer'),
                        'id' 		=> 'nbdesigner_enable_angular_js',
                        'description' 	=> __('AngularJS: https://angularjs.org/ <br /> Disable if the theme or other plugin included', 'web-to-print-online-designer'),
                        'default'	=> 'yes',
                        'type' 		=> 'radio',
                        'options'   => array(
                            'yes' => __('Yes', 'web-to-print-online-designer'),
                            'no' => __('No', 'web-to-print-online-designer')
                        )                      
                    )                    
                ),
                'css-settings' => array(
//                    array(
//                        'title' => __( 'Enable perfect-scrollbar css', 'web-to-print-online-designer'),
//                        'id' 		=> 'nbdesigner_enable_perfect_scrollbar_css',
//                        'description' 	=> __('Library source: https://github.com/utatti/perfect-scrollbar <br /> Disable if the theme or other plugin included', 'web-to-print-online-designer'),
//                        'default'	=> 'yes',
//                        'type' 		=> 'radio',
//                        'options'   => array(
//                            'yes' => __('Yes', 'web-to-print-online-designer'),
//                            'no' => __('No', 'web-to-print-online-designer')
//                        )                      
//                    )                     
                )                
            ));
        }
    }
}