<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'anfrawer');

/** MySQL database username */
define('DB_USER', 'jstnrudnicka');

/** MySQL database password */
define('DB_PASSWORD', 'pikaczu111');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '.OjY$a3suX> 5fhudeB=fxm7W7b/)o)a[(ijc/=UsQ[1neK_Iz+ETZ ^G1.mIUP`');
define('SECURE_AUTH_KEY',  '`r7MwMYa!k!*_/Jfw^?4cB`9#+_]!![E{-i6JC[OC9>HwO|%oX.^_u%zU{GRGr$V');
define('LOGGED_IN_KEY',    'aZlro+_=~~a.z<-*$-PX[GhyMtLS2W_y/Iw|G[.6%nHV&bsj8QA(-2~2/0=6f*%/');
define('NONCE_KEY',        '6+//tyI{v@-_$x/L/r@.Wy-=*C>C9}`uAS6no]eVo!8c~g?>@xK6JA7xxm7<<8*q');
define('AUTH_SALT',        '{NOKTW+-RT[;7PcCuO6Tl3t>AM(oZT=28aj[EIz)ab,_2J:3Xh,9 %`+*c`AMC#@');
define('SECURE_AUTH_SALT', '6--6c<X!Bc7q3$tB!`~lo7w;KPxFiP/gYmbESHybO,LNlp(X|#s_b^>MEIGM@p-#');
define('LOGGED_IN_SALT',   '9Q9%/GvM_~0xCd9@3pA#l#jTL2zUYN,qksNXOoXnW$SxNUA=[`X&]V+{uH(^P.^<');
define('NONCE_SALT',       '9S~{9I+L&>c)B6wk)P#7D$0zA?X3,1(W0zc~j;ffZG@@gZ[{JkBcbuZ] kei`gQ}');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
