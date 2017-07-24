<?php get_header();?>
<main>
    <div class="fixed-nav-border arrow-up" id="arrow-up">
        <a class="arrow-up-icon" href="#start"></a>
    </div>
    <section class="padded scrolled" id="products">
        <h2>Produkty</h2>
        <div class="wp-products-posts-box">
            <?php
            $args = ['post_type' => 'kawa'];
            $loop = new WP_Query( $args ); 
            if ( $loop->have_posts() ) :
            while ( $loop->have_posts() ) : $loop->the_post();
            ?>
            <article class="wp-products-post">
                <div class="wp-products-image-content" style="background-image: url(<?php the_field('wstaw_zdjecie')?>)">
                    <div class="wp-products-image-shadow">
                        <h3>
                            <?php the_title(); ?>
                        </h3>
                    </div>
                </div>
                <p>
                    <?php $terms = wp_get_post_terms( $post->ID, 'Kraj' ); 
                    echo $terms[0]->name; 
                    ?>
                </p>
                <div class="wp-products-post-content">
                    <h3>
                        <?php echo $terms[0]->name; echo " "; the_title();?>
                    </h3>
                    <div>
                        <div class="wp-products-image-content" style="background-image: url(<?php the_field('wstaw_zdjecie')?>)"></div>
                        <?php the_content(); ?>
                    </div>
                    <hr />
                </div>
            </article>
            <?php
            endwhile;
            endif;
            ?>
        </div>
    </section>
    <div class="wp-products-popup-container" id="products-popup-box">
        <div class="wp-products-popup-content" >
            <div class="wp-products-popup-box" id="products-popup-frame">
                <div class="wp-products-popup-close" id="products-popup-close">
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    </div>
    <hr />
    <section class="gallery scrolled padded" id="gallery">
        <?php
        $args = ['post_type' => 'galeria'];
        $loop = new WP_Query( $args ); 
        if ( $loop->have_posts() ) :
        while ( $loop->have_posts() ) : $loop->the_post();
        ?>
        <div>
            <div class="wide" style="background-image: url(<?php the_field('zdjecie_1')?>)"></div>
            <div class="narrow" style="background-image: url(<?php the_field('zdjecie_2')?>)"></div>
            <div class="narrow" style="background-image: url(<?php the_field('zdjecie_3')?>)"></div>
        </div>
        <div>
            <div class="narrow" style="background-image: url(<?php the_field('zdjecie_4')?>)"></div>
            <div class="rect" style="background-image: url(<?php the_field('zdjecie_5')?>)"></div>
            <div class="rect" style="background-image: url(<?php the_field('zdjecie_6')?>)"></div>
        </div>
        <?php
        endwhile;
        endif;
        ?>
    </section>
    <hr />
    <section class="padded scrolled" id="about">
        <h2>O nas</h2>
        <article>
            <h3>
                W poszukiwaniu dobrej kawy
            </h3>
            <div class="paragraph-image-box">
                <p>
                    Jestem bezpośrednim importerem zielonej kawy z Afryki. Aby kupić jak najlepszą kawę, osobiście jadę na plantacje i tam na miejscu sprawdzam jej jakość. Wybieram jedynie te kawy, które – choć czasem nie mają międzynarodowych certyfikatów – zawsze są uprawiane ekologicznie i w sposób zrównoważony, a lokalni rolnicy za swoją ciężką pracę otrzymują uczciwe wynagrodzenie.
                </p>
                <div class="image-box paragraph-img01" id="about-01"></div>
            </div>
            <div class="paragraph-image-box">
                <p>
                    Kawy szukam w Afryce i staram się znajdować miejsca dotychczas niekojarzone z taką produkcją. Docieram do miejsc, gdzie nie trafiają kupcy z wielkich firm i właśnie tam wyszukuję najciekawsze produkty. Każdy gatunek przed zakupem spróbowałem i jestem przekonany o jego dobrej jakości.
                </p>
                <div class="image-box paragraph-img02" id="about-02"></div>
            </div>
        </article>
        <?php
        $args = ['post_type' => 'miejsce'];
        $loop = new WP_Query( $args ); 
        while ( $loop->have_posts() ) : $loop->the_post();
        ?>
        <article>
            <h3>Miejsca - <?php the_title();?></h3>
            <div class="paragraph-image-box">
                <div class="wp-places-box">
                    <?php the_content(); ?>
                    <div class="wp-places-images-box">
                        <div class="image-box" style="background-image: url(<?php the_field('wstaw_zdjecie')?>)"></div>
                        <div class="image-box" style="background-image: url(<?php the_field('wstaw_kolejne_zdjecie')?>)"></div>
                    </div>
                </div>
            </div>
        </article>
        <?php
    endwhile;
        ?>
    </section>
    <hr />
    <section class="padded scrolled" id="b2b">
        <h2>B2B</h2>
        <article>
            <h3>
                Formularz kontaktowy
            </h3>
            <form action="./contact-form/mailSender.php">
                <div class="inputs">
                    <div class="left">
                        <label>
                            Imię i nazwisko: <br />
                            <input type="text" name="name" id="name"><span class="fa fa-check-circle"></span>
                            <div class="error-message">Niepoprawne dane</div>
                        </label>
                        <label>
                            E-mail:<br />
                            <input type="email" name="email" id="email"><span class="fa fa-check-circle"></span>
                            <div class="error-message">Niepoprawny adres e-mail</div>
                        </label>
                        <label>
                            Numer telefonu:<br />
                            <input type="text" name="phone" id="phone"><span class="fa fa-check-circle"></span>
                            <div class="error-message">Niepoprawny numer telefonu</div>
                        </label>
                    </div>
                    <div class="right">
                        <label>
                            Wiadomość:<br />
                            <textarea name="message" id="message" maxlength="300"></textarea>
                            <div class="error-message">Pusta wiadomość</div>
                        </label>

                    </div>
                </div>
                <div class="sending-loader" id="sending-loader"></div>
                <div class="sending-info" id="sending-info"></div>
                <div class="buttons">
                    <div id="reset">Wyczyść</div>
                    <div id="submit">Wyślij</div>
                </div>
            </form>
            <div class="paragraph-wrapper">
                <div class="paragraph-content">
                    <div class="image paragraph-img05"></div>
                    <div class="image paragraph-img06"></div>
                </div>
            </div>
        </article>
    </section>
</main>
<hr />
<?php get_footer(); ?>