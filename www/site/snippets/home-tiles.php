<?php
	$portfolio = $site->find('/portfolio');
	$artists = $portfolio->children()->visible();
?>

<?php snippet('letter-links', compact('letter')); ?>

<div class="home-tiles">
<?php
	foreach($artists as $artist)
	{
		if($artist->hasImages()){
			$visible = true;			
			if(isset($letter) && $letter != substr($artist->uid(), 0, 1))
				$visible = false;
			snippet('home-tile', compact('artist', 'visible'));
		}
	}
?>
</div>
