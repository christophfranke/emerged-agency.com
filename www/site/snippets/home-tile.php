<?php

$thumbnail_config = array(
	"width" => 250,
	"height" => 250,
	"crop" => true
);

$letter = substr($artist->uid(), 0, 1);
$image = $artist->images()->findBy('sort', '1');
if($image === null)
	$image = $artist->image();

if(@$visible === false)
	$visible_class = '';
else
	$visible_class = 'visible';
?>
<div class="home-tile letter-<?php echo $letter; ?> <?php echo $visible_class; ?>">
	<a href="<?php echo url($artist); ?>" data-ajax-navigation>
		<noscript>
			<?php echo thumb($image, $thumbnail_config); ?>
		</noscript>
		<img data-img-src="<?php echo thumb($image, $thumbnail_config)->url();?>" width="250" height="250" class="image-preview" <?php if($visible !== false) echo 'data-img-priority="1"'; ?>>
		<span class="artist-name label"><?php echo $artist->title()->html(); ?></span>
		<span class="artist-name overlay"><h2><?php echo $artist->title()->html(); ?></h2></span>
	</a>
</div>