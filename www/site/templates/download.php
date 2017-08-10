<?php snippet('header') ?>

<div class="download">
	<?php
		if(!$page->files()->empty()):
	?>
		<ul>
		<?php
		foreach($page->files() as $f){
			?><li><a href="<?php echo $f->url(); ?>" target="_blank"><?php echo $f->name(); ?> (<?php echo $f->extension(); ?>, <?php echo round($f->size()/1000); ?>k)</a></li><?php
		}
		?>
		</ul>
	<?php else: ?>
		<h1>There are currently no downloads available.</h1>
	<?php endif; ?>
</div>

<?php snippet('footer') ?>
