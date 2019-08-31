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
define('DB_NAME', 'test_wp');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', '');

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
define('AUTH_KEY',         'O$+px?qZE9N5.HKQ@:.0hfu]~R$E530:PA*s>EiFrke|V^.b}A(ng,TY6.jA/3yr');
define('SECURE_AUTH_KEY',  '6l1KsY%|KHAq:8.p1Ozh%++eiNQ!qoVF9%j[(S#mb[h{1vgX@*^CwC6nB2Q*~H)z');
define('LOGGED_IN_KEY',    'l&{Z6bK}m_ZqBv[k]xsRV>|cGa)>y&,u~d+,z,AN&FIrAwowD<;R8*}WXi %G!~^');
define('NONCE_KEY',        '$l_B]EfYF69I.J=-1S`HlAhkocKJAjTnvl!a6VK2lj~{_40MY=:uS;<qAZF!A~,M');
define('AUTH_SALT',        'T;F[X>)ISb:4mFM]oI<7{5pi2Y.SG>jvSMf2Veie@4-tH<47(v(-NoeF^~e})V1n');
define('SECURE_AUTH_SALT', '<-(Mm 1vk`Rgx>A ETjz,WB!544FosTH$T|P0?W7Az3 s^fk< :SD/[D|g(yEpLD');
define('LOGGED_IN_SALT',   'A-f]t;ay6U6ow2%J!Yhrv>vE#pm5e* ,@Ckl|9u}DX]P=4(T+?ix3pJ;:m040d(j');
define('NONCE_SALT',       '%*?I3COj`|V&H!bw~GPDGhfyfldSCO!h}tJK8_rkWMD|~?x9K^NR4>-z`^*pq`O>');

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
