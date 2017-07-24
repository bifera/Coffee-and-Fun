<?php

function galeria_init() {
	register_post_type( 'galeria', array(
		'labels'            => array(
			'name'                => __( 'Galerie', 'anfrawer' ),
			'singular_name'       => __( 'Galeria', 'anfrawer' ),
			'all_items'           => __( 'Wszystkie galerie', 'anfrawer' ),
			'new_item'            => __( 'Nowa galeria', 'anfrawer' ),
			'add_new'             => __( 'Dodaj nową', 'anfrawer' ),
			'add_new_item'        => __( 'Dodaj nową galerię', 'anfrawer' ),
			'edit_item'           => __( 'Edytuj galerię', 'anfrawer' ),
			'view_item'           => __( 'Zobacz galerię', 'anfrawer' ),
			'search_items'        => __( 'Znajdź galerię', 'anfrawer' ),
			'not_found'           => __( 'Nie znaleziono galerii', 'anfrawer' ),
			'not_found_in_trash'  => __( 'Nie znaleziono galerii w folderze Kosz', 'anfrawer' ),
			'parent_item_colon'   => __( 'Galeria nadrzędna', 'anfrawer' ),
			'menu_name'           => __( 'Galerie', 'anfrawer' ),
		),
		'public'            => true,
		'hierarchical'      => false,
		'show_ui'           => true,
		'show_in_nav_menus' => true,
		'supports'          => array( 'title', 'editor' ),
		'has_archive'       => true,
		'rewrite'           => true,
		'query_var'         => true,
		'menu_icon'         => 'dashicons-images-alt',
		'show_in_rest'      => true,
		'rest_base'         => 'galeria',
		'rest_controller_class' => 'WP_REST_Posts_Controller',
	) );

}
add_action( 'init', 'galeria_init' );

function galeria_updated_messages( $messages ) {
	global $post;

	$permalink = get_permalink( $post );

	$messages['galeria'] = array(
		0 => '', // Unused. Messages start at index 1.
		1 => sprintf( __('Galeria zaktualizowana. <a target="_blank" href="%s">View galeria</a>', 'anfrawer'), esc_url( $permalink ) ),
		2 => __('Custom field updated.', 'anfrawer'),
		3 => __('Custom field deleted.', 'anfrawer'),
		4 => __('Galeria zaktualizowana.', 'anfrawer'),
		/* translators: %s: date and time of the revision */
		5 => isset($_GET['revision']) ? sprintf( __('Galeria restored to revision from %s', 'anfrawer'), wp_post_revision_title( (int) $_GET['revision'], false ) ) : false,
		6 => sprintf( __('Galeria opublikowana. <a href="%s">View galeria</a>', 'anfrawer'), esc_url( $permalink ) ),
		7 => __('Galeria saved.', 'anfrawer'),
		8 => sprintf( __('Galeria wysłana. <a target="_blank" href="%s">Preview galeria</a>', 'anfrawer'), esc_url( add_query_arg( 'preview', 'true', $permalink ) ) ),
		9 => sprintf( __('Galeria zaplanowana na: <strong>%1$s</strong>. <a target="_blank" href="%2$s">Preview galeria</a>', 'anfrawer'),
		// translators: Publish box date format, see http://php.net/date
		date_i18n( __( 'M j, Y @ G:i' ), strtotime( $post->post_date ) ), esc_url( $permalink ) ),
		10 => sprintf( __('Szkic galerii uaktualniony. <a target="_blank" href="%s">Preview galeria</a>', 'anfrawer'), esc_url( add_query_arg( 'preview', 'true', $permalink ) ) ),
	);

	return $messages;
}
add_filter( 'post_updated_messages', 'galeria_updated_messages' );
