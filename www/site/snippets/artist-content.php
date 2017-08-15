<?php
	$image = $page->images()->findBy('sort', '1');
	if($image === null)
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

	$filterby = 'letter-' . substr($page->uid(), 0, 1);
	$letter_url = url('/portfolio/' . $filterby);
?>
<div class="artist-content">
	<h1><?php echo $page->title()->html() ?></h1>
	<a href="<?php echo $letter_url; ?>" class="close" data-ajax-navigation><i class="fa fa-times" aria-hidden="true"></i></a>
	<hr>
	<?php if( sizeof($page->images()) == 1 ){
		?><img src="<?php echo thumb($page->image(), $thumbnail_config)->url(); ?>" class="<?php echo $image_class; ?>"><?php
	}
	else{
		snippet('slideshow', array('images' => $page->images()->sortBy('sort'), 'dimensions' => $thumbnail_config));
	} ?>
	<p><?php echo $page->text()->kirbytext(); ?></p>
	<div class="artist-footer">
		<?php if($page->prev()): ?>
		<a href="<?php echo $page->prev()->url(); ?>" data-ajax-navigation class="arrow left">
			<i class="fa fa-chevron-left" aria-hidden="true"></i> <?php echo $page->prev()->title(); ?>
		</a>
		<?php endif; ?>
		<?php if($page->next()): ?>
		<a href="<?php echo $page->next()->url(); ?>" data-ajax-navigation class="arrow right">
			<?php echo $page->next()->title(); ?> <i class="fa fa-chevron-right" aria-hidden="true"></i>
		</a>
		<?php endif; ?>
	</div>
</div>