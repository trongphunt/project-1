<?php
global $tweet;
?>

<div class="twitter-tweets-cell<?php $tweet->the_tweet_col(); ?> container">
	<?php $tweet->the_twitter_bird(); ?>
    <div class="twitter-tweets-tweet twitter-tweets-template-1">
        <div class="twitter-tweets-tweet-text">
            <div class="twitter-tweets-tweet-message">   
                <?php $tweet->the_tweet(); ?>
            </div>
            <a class="twitter-tweets-tweet-time" href="<?php $tweet->the_tweet_url(); ?>" rel="nofollow" <?php $tweet->the_target(); ?>><?php $tweet->the_time(); ?></a>
           	<div class="twitter-tweets-meta">
                <a class="twitter-tweets-name" href="<?php $tweet->the_author_url(); ?>" rel="nofollow" <?php $tweet->the_target(); ?>><?php $tweet->the_name(); ?></a>
                <a class="twitter-tweets-screen-name" href="<?php $tweet->the_author_url(); ?>" rel="nofollow" <?php $tweet->the_target(); ?>><?php $tweet->the_screen_name(); ?></a>
            </div>
        </div>
        <div class="twitter-tweets-actions <?php $tweet->the_actions_effect_class(); ?>">
            <?php $tweet->the_reply_action(); ?>
            <?php $tweet->the_retweet_action(); ?>
            <?php $tweet->the_favourite_action(); ?>
        </div>
    </div>
</div>