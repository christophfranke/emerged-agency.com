<?php

kirbytext::$tags['email'] = array(
	'html' => function($tag) {
		$email = str_rot13($tag->attr('email'));
		return '<a data-rotation="' . $email . '" class="rotate"></a>';
	}
);