<!-- THIS PHP SCRIPT WAS USED, BY CHANGING TAGS IN $URL TO RETRIEVE THE PLANT PHOTOS -->

<!-- This code snippet was retrived from: https://www.youtube.com/watch?v=bnoioPO2A2U, only the tags field was changed in $url -->
<?php
$api_key = 'eecd5014501ebeeec6d473f4c8311e32';

$url = 'https://www.flickr.com/services/feeds/photos_public.gne?format=php_serial&tags=flower&per_page=1';

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