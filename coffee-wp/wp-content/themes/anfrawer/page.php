<?php get_header();?>
<header id="start">
    <div></div>
    <nav>
        <a href="http://localhost/coffee-and-Fun/coffee-wp/" id="logo" tabindex="-1"></a>
        <div id="menu-bar">
            <div class="menu-container" id="menu-container">
                <div class="fixed-nav-border">
                    <div class="mobile-menu-icon" id="menu-toggle">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <a href="#start" id="logo-sticky"></a>
                <?php wp_nav_menu('secondary'); ?>
            </div>
        </div>
    </nav>
    <section>
        <h1>
            Błąd 404 - podana strona nie istnieje.
        </h1>
        <p>
            Przepraszamy - podana strona nie istnieje.
            <a class="error-404" href="www.anfrawer.pl" id="logo" tabindex="-1">Przejdź do strony głównej.</a>
        </p>
        <hr />
    </section>
</header>
<?php get_footer(); ?>