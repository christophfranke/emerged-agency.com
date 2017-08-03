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
		<?php
			snippet('logo');
			snippet('menu');
		?>
		<hr>
	</header>
