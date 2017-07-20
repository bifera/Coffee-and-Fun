<?php

function Kraj_init() {
	register_taxonomy( 'Kraj', array( 'kawa' ), array(
		'hierarchical'      => true,
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
			'name'                       => __( 'Kraje', 'anfrawer' ),
			'singular_name'              => _x( 'Kraj', 'taxonomy general name', 'anfrawer' ),
			'search_items'               => __( 'Znajdź kraj', 'anfrawer' ),
			'popular_items'              => __( 'Popularne kraje', 'anfrawer' ),
			'all_items'                  => __( 'Wszystkie kraje', 'anfrawer' ),
			'parent_item'                => __( 'Nadrzędny kraj', 'anfrawer' ),
			'parent_item_colon'          => __( 'Nadrzędny kraj:', 'anfrawer' ),
			'edit_item'                  => __( 'Edytuj kraj', 'anfrawer' ),
			'update_item'                => __( 'Zaktualizuj kraj', 'anfrawer' ),
			'add_new_item'               => __( 'Nowy kraj', 'anfrawer' ),
			'new_item_name'              => __( 'Nowy kraj', 'anfrawer' ),
			'separate_items_with_commas' => __( 'Oddzielaj kraje przecinkami', 'anfrawer' ),
			'add_or_remove_items'        => __( 'Dodaj lub usuń kraje', 'anfrawer' ),
			'choose_from_most_used'      => __( 'Wybierz z najczęściej używanych krajów', 'anfrawer' ),
			'not_found'                  => __( 'Nie znaleziono krajów.', 'anfrawer' ),
			'menu_name'                  => __( 'Kraje', 'anfrawer' ),
		),
		'show_in_rest'      => true,
		'rest_base'         => 'Kraj',
		'rest_controller_class' => 'WP_REST_Terms_Controller',
	) );

}
add_action( 'init', 'Kraj_init' );
