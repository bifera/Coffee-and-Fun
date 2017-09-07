<footer class="scrolled">
    <section class="padded" id="contact">
        <h2>Contact</h2>
        <address>
            <p>
                <?php the_field('footer_nazwa_firmy', 6);?><br />
                <?php the_field('footer_adres_ulica', 6);?><br />
                <?php the_field('footer_adres_kod_miasto', 6);?>
            </p>
            <p>
                <a href="tel:<?php the_field('footer_telefon', 6);?>"><span class="fa fa-phone-square"></span> <?php the_field('footer_telefon', 6);?><br /></a>
                <a href="mailto:<?php the_field('footer_email', 6);?>"><span class="fa fa-envelope-square"></span> <?php the_field('footer_email', 6);?></a> <br />
                <a href="<?php the_field('footer_facebook', 6);?>" target="_blank"><span class="fa fa-facebook-square"></span> anfrawer</a>
            </p>
        </address>
    </section>
    <div>
        <div class="copyright">
            <p>Anfrawer - Coffee and Cocoa Trade &#8226; Bartosz Bielicki ul. Lądecka 3 &#8226; 60-464 Poznań &copy;&nbsp;2016-2017 Anfrawer</p>
        </div>
    </div>
</footer>
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script src="<?php bloginfo('template_url')?>/js/app.js" type="text/javascript"></script>
<script src="https://use.fontawesome.com/b416a3a8ab.js"></script>
<?php wp_footer(); ?>
</body>
</html>