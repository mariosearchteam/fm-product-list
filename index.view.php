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
                <div class="product">
                    <picture>
                        <source srcset="<?= $product['image']['mobile'] ?>" type="image/webp">
                        <img src="<?= $product['image']['mobile'] ?>" alt="<?= $product['name'] ?>">
                    </picture>
                    <button class="button text-preset-4 bold"><svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clip-path="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg>  Add to Cart</button>
                    <p class="product__category text-preset-4"><?= $product['category'] ?></p>
                    <h2 class="text-preset-3"><?= $product['name'] ?></h2>
                    <p class="product__price text-preset-3">$<span><?= $product['price'] ?></span></p>
                </div>
                <?php endforeach; ?>
            
        </div>
        <div class="cart">
            <h2 class="text-preset-3">Your Cart (<span class="quantity">0</span>)</h2>
            <p>Your added items will appear here</p>
        </div>
    </div>


    </div>
</main>
<script src="scripts.js"></script>
</body>
</html>