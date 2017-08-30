<?php

kirbytext::$tags['oembed'] = array(
	'html' => function($tag) {
		$url = $tag->attr('oembed');
		$class = $tag->attr('class');
		return '<div data-oembed-url="' . $url . '" class="oembed ' . $class . '"></div>';
	}
);