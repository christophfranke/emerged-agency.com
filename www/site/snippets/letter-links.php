<?php
	$portfolio = $site->find('/portfolio');
	$artists = $portfolio->children()->visible();

	$letters = array('all');
	foreach($artists as $artist){
		$first_letter = substr($artist->uid(), 0, 1);
		if(!in_array($first_letter, $letters))
			$letters[] = $first_letter;
	}

	$active_letter = 'all';
	if(isset($letter))
		$active_letter = $letter;
?>
<div class="letter-links">
<?php
	foreach($letters as $letter){
		if($letter == $active_letter)
			$extra_class = ' active';
		else
			$extra_class = '';
		$filterby = "letter-$letter";
		if($filterby == "letter-all")
			$filterby = "";
		$letter_url = url('/portfolio/' . $filterby);
		echo '<a href="'. $letter_url . '" class="link-' . $letter . $extra_class . '" data-filterby="' . $filterby . '" data-close-artist-details>' . ucfirst($letter) . '</a>';
	}
?>
</div>