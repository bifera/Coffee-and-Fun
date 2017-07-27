<?php

function informacje_init() {
	register_post_type( 'informacje', array(
		'labels'            => array(
			'name'                => __( 'Informacje', 'anfrawer' ),
			'singular_name'       => __( 'Informacje', 'anfrawer' ),
			'all_items'           => __( 'Wszystkie informacje', 'anfrawer' ),
			'new_item'            => __( 'Nowe informacje', 'anfrawer' ),
			'add_new'             => __( 'Dodaj nowe', 'anfrawer' ),
			'add_new_item'        => __( 'Dodaj nowe informacje', 'anfrawer' ),
			'edit_item'           => __( 'Edytuj informacje', 'anfrawer' ),
			'view_item'           => __( 'Zobacz informacje', 'anfrawer' ),
			'search_items'        => __( 'Znajdź informacje', 'anfrawer' ),
			'not_found'           => __( 'Nie znaleziono informacji', 'anfrawer' ),
			'not_found_in_trash'  => __( 'Nie znaleziono informacji w folderze Kosz', 'anfrawer' ),
			'parent_item_colon'   => __( 'Nadrzędne informacje', 'anfrawer' ),
			'menu_name'           => __( 'Informacje: o nas', 'anfrawer' ),
		),
		'public'            => true,
		'hierarchical'      => false,
		'show_ui'           => true,
		'show_in_nav_menus' => true,
		'supports'          => array( 'title', 'editor' ),
		'has_archive'       => true,
		'rewrite'           => true,
		'query_var'         => true,
		'menu_icon'         => 'dashicons-info',
		'show_in_rest'      => true,
		'rest_base'         => 'informacje',
		'rest_controller_class' => 'WP_REST_Posts_Controller',
	) );

}
add_action( 'init', 'informacje_init' );

function informacje_updated_messages( $messages ) {
	global $post;

	$permalink = get_permalink( $post );

	$messages['informacje'] = array(
		0 => '', // Unused. Messages start at index 1.
		1 => sprintf( __('Informacje zaktualizowane. <a target="_blank" href="%s">Zobacz informacje</a>', 'anfrawer'), esc_url( $permalink ) ),
		2 => __('Custom field updated.', 'anfrawer'),
		3 => __('Custom field deleted.', 'anfrawer'),
		4 => __('Informacje zaktualizowane.', 'anfrawer'),
		/* translators: %s: date and time of the revision */
		5 => isset($_GET['revision']) ? sprintf( __('Informacje restored to revision from %s', 'anfrawer'), wp_post_revision_title( (int) $_GET['revision'], false ) ) : false,
		6 => sprintf( __('Informacje opublikowane. <a href="%s">Zobacz informacje</a>', 'anfrawer'), esc_url( $permalink ) ),
		7 => __('Informacje zapisane.', 'anfrawer'),
		8 => sprintf( __('Informacje wysłane. <a target="_blank" href="%s">Podgląd</a>', 'anfrawer'), esc_url( add_query_arg( 'preview', 'true', $permalink ) ) ),
		9 => sprintf( __('Informacje zaplanowane na: <strong>%1$s</strong>. <a target="_blank" href="%2$s">Podgląd</a>', 'anfrawer'),
		// translators: Publish box date format, see http://php.net/date
		date_i18n( __( 'M j, Y @ G:i' ), strtotime( $post->post_date ) ), esc_url( $permalink ) ),
		10 => sprintf( __('Szkic informacji zaktualizowany. <a target="_blank" href="%s">Podgląd</a>', 'anfrawer'), esc_url( add_query_arg( 'preview', 'true', $permalink ) ) ),
	);

	return $messages;
}
add_filter( 'post_updated_messages', 'informacje_updated_messages' );
