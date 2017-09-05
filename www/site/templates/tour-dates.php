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
	$url = $page->location();
	$cache_time_in_seconds = 60*$page->cachetime()->value();
	$content = getCached($url, $cache_time_in_seconds);
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
		{ ?>
			<?php
			$slug = str_replace(' ','-', strtolower($artist));
			$slug = str_replace("'", '', $slug);
			$slug = str_replace('!', '', $slug);
			$slug = str_replace('$', '', $slug);
			$slug = str_replace('.', '', $slug);
			$slug = str_replace('-&-', '-', $slug);
			$artist_page = $site->find('/portfolio')->find($slug);
			$i = 0;
			while($artist_page !== false && $artist_page->intendedTemplate() == 'redirect'){
				$artist_page = $site->find($artist_page->target());
				// little guard so we don't break down here
				$i++;
				if($i > 100)
					break;
			}
			if($artist_page !== false){
				$image = $artist_page->image()->thumb($dimensions);
				$h3 = '<h3 class="artist_name"><a href="' . $artist_page->url() . '">' . $artist . '</a></h3>';
			}
			else{
				$image = '';
				$h3 = '<h3 class="artist_name">' . $artist . '</h3>';
			}
			?>
			<div class="artist">
				<?= $h3 ?>
				<?php echo $image; ?>
				<table><?php
			foreach($shows as $show)
			{
				if( !is_string($show->Date) or !is_string($show->Venue) )
					continue;

				if(is_string($show->TicketUrl)){
					$ticket_url = '<a class="ticket-link" href="' . $show->TicketUrl . '" target="_blank">Get Ticket</a>';
				}
				else{
					$ticket_url = '';
				}
				$european_date = date('d.m.Y', strtotime($show->Date));
				if(is_string($show->City)){
					$city = $show->City;
				}
				else{
					$city = '';
				}

				?>
					<tr>
						<td class="date"><?= $european_date ?></td>
						<td class="city"><?= $city ?></td>
						<td class="venue"><?= $show->Venue; ?></td>
						<td class="ticket-link"><?= $ticket_url ?></td>
					</tr>
			<?php } ?>
				</table>
		</div>
		<?php } ?>
	</div>

</div>

<?php snippet('footer'); ?>