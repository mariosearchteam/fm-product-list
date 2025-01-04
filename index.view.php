<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- displays site properly based on user's device -->

  <link rel="icon" type="image/png" sizes="32x32" href="./assets/images/favicon-32x32.png">
  
  <title>Frontend Mentor | Product list with cart</title>

 <link rel="stylesheet" href="styles.css">
</head>
<body>
<main class="main">
    <header class="text-preset-1">Desserts</header>
    <div class="container">
        <div class="products">
            <?php foreach ($products as $product) : ?>
                <div class="product" data-id="<?= $product['id'] ?>">
                    <picture>
                        <source srcset="<?= $product['image']['mobile'] ?>" type="image/webp">
                        <img src="<?= $product['image']['mobile'] ?>" alt="<?= $product['name'] ?>">
                    </picture>
                    <button class="button text-preset-4 bold addToCart" data-id="<?= $product['id'] ?>"><svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clip-path="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg>  Add to Cart</button>
                    <div class="quantity-container" data-id="<?= $product['id'] ?>" style="display: none;">
                        <button class="quantity-control decrease" data-action="decrease">-</button>
                        <input type="number" class="quantity-input" id="quantity1" value="1" min="1" />
                        <button class="quantity-control increase" data-action="increase">+</button>
                    </div>                    
                    <p class="product__category text-preset-4"><?= $product['category'] ?></p>
                    <h2 class="text-preset-3"><?= $product['name'] ?></h2>
                    <p class="product__price text-preset-3">$<span><?= $product['price'] ?></span></p>
                </div>
                <?php endforeach; ?>
            
        </div>
        <div class="wrapper">
            <div class="cart">
                <h2 class="text-preset-2">Your Cart (<span class="cartCount">0</span>)</h2>
                <div class="cart__items">
                    <!-- Cart items will be appended here -->
            
                </div>
                <div class="cart__total">
                    <p class="text-preset-4">Order Total</p>
                    <p class="text-preset-2">$<span class="total">0</span></p>
                </div>
                <div class="cart__cta text-preset-4">
                    <p><svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><path fill="#1EA575" d="M8 18.75H6.125V17.5H8V9.729L5.803 8.41l.644-1.072 2.196 1.318a1.256 1.256 0 0 1 .607 1.072V17.5A1.25 1.25 0 0 1 8 18.75Z"/><path fill="#1EA575" d="M14.25 18.75h-1.875a1.25 1.25 0 0 1-1.25-1.25v-6.875h3.75a2.498 2.498 0 0 0 2.488-2.747 2.594 2.594 0 0 0-2.622-2.253h-.99l-.11-.487C13.283 3.56 11.769 2.5 9.875 2.5a3.762 3.762 0 0 0-3.4 2.179l-.194.417-.54-.072A1.876 1.876 0 0 0 5.5 5a2.5 2.5 0 1 0 0 5v1.25a3.75 3.75 0 0 1 0-7.5h.05a5.019 5.019 0 0 1 4.325-2.5c2.3 0 4.182 1.236 4.845 3.125h.02a3.852 3.852 0 0 1 3.868 3.384 3.75 3.75 0 0 1-3.733 4.116h-2.5V17.5h1.875v1.25Z"/></svg> This is a <strong>carbon-neutral</strong> delivery</p>
                </div>
                <div class="cart__confirm">
                    <button class="text-preset-3">Confirm Order</button>
                </div>
            </div>
        </div>


    </div>
</main>
<script src="script.js"></script>
</body>
</html>