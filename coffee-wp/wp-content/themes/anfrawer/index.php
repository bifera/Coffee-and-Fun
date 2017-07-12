<?php get_header();?>
<main>
    <section class="container main-info">
        <h1>
            Importer zielonej&nbsp;kawy
        </h1>
        <p>
            Naszą misją jest dostarczanie wysokiej jakości zielonej kawy z Afryki na rynek europejski kupowanej tak, aby każdy farmer otrzymał uczciwą zapłatę.
        </p>
        <hr />
    </section>
    <section class="container padded" id="products">
        <h2>Produkty</h2>
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
                    <?php the_content(); ?>
                    </article>
                    <?php

                    endwhile;
                    ?>
                </div>
            </div>
            <a class="wrapper-arrow" id="nextPost">&gt;</a>
        </div>
    </section>
    <section class="container gallery" id="gallery">
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
    <section class="container padded" id="about">
        <h2>O nas</h2>
        <article>
            <h3>
                W poszukiwaniu dobrej kawy
            </h3>
            <p>Jestem bezpośrednim importerem zielonej kawy z Afryki. Aby kupić jak najlepszą kawę, osobiście jadę na plantacje i tam na miejscu sprawdzam jej jakość. </p>
            <div class="paragraph-wrapper">
                <div class="paragraph-content">
                    <p>
                        Wybieram jedynie te kawy, które – choć czasem nie mają międzynarodowych certyfikatów – zawsze są uprawiane ekologicznie i w sposób zrównoważony, a lokalni rolnicy za swoją ciężką pracę otrzymują uczciwe wynagrodzenie.
                    </p>
                    <div class="image paragraph-img01" id="about-01"></div>
                </div>
                <div class="paragraph-content">
                    <p>
                        Kawy szukam w Afryce i staram się znajdować miejsca dotychczas niekojarzone z taką produkcją. Docieram do miejsc, gdzie nie trafiają kupcy z wielkich firm i właśnie tam wyszukuję najciekawsze produkty. Każdy gatunek przed zakupem spróbowałem i jestem przekonany o jego dobrej jakości.
                    </p>
                    <div class="image paragraph-img02" id="about-02"></div>
                </div>
            </div>
        </article>
                    <?php
                    $args = ['post_type' => 'miejsce'];
                    $loop = new WP_Query( $args ); 

                    while ( $loop->have_posts() ) : $loop->the_post();
                    
                    ?>
                    <article>
                    <h3>Miejsca - <?php the_title();?></h3>
                        <div class="paragraph-wrapper">
                            <div class="paragraph-content">
                                <img class="image" src="<?php the_field('wstaw_zdjecie')?>">
                                <img class="image" src="<?php the_field('wstaw_kolejne_zdjecie')?>">
                            </div>
                        </div>
                    <?php the_content(); ?>
                    </article>
                    <?php

                    endwhile;
                    ?>
    </section>
    <hr />
    <section class="container padded" id="b2b">
        <h2>B2B</h2>
        <article>
            <h3>
                Formularz kontaktowy
            </h3>
            <form>
                <div class="form-field inputs">
                    <div>
                        <label>
                            Imię i nazwisko: <br />
                            <input type="text" name="name" id="name">
                        </label>
                        <label>
                            E-mail:<br />
                            <input type="email" name="email" id="email">
                        </label>
                        <label>
                            Numer telefonu:<br />
                            <input type="text" name="phone" id="phone">
                        </label>
                    </div>
                    <div>
                        <label>
                            Wiadomość:<br />
                            <textarea name="message" id="message"></textarea>
                        </label>

                    </div>
                </div>
                <div class="form-field buttons">
                    <input type="reset" name="reset">
                    <input type="submit" name="submit">
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