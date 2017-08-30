<?php $imprint = $site->page($site->imprint()); ?>
		<footer>
			<hr>
			<span class="brand">emerged agency GmbH</span>
			<span class="imprint"><a href="<?= $imprint->url() ?>"><?= $imprint->title() ?></a></span>
		</footer>
	</div>
	<?php
		echo js('/assets/src/js/dep10-jquery.js');
		echo js('/assets/src/js/dep15-lightslider.js');
		echo js('/assets/src/js/dep20-ajax.js');
		echo js('/assets/src/js/dep40-ajax-navigation.js');
		echo js('/assets/src/js/dep50-home-tiles.js');
		echo js('/assets/src/js/dep60-artist-details.js');
		echo js('/assets/src/js/dep70-deferred-images.js');
		echo js('/assets/src/js/dep80-oembed.js');
		echo js('/assets/src/js/dep85-mobile-menu.js');
		echo js('/assets/src/js/dep90-initialize.js');
		// echo js( require('main_js.php') );
	?>
</body>
</html>