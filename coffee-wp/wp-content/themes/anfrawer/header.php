<!doctype html>
<html lang="pl">
    <head>
        <meta charset="<?php bloginfo('charset'); ?>">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title><?php bloginfo('name'); ?></title>
        <link rel="stylesheet" type="text/css" href="<?php bloginfo('stylesheet_url') ?>">
        <link href="https://fonts.googleapis.com/css?family=Oswald:500|PT+Sans" rel="stylesheet">
        <?php wp_head(); ?>
    </head>
    <body>
        <div class="up fixed-bottom" id="arrow-up"><a class="fa fa-arrow-circle-up" href="#"></a></div>
        <header id="start">
            <nav>
                <div class="menu-bar shadow-bar" id="menu-bar">
                    <div class="mobile-active"  id="menu-background"></div>
                    <div class="container mobile-display">
                        <span class="fa fa-bars" id="menu-toggle"></span>
                        <ul class="menu" id="menu-content">
                            <li>
                                <a class="middle-out-underline" href="#start">Strona główna</a>
                            </li>
                            <li>
                                <a class="middle-out-underline" href="#products">Produkty</a>
                            </li>
                            <li>
                                <a class="middle-out-underline" href="#about">O nas</a>
                            </li>
                            <li>
                                <a class="middle-out-underline" href="#b2b">B2B</a>
                            </li>
                            <li>
                                <a class="middle-out-underline" href="#contact">Kontakt</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <a class="logo" href="#"></a>
            </nav>
        </header>