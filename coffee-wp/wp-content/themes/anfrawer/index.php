<?php get_header();?>
<main>
    <div class="fixed-nav-border arrow-up" id="arrow-up">
        <a class="arrow-up-icon" href="#start"></a>
    </div>
    <section class="container padded scrolled" id="products">
        <h2>Produkty</h2>

        <div class="wp-products-box">
            <h3>Afryka - Kamerun</h3>
            <div class="products-posts-box">
                <?php
                $args = ['post_type' => 'kawa'];
                $loop = new WP_Query( $args ); 

                while ( $loop->have_posts() ) : $loop->the_post();

                ?>
                <article class="products-post">
                    <div class="products-image-content" style="background-image: url(<?php the_field('wstaw_zdjecie')?>)"></div>
                    <h4><?php the_title();?></h4>
                    <div class="products-post-content">
                        <h4><?php the_title();?></h4>
                        <div class="mobile-landscape-wrapper">
                            <div class="products-image-content" style="background-image: url(<?php the_field('wstaw_zdjecie')?>)"></div>
                            <?php the_content(); ?>
                        </div>
                        <hr />
                    </div>
                </article>
                <?php
                endwhile;
                ?>
            </div>
        </div>
    </section>
    <div class="products-popup-box" id="products-popup-box">
        <div class="products-popup-content" >
            <div class="products-popup-frame" id="products-popup-frame">
                <div class="products-popup-close" id="products-popup-close">
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    </div>
    <section class="container gallery scrolled" id="gallery">
        <div class="row">
            <div class="wide gallery-img01"></div>
            <div class="narrow gallery-img02"></div>
            <div class="narrow gallery-img03"></div>
        </div>
        <div class="row">
            <div class="narrow gallery-img04"></div>
            <div class="rect gallery-img05"></div>
            <div class="rect gallery-img06"></div>
        </div>
    </section>
    <hr />
    <section class="container padded scrolled" id="about">
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
                        <img src="<?php the_field('wstaw_zdjecie')?>" class="image-box">
                        <img src="<?php the_field('wstaw_kolejne_zdjecie')?>" class="image-box">
                    </div>
                </div>
            </div>
        </article>
        <?php
    endwhile;
        ?>
    </section>
    <section class="container padded scrolled" id="b2b">
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
<!--
<aside>
<p>
</p>
</aside>
<hr />
-->
<?php get_footer(); ?>