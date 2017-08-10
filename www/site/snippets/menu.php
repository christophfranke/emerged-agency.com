<?php

$menu_pages = $site->children()->visible();

?>
<nav><ul>
	<?php
	foreach($menu_pages as $p){
		?><li><a href="<?php echo $p->url(); ?>"><?php echo $p->title()->html(); ?></a></li><?php
	} ?>
</ul></nav>