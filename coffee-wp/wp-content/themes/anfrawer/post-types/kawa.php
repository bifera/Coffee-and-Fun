<?php

function kawa_init() {
	register_post_type( 'kawa', array(
		'labels'            => array(
			'name'                => __( 'Kawas', 'anfrawer' ),
			'singular_name'       => __( 'Kawa', 'anfrawer' ),
			'all_items'           => __( 'All Kawas', 'anfrawer' ),
			'new_item'            => __( 'New kawa', 'anfrawer' ),
			'add_new'             => __( 'Add New', 'anfrawer' ),
			'add_new_item'        => __( 'Add New kawa', 'anfrawer' ),
			'edit_item'           => __( 'Edit kawa', 'anfrawer' ),
			'view_item'           => __( 'View kawa', 'anfrawer' ),
			'search_items'        => __( 'Search kawas', 'anfrawer' ),
			'not_found'           => __( 'No kawas found', 'anfrawer' ),
			'not_found_in_trash'  => __( 'No kawas found in trash', 'anfrawer' ),
			'parent_item_colon'   => __( 'Parent kawa', 'anfrawer' ),
			'menu_name'           => __( 'Kawas', 'anfrawer' ),
		),
		'public'            => true,
		'hierarchical'      => false,
		'show_ui'           => true,
		'show_in_nav_menus' => true,
		'supports'          => array( 'title', 'editor' ),
		'has_archive'       => true,
		'rewrite'           => true,
		'query_var'         => true,
		'menu_icon'         => 'dashicons-admin-post',
		'show_in_rest'      => true,
		'rest_base'         => 'kawa',
		'rest_controller_class' => 'WP_REST_Posts_Controller',
	) );

}
add_action( 'init', 'kawa_init' );

function kawa_updated_messages( $messages ) {
	global $post;

	$permalink = get_permalink( $post );

	$messages['kawa'] = array(
		0 => '', // Unused. Messages start at index 1.
		1 => sprintf( __('Kawa updated. <a target="_blank" href="%s">View kawa</a>', 'anfrawer'), esc_url( $permalink ) ),
		2 => __('Custom field updated.', 'anfrawer'),
		3 => __('Custom field deleted.', 'anfrawer'),
		4 => __('Kawa updated.', 'anfrawer'),
		/* translators: %s: date and time of the revision */
		5 => isset($_GET['revision']) ? sprintf( __('Kawa restored to revision from %s', 'anfrawer'), wp_post_revision_title( (int) $_GET['revision'], false ) ) : false,
		6 => sprintf( __('Kawa published. <a href="%s">View kawa</a>', 'anfrawer'), esc_url( $permalink ) ),
		7 => __('Kawa saved.', 'anfrawer'),
		8 => sprintf( __('Kawa submitted. <a target="_blank" href="%s">Preview kawa</a>', 'anfrawer'), esc_url( add_query_arg( 'preview', 'true', $permalink ) ) ),
		9 => sprintf( __('Kawa scheduled for: <strong>%1$s</strong>. <a target="_blank" href="%2$s">Preview kawa</a>', 'anfrawer'),
		// translators: Publish box date format, see http://php.net/date
		date_i18n( __( 'M j, Y @ G:i' ), strtotime( $post->post_date ) ), esc_url( $permalink ) ),
		10 => sprintf( __('Kawa draft updated. <a target="_blank" href="%s">Preview kawa</a>', 'anfrawer'), esc_url( add_query_arg( 'preview', 'true', $permalink ) ) ),
	);

	return $messages;
}
add_filter( 'post_updated_messages', 'kawa_updated_messages' );
