        <div class="slider">
            <a class="wrapper-arrow" id="previousPost">&lt;</a>
            <div class="post-wrapper">
                <div class="wrapper-content">
                    <?php
                    $args = ['post_type' => 'kawa'];
                    $loop = new WP_Query( $args ); 

                    while ( $loop->have_posts() ) : $loop->the_post();

                    ?>
                    <article class="post">
                        <h3><?php the_title();?></h3>
                        <div class="post-content">
                            <div class="image-content" style="background-image: url(<?php the_field('wstaw_zdjecie')?>)"></div>
                            <?php the_content(); ?>
                        </div>
                    </article>
                    <?php
                    endwhile;
                    ?>
                </div>
            </div>
            <a class="wrapper-arrow" id="nextPost">&gt;</a>
            <div class="post-indicator" id="post-indicator"></div>
        </div>