<?php

function kraj_init() {
	register_taxonomy( 'kraj', array( 'kawa' ), array(
		'hierarchical'      => false,
		'public'            => true,
		'show_in_nav_menus' => true,
		'show_ui'           => true,
		'show_admin_column' => false,
		'query_var'         => true,
		'rewrite'           => true,
		'capabilities'      => array(
			'manage_terms'  => 'edit_posts',
			'edit_terms'    => 'edit_posts',
			'delete_terms'  => 'edit_posts',
			'assign_terms'  => 'edit_posts'
		),
		'labels'            => array(
			'name'                       => __( 'Krajs', 'anfrawer' ),
			'singular_name'              => _x( 'Kraj', 'taxonomy general name', 'anfrawer' ),
			'search_items'               => __( 'Search krajs', 'anfrawer' ),
			'popular_items'              => __( 'Popular krajs', 'anfrawer' ),
			'all_items'                  => __( 'All krajs', 'anfrawer' ),
			'parent_item'                => __( 'Parent kraj', 'anfrawer' ),
			'parent_item_colon'          => __( 'Parent kraj:', 'anfrawer' ),
			'edit_item'                  => __( 'Edit kraj', 'anfrawer' ),
			'update_item'                => __( 'Update kraj', 'anfrawer' ),
			'add_new_item'               => __( 'New kraj', 'anfrawer' ),
			'new_item_name'              => __( 'New kraj', 'anfrawer' ),
			'separate_items_with_commas' => __( 'Separate krajs with commas', 'anfrawer' ),
			'add_or_remove_items'        => __( 'Add or remove krajs', 'anfrawer' ),
			'choose_from_most_used'      => __( 'Choose from the most used krajs', 'anfrawer' ),
			'not_found'                  => __( 'No krajs found.', 'anfrawer' ),
			'menu_name'                  => __( 'Krajs', 'anfrawer' ),
		),
		'show_in_rest'      => true,
		'rest_base'         => 'kraj',
		'rest_controller_class' => 'WP_REST_Terms_Controller',
	) );

}
add_action( 'init', 'kraj_init' );
