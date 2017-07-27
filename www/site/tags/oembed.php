<?php

kirbytext::$tags['oembed'] = array(
	'html' => function($tag) {
		$url = $tag->attr('oembed');
		return '<div data-oembed-url="' . $url . '"></div>';
	}
);