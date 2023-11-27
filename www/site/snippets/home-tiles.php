<?php
	$portfolio = $site->find('/portfolio');
	$artists = $portfolio->children()->visible()->filter(function($elem){
		return ($elem->image() != null) && ($elem->intendedTemplate() == 'artist');
	});
?>

<?php snippet('letter-links', compact('letter')); ?>

<div class="home-tiles">
<?php
	foreach($artists as $artist)
	{
		if($artist->hasImages()){
			$visible = true;			
			if(!empty($letter) && $letter != substr($artist->uid(), 0, 1))
				$visible = false;
			snippet('home-tile', compact('artist', 'visible'));
		}
	}
?>
	<div class="artist-details">
		<?php if(isset($include_artist_content) && $include_artist_content === true) snippet('artist-content') ?>
	</div>
</div>
