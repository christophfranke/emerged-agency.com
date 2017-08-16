<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">

    <title><?php echo $site->title()->html() ?> | <?php echo $page->title()->html() ?></title>

    <?php echo css( include('style_css.php') ); ?>
</head>
<body>
<script>
document.body.className = 'js-enabled';
</script>
	<div class="container">
	<header>
		<?php snippet('logo'); ?>
		<div class="mobile-menu-button"><i class="fa fa-bars" aria-hidden="true"></i></div>
		<?php snippet('menu', array('menu_class' => 'main-menu')); ?>
		<hr>
		<?php snippet('menu', array('menu_class' => 'mobile-menu')); ?>
	</header>
