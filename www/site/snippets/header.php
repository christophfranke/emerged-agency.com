<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">

    <title><?php echo $site->title()->html() ?> | <?php echo $page->title()->html() ?></title>


	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
	<link rel="manifest" href="/manifest.json">
	<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000">
	<meta name="theme-color" content="#ffffff">

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
		<?php snippet('menu', array('menu_class' => 'desktop-menu')); ?>
		<hr>
		<?php snippet('menu', array('menu_class' => 'mobile-menu')); ?>
	</header>
