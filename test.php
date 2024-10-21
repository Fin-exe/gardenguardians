<?php
// Flickr API configuration
//We an interactive and engaging educational website that educates children about the “Native Plants of Australia” as a part of Brisbane City Council’s Free Native Plants Program. 
//In a world of climate change, it is imperative to start introducing the next generation to be consciously aware and caring for their surroundings.
$api_key = 'eecd5014501ebeeec6d473f4c8311e32';

$url = 'https://www.flickr.com/services/feeds/photos_public.gne?format=php_serial&tags=cutleafdaisy&per_page=1';

$data = file_get_contents($url);
print_r($data);

exit;

$photos = $data->photos->photo;

foreach ($photos as $photo) {
    $url = 'https://farm'.$photo->farm.'.staticflickr.com/'.$photo->server.'/'.$photo->id.'_'.$photo->secret.'.jpg';
    echo '<img src="'.$url. '">';
    print_r($photo);
    break;
}
?>