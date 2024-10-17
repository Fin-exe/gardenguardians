<?php

// Flickr API configuration
$api_key = 'eecd5014501ebeeec6d473f4c8311e32';
$user_id = 'FLICKR_USER_ID'; // optional, remove if you want photos from all users
$per_page = 1; // number of photos to fetch

// Local storage configuration
$storage_dir = 'flickr_photos/';

// Ensure the storage directory exists
if (!file_exists($storage_dir)) {
    mkdir($storage_dir, 0777, true);
}

// Construct the Flickr API URL
$flickr_api_url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key={$api_key}&user_id={$user_id}&per_page={$per_page}&format=json&nojsoncallback=1";

// Fetch photos from Flickr API
$response = file_get_contents($flickr_api_url);
$data = json_decode($response, true);

if ($data['stat'] == 'ok') {
    foreach ($data['photos']['photo'] as $photo) {
        $photo_url = "https://farm{$photo['farm']}.staticflickr.com/{$photo['server']}/{$photo['id']}_{$photo['secret']}.jpg";
        $local_filename = $storage_dir . $photo['id'] . '.jpg';

        // Download the image
        $image_data = file_get_contents($photo_url);
        file_put_contents($local_filename, $image_data);

        echo "Downloaded: {$photo['id']}.jpg\n";
    }
} else {
    echo "Error: " . $data['message'];
}