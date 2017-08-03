<?php

/*

---------------------------------------
License Setup
---------------------------------------

Please add your license key, which you've received
via email after purchasing Kirby on http://getkirby.com/buy

It is not permitted to run a public website without a
valid license key. Please read the End User License Agreement
for more information: http://getkirby.com/license

*/

c::set('license', 'put your license key here');

/*

---------------------------------------
Kirby Configuration
---------------------------------------

By default you don't have to configure anything to
make Kirby work. For more fine-grained configuration
of the system, please check out http://getkirby.com/docs/advanced/options

*/

c::set('debug', true);


c::set('routes', array(
    array(
        'pattern' => 'oembed-proxy',
        'action' => function () {
        	$parameters = kirby()->request()->data();
        	$url = $parameters['url'];
        	$data = file_get_contents($url);

        	//find page with same id
            return response::json($data);
        }
    ),
    array(
        'pattern' => 'portfolio/letter-(:any)',
        'action' => function($letter) {
            return array('portfolio', compact('letter'));
        }
    )
));
