<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since 1.0
 * @version 1.0
 */

get_header(); ?>
<?php

//if(!empty($_POST['save-theme-option']))
//{
//    $email = $_POST['email'];
//    $pass = $_POST['pass'];
//    // Cập nhật (nếu chưa có thì hệ thống tự thêm mới)
//    update_option('mailer_gmail_username', $email);
//    update_option('mailer_gmail_password', $pass);
//}

do_action('get_form_data');

?>
<div class="wrap">
	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

			<?php
			while ( have_posts() ) : the_post();

				get_template_part( 'template-parts/page/content', 'page' );

				// If comments are open or we have at least one comment, load up the comment template.
				if ( comments_open() || get_comments_number() ) :
					comments_template();
				endif;

			endwhile; // End of the loop.
			?>

		</main><!-- #main -->
	</div><!-- #primary -->
</div><!-- .wrap -->

    <div id="sign-form" style="width: 50%;margin-left: 178px;margin-bottom: 20px;margin-top: 0px !important;">
        <h3 style="color: orangered;">Become to our member, please fill out the form bellow:</h3>
        <form method="post" action="">
            <label>First Name</label><input type="text" name="firstname" id="firstname" value="">
            <label>Last Name</label><input type="text" name="lastname" id="lastname" value="">
            <label>Address</label><input type="text" name="address" id="address" value="">
            <label>City</label><input type="text" name="city" id="city" value="">
            <input type="submit" name="save-data" value="Submit" style="margin-top: 10px;">
        </form>
    </div>

<?php get_footer();
