<?php

$menu_pages = $site->children()->visible();

?>
<nav class="<?php echo $menu_class; ?>">
	<hr class="only-mobile top-rule">
	<ul>
		<?php
		foreach($menu_pages as $p){
			?><li><a href="<?php echo $p->url(); ?>"><?php echo $p->title()->html(); ?></a></li><?php
		} ?>
		<li class="only-desktop"><a href="<?= $site->facebook() ?>" class="social facebook" target="_blank"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
		<li class="only-desktop"><a href="<?= $site->soundcloud() ?>" class="social soundcloud" target="_blank"><i class="fa fa-soundcloud" aria-hidden="true"></i></a></li>
		<li class="only-desktop"><a href="<?= $site->instagram() ?>" class="social instagram" target="_blank"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
		<li class="only-mobile"><a href="<?= $site->facebook() ?>" class="social facebook" target="_blank">Facebook</a></li>
		<li class="only-mobile"><a href="<?= $site->soundcloud() ?>" class="social soundcloud" target="_blank">Soundcloud</a></li>
		<li class="only-mobile"><a href="<?= $site->instagram() ?>" class="social instagram" target="_blank">Instagram</a></li>
	</ul>
	<hr class="only-mobile bottom-rule">
</nav>