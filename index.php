<?php

/* Load data from data.json and save into array $products */
$products = json_decode(file_get_contents('data.json'), true);

/* add id to products */
foreach ($products as $key => $product) {
    $products[$key]['id'] = $key;
}

/* Load index.view.php */
if($_SERVER['REQUEST_URI'] === '/'){
    require 'index.view.php';
}


