<?php

$portfolio = $site->find('/portfolio');
$artists = $portfolio->children();

?>
<?php snippet('header') ?>

<div class="home-tiles">
<?php
	foreach($artists as $artist)
	{
		if($artist->hasImages())
			snippet('home-tile', compact('artist'));
	}
?>
</div>

<?php snippet('footer') ?>