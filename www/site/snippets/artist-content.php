<?php
	$image = $page->image();
	$ratio = $image->dimensions()->ratio();
	if($ratio > 2){
		//landscape
		$image_class = 'fullwidth';
		$thumbnail_config = array(
			'width' => 1200,
		);
	}
	if($ratio <= 2 && $ratio > 1){
		//cubic
		$image_class = 'halfwidth';
		$thumbnail_config = array(
			'width' => 600,
			'height' => 500,
			'crop' => true
		);				
	}
	if($ratio <= 1){
		//portrait
		$image_class = 'halfwidth';
		$thumbnail_config = array(
			'width' => 600,
			'height' => 800,
			'crop' => true
		);		
	}
?>
<div class="artist-content">
	<h1><?php echo $page->title()->html() ?></h1>
	<img src="<?php echo thumb($page->image(), $thumbnail_config)->url(); ?>" class="<?php echo $image_class; ?>">
	<p><?php echo $page->text()->kirbytext(); ?></p>
</div>