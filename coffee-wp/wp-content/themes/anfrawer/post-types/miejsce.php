<?php

function miejsce_init() {
	register_post_type( 'miejsce', array(
		'labels'            => array(
			'name'                => __( 'Miejsca', 'anfrawer' ),
			'singular_name'       => __( 'Miejsce', 'anfrawer' ),
			'all_items'           => __( 'Wszystkie miejsca', 'anfrawer' ),
			'new_item'            => __( 'Nowe miejsce', 'anfrawer' ),
			'add_new'             => __( 'Dodaj nowe', 'anfrawer' ),
			'add_new_item'        => __( 'Dodaj nowe miejsce', 'anfrawer' ),
			'edit_item'           => __( 'Edytuj miejsce', 'anfrawer' ),
			'view_item'           => __( 'Zobacz miejsce', 'anfrawer' ),
			'search_items'        => __( 'Znajdź miejsca', 'anfrawer' ),
			'not_found'           => __( 'Nie znaleziono żadnych miejsc', 'anfrawer' ),
			'not_found_in_trash'  => __( 'Nie znaleziono żadnych miejsc w folderze Kosz', 'anfrawer' ),
			'parent_item_colon'   => __( 'Nadrzędne miejsce', 'anfrawer' ),
			'menu_name'           => __( 'Miejsca', 'anfrawer' ),
		),
		'public'            => true,
		'hierarchical'      => false,
		'show_ui'           => true,
		'show_in_nav_menus' => true,
		'supports'          => array( 'title', 'editor' ),
		'has_archive'       => true,
		'rewrite'           => true,
		'query_var'         => true,
		'menu_icon'         => 'dashicons-palmtree',
		'show_in_rest'      => true,
		'rest_base'         => 'miejsce',
		'rest_controller_class' => 'WP_REST_Posts_Controller',
	) );

}
add_action( 'init', 'miejsce_init' );

function miejsce_updated_messages( $messages ) {
	global $post;

	$permalink = get_permalink( $post );

	$messages['miejsce'] = array(
		0 => '', // Unused. Messages start at index 1.
		1 => sprintf( __('Miejsce zaktualizowane. <a target="_blank" href="%s">View miejsce</a>', 'anfrawer'), esc_url( $permalink ) ),
		2 => __('Custom field updated.', 'anfrawer'),
		3 => __('Custom field deleted.', 'anfrawer'),
		4 => __('Miejsce zaktualizowane.', 'anfrawer'),
		/* translators: %s: date and time of the revision */
		5 => isset($_GET['revision']) ? sprintf( __('Miejsce restored to revision from %s', 'anfrawer'), wp_post_revision_title( (int) $_GET['revision'], false ) ) : false,
		6 => sprintf( __('Miejsce opublikowane. <a href="%s">View miejsce</a>', 'anfrawer'), esc_url( $permalink ) ),
		7 => __('Miejsce saved.', 'anfrawer'),
		8 => sprintf( __('Miejsce wysłane. <a target="_blank" href="%s">Preview miejsce</a>', 'anfrawer'), esc_url( add_query_arg( 'preview', 'true', $permalink ) ) ),
		9 => sprintf( __('Miejsce scheduled for: <strong>%1$s</strong>. <a target="_blank" href="%2$s">Podgląd</a>', 'anfrawer'),
		// translators: Publish box date format, see http://php.net/date
		date_i18n( __( 'M j, Y @ G:i' ), strtotime( $post->post_date ) ), esc_url( $permalink ) ),
		10 => sprintf( __('Szkic miejsca zaktualizowany. <a target="_blank" href="%s">Podgląd</a>', 'anfrawer'), esc_url( add_query_arg( 'preview', 'true', $permalink ) ) ),
	);

	return $messages;
}
add_filter( 'post_updated_messages', 'miejsce_updated_messages' );
