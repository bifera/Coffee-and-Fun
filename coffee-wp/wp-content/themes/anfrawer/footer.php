<footer class="scrolled">
    <section class="padded" id="contact">
        <h2>Kontakt</h2>
        <address>
            <p>
                <?php the_field('footer_nazwa_firmy', 86);?><br />
                <?php the_field('footer_adres_ulica', 86);?><br />
                <?php the_field('footer_adres_kod_miasto', 86);?>
            </p>
            <p>
                <a href="tel:<?php the_field('footer_telefon', 86);?>"><span class="fa fa-phone-square"></span> <?php the_field('footer_telefon', 86);?><br /></a>
                <a href="mailto:<?php the_field('footer_email', 86);?>"><span class="fa fa-envelope-square"></span> <?php the_field('footer_email', 86);?></a> <br />
                <a href="<?php the_field('footer_facebook', 86);?>" target="_blank"><span class="fa fa-facebook-square"></span> anfrawer</a>
            </p>
        </address>
    </section>
    <div>
        <div class="copyright">
            <p><?php the_field('footer_tresc_stopki', 86);?></p>
        </div>
    </div>
</footer>
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script src="<?php bloginfo('template_url')?>/js/app.js" type="text/javascript"></script>
<script src="https://use.fontawesome.com/b416a3a8ab.js"></script>
<?php wp_footer(); ?>
</body>
</html>