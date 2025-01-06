<?php

/* Load data from data.json and save into array $products */
$products = json_decode(file_get_contents('data.json'), true);

/* add id to products */
foreach ($products as $key => $product) {
    $products[$key]['id'] = $key;
}

/* write array to the HTML for JS usage*/
$data = '<script>const products = ' . json_encode($products) . ';</script>';


/* Load index.view.php */
if($_SERVER['REQUEST_URI'] === '/'){
    require 'index.view.php';
}


