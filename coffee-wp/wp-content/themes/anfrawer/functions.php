<?php 

function anfrawer_filter_front_page_template( $template ) {
    return is_home() ? '' : $template;
}
add_filter( 'frontpage_template', 'anfrawer_filter_front_page_template' );


function register_my_menu() {
  register_nav_menu( 'primary', __( 'Primary Menu', 'anfrawer' ) );
}
add_action( 'after_setup_theme', 'register_my_menu' );

function register_additional_menu() {
  register_nav_menu( 'secondary', __( 'Alternative Menu', 'anfrawer' ) );
}
add_action( 'after_setup_theme', 'register_additional_menu' );

include 'post-types/kawa.php';
include 'post-types/miejsce.php';
include 'post-types/galeria.php';
include 'post-types/informacje.php';
include 'taxonomies/kraj.php';

?>