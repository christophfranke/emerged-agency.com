<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">

    <title><?php echo $site->title()->html() ?> | <?php echo $page->title()->html() ?></title>

    <?php echo css('assets/plugins/embed/css/embed.css'); ?>
    <?php echo js('assets/plugins/embed/js/embed.js'); ?>

    <?php echo css( include('style_css.php') ); ?>
</head>
<body>
