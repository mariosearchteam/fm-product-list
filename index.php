<?php

/* Load data from data.json and save into array $products */
$products = json_decode(file_get_contents('data.json'), true);

/* Load index.view.php */
if($_SERVER['REQUEST_URI'] === '/'){
    require 'index.view.php';
}


