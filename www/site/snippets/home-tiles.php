<?php
	$portfolio = $site->find('/portfolio');
	$artists = $portfolio->children();

	$letters = array('all');
	foreach($artists as $artist){
		$letter = substr($artist->uid(), 0, 1);
		if(!in_array($letter, $letters))
			$letters[] = $letter;
	}
?>
<div class="letter-links">
<?php
	$extra_class = ' active';
	foreach($letters as $letter){
		echo '<a href="#" class="link-' . $letter . $extra_class . '">' . ucfirst($letter) . '</a>';
		$extra_class = '';
	}
?>
</div>

<div class="home-tiles">
<?php
	foreach($artists as $artist)
	{
		if($artist->hasImages())
			snippet('home-tile', compact('artist'));
	}
?>
</div>
