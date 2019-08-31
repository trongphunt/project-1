<?php

// let's create the function for the custom type
function emdr_post_types() { 
	register_post_type( 'faq',
		array('labels' => array(
			'name' => __('FAQ', 'emdrtheme'),
			'singular_name' => __('FAQ', 'emdrtheme'), 
			'all_items' => __('All FAQs', 'emdrtheme'), 
			'add_new' => __('Add New', 'emdrtheme'), 
			'edit' => __( 'Edit', 'emdrtheme' ),
			'edit_item' => __('Edit FAQs', 'emdrtheme'),
			'new_item' => __('New FAQ', 'emdrtheme'), 
			'view_item' => __('View FAQ', 'emdrtheme'), 
			'search_items' => __('Search FAQ', 'emdrtheme'),
			'not_found' =>  __('Nothing found in the Database.', 'emdrtheme'), 
			'not_found_in_trash' => __('Nothing found in Trash', 'emdrtheme'), 
			'parent_item_colon' => ''
			), /* end of arrays */
			'description' => __( 'This is for FAQs', 'emdrtheme' ), 
			'public' => false,
			'publicly_queryable' => true,
			'exclude_from_search' => false,
			'show_ui' => true,
			'query_var' => false,
			// 'menu_position' => 8, 
			'menu_icon' => get_stylesheet_directory_uri() . '/lib/images/custom-post-icon.png',
			'rewrite'	=> array( 'slug' => 'faq', 'with_front' => false ), 
			'has_archive' => 'faq',
			'capability_type' => 'post',
			'hierarchical' => false,
			'supports' => array( 'title', 'editor',)
	 	) /* end of options */
	); /* end of register post type */

	register_post_type( 'video',
		array('labels' => array(
			'name' => __('Video', 'emdrtheme'),
			'singular_name' => __('Video', 'emdrtheme'), 
			'all_items' => __('All Videos', 'emdrtheme'), 
			'add_new' => __('Add New', 'emdrtheme'), 
			'edit' => __( 'Edit', 'emdrtheme' ),
			'edit_item' => __('Edit Videos', 'emdrtheme'),
			'new_item' => __('New Video', 'emdrtheme'), 
			'view_item' => __('View Video', 'emdrtheme'), 
			'search_items' => __('Search Video', 'emdrtheme'),
			'not_found' =>  __('Nothing found in the Database.', 'emdrtheme'), 
			'not_found_in_trash' => __('Nothing found in Trash', 'emdrtheme'), 
			'parent_item_colon' => ''
			), /* end of arrays */
			'description' => __( 'This is for Videos', 'emdrtheme' ), 
			'public' => true,
			'publicly_queryable' => true,
			'exclude_from_search' => false,
			'show_ui' => true,
			'query_var' => false,
			// 'menu_position' => 8, 
			'menu_icon' => get_stylesheet_directory_uri() . '/lib/images/custom-post-icon.png',
			'rewrite'	=> array( 'slug' => 'video', 'with_front' => false ), 
			'has_archive' => 'videos',
			'capability_type' => 'post',
			'hierarchical' => false,
			'supports' => array( 'title', 'editor', 'excerpt')
	 	) /* end of options */
	); /* end of register post type */

	register_post_type( 'testimonial',
		array('labels' => array(
			'name' => __('Testimonial', 'emdrtheme'),
			'singular_name' => __('Testimonial', 'emdrtheme'), 
			'all_items' => __('All Testimonials', 'emdrtheme'), 
			'add_new' => __('Add New', 'emdrtheme'), 
			'edit' => __( 'Edit', 'emdrtheme' ),
			'edit_item' => __('Edit Testimonials', 'emdrtheme'),
			'new_item' => __('New Testimonial', 'emdrtheme'), 
			'view_item' => __('View Testimonial', 'emdrtheme'), 
			'search_items' => __('Search Testimonial', 'emdrtheme'),
			'not_found' =>  __('Nothing found in the Database.', 'emdrtheme'), 
			'not_found_in_trash' => __('Nothing found in Trash', 'emdrtheme'), 
			'parent_item_colon' => ''
			), /* end of arrays */
			'description' => __( 'This is for Testimonials', 'emdrtheme' ), 
			'public' => false,
			'publicly_queryable' => true,
			'exclude_from_search' => false,
			'show_ui' => true,
			'query_var' => false,
			// 'menu_position' => 8, 
			'menu_icon' => get_stylesheet_directory_uri() . '/lib/images/custom-post-icon.png',
			'rewrite'	=> array( 'slug' => 'faq', 'with_front' => false ), 
			'has_archive' => false,
			'capability_type' => 'post',
			'hierarchical' => false,
			'supports' => array( 'title', 'editor',)
	 	) /* end of options */
	); /* end of register post type */
	
	/* this adds your post categories to your custom post type */
	// register_taxonomy_for_object_type('category', 'custom_type');
	/* this adds your post tags to your custom post type */
	// register_taxonomy_for_object_type('post_tag', 'custom_type');
	
} 

	// adding the function to the Wordpress init
	add_action( 'init', 'emdr_post_types');

	// now let's add custom categories (these act like categories)
    register_taxonomy( 'testimonial-cats', 
    	array('testimonial'),
    	array('hierarchical' => true,       
    		'labels' => array(
    			'name' => __( 'Testimonial Categories', 'emdrtheme' ), 
    			'singular_name' => __( 'Testimonial Category', 'emdrtheme' ), 
    			'search_items' =>  __( 'Search Testimonial Categories', 'emdrtheme' ),
    			'all_items' => __( 'All Testimonial Categories', 'emdrtheme' ), 
    			'parent_item' => __( 'Parent Testimonial Category', 'emdrtheme' ),
    			'parent_item_colon' => __( 'Parent Testimonial Category:', 'emdrtheme' ), 
    			'edit_item' => __( 'Edit Testimonial Category', 'emdrtheme' ), 
    			'update_item' => __( 'Update Testimonial Category', 'emdrtheme' ),
    			'add_new_item' => __( 'Add New Testimonial Category', 'emdrtheme' ),
    			'new_item_name' => __( 'New Testimonial Category Name', 'emdrtheme' )
    		),
    		'show_admin_column' => true, 
    		'show_ui' => true,
    		'query_var' => false,
    		'rewrite' => array( 'slug' => 'testimonials' ),
    	)
    );   

?>
