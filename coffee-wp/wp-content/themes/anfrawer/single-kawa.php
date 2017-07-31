<?php get_header(); ?>
<main class="wp-single-product-page">
    <nav class="return-banner">
        <a href="<?php bloginfo('url');?>"></a>
    </nav>
    <section>
        <?php

        if ( have_posts() ) :
        while ( have_posts() ) : the_post();
        $terms = wp_get_post_terms( $post->ID, 'Kraj' ); 
        ?>
        
        <article class="wp-products-posts-box">
            <h2> <?php echo $terms[0]->name; echo " "; the_title();?></h2>
            <div class="wp-products-image-content" style="background-image: url(<?php the_field('zdjecie_kawy')?>)"></div>
            <?php echo get_the_term_list($post -> ID, 'Kraj');?>
            <?php the_field('opis_kawy'); ?>
        </article>
        <?php
        endwhile;
        endif;
        ?>
    </section>
</main>
<div class="return-footer">
    <h3>
        <a href="<?php bloginfo('url');?>">Powrót do strony głównej...</a>
    </h3>
</div>