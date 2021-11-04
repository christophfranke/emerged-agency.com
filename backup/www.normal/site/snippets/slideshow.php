<div class="slideshow-container">
	<ul class="slideshow">
		<?php foreach($images as $image){
			?><li><img src="<?php echo thumb($image, $dimensions)->url(); ?>"></li><?php
		} ?>
	</ul>
</div>