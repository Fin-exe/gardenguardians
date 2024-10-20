<?php
// // Flickr API configuration
// $api_key = 'eecd5014501ebeeec6d473f4c8311e32';

// $url = 'https://www.flickr.com/services/feeds/photos_public.gne?format=php_serial&tags=cutleafdaisy&per_page=1';

// $data = file_get_contents($url);
// print_r($data);

// exit;

// $photos = $data->photos->photo;
// foreach ($photos as $photo) {
//     $url = 'https://farm'.$photo->farm.'.staticflickr.com/'.$photo->server.'/'.$photo->id.'_'.$photo->secret.'.jpg';
//     echo '<img src="'.$url. '">';
//     print_r($photo);
//     break;
// }

header('Content-Type: application/json');

// Flickr API configuration
$api_key = 'eecd5014501ebeeec6d473f4c8311e32';
$per_page = 1; // We only need one photo

// Construct the Flickr API URL
$flickr_api_url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key={$api_key}&per_page={$per_page}&format=json&nojsoncallback=1";

// Fetch photos from Flickr API
$response = file_get_contents($flickr_api_url);
$data = json_decode($response, true);

if ($data['stat'] == 'ok' && !empty($data['photos']['photo'])) {
    $photo = $data['photos']['photo'][0];
    $photo_url = "https://farm{$photo['farm']}.staticflickr.com/{$photo['server']}/{$photo['id']}_{$photo['secret']}.jpg";
    
    echo json_encode(['url' => $photo_url]);
} else {
    echo json_encode(['error' => 'No photos found or API error']);
}

?>