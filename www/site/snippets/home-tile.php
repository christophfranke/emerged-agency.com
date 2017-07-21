<?php

$thumbnail_config = array(
	"width" => 250,
	"height" => 250,
	"crop" => true
);

$letter = substr($artist->uid(), 0, 1);
?>
<div class="home-tile letter-<?php echo $letter; ?> visible">
	<a href="<?php echo url($artist); ?>">
		<?php echo thumb($artist->image(), $thumbnail_config); ?>
		<span class="artist-name label"><?php echo $artist->title()->html(); ?></span>
		<span class="artist-name overlay"><h2><?php echo $artist->title()->html(); ?></h2></span>
	</a>
</div>