<?php

$dimensions = array(
	'width' => 100,
	'height' => 100,
	'crop' => true
)

?>

<?php snippet('header'); ?>


<div class="tour-dates">
	<?php
	$url = "http://client.systemonesoftware.com/emerged/xml";
	$one_day_in_seconds = 60*60*24;
	$content = getCached($url, $one_day_in_seconds); //expires once a day
	$xml = simplexml_load_string($content);
	$json = json_encode($xml);
	$obj = json_decode($json);
	//we need to rearrange the array to get the artist sorted out
	$artists = array();
	foreach($obj->show as $show)
	{
		$artists[$show->Artist][] = $show;
	}
	ksort($artists);
	?>
	<div class="schedule">
		<?php foreach($artists as $artist=>$shows)
		{
			echo '<div class="artist">';
			$slug = str_replace(' ','-', strtolower($artist));
			$slug = str_replace("'", '', $slug);
			$slug = str_replace('!', '', $slug);
			$slug = str_replace('$', '', $slug);
			$slug = str_replace('.', '', $slug);
			$slug = str_replace('-&-', '-', $slug);
			$artist_page = $site->find('/portfolio')->find($slug);
			if($artist_page !== false){
				$image = $artist_page->image()->thumb($dimensions);
				echo '<h3 class="artist_name"><a href="' . $artist_page->url() . '">' . $artist_page->title() . '</a></h3>';
			}
			else{
				$image = '';
				echo '<h3 class="artist_name">' . $artist . '</h3>';
			}
			echo '<table>';
			foreach($shows as $show)
			{
				// if( !is_string($show->Date) or !is_string($show->City) or !is_string($show->Venue) )
				if( !is_string($show->Date) or !is_string($show->Venue) )
					continue;

				if(is_string($show->TicketUrl)){
					$ticket_url = '<a class="ticket-link" href="' . $show->TicketUrl . '" target="_blank">Get Ticket</a>';
				}
				else{
					$ticket_url = '';
				}
				$european_date = date('d.m.Y', strtotime($show->Date));

				echo "<tr>";
				// echo '<td class="image">' . $image . '</td>';
				echo '<td class="date">' . $european_date . '</td>';
				if(is_string($show->City))
					echo '<td class="city">' . $show->City . '</td>';
				else
					echo '<td class="empty city"></td>';
				echo '<td class="venue">' . $show->Venue . '</td>';
				echo '<td class="ticket-link">' . "$ticket_url</td>";
				echo "</tr>";
			}
			echo "</table></div>";
		}
		?>
	</div>

	<?php
	/*
	foreach($array->show as $show)
		var_dump($show);
	*/
	?>
</div>

<?php snippet('footer'); ?>