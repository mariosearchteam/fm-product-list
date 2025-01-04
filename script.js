document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll(".addToCart");
  const cartCount = document.querySelector(".cartCount");
  const cartItemsContainer = document.querySelector(".cart__items");
  const totalContainer = document.querySelector(".total");

  const cart = {}; // Objekt zur Speicherung der Produkte im Warenkorb

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productId = this.dataset.id;
      const productName =
        this.closest(".product").querySelector("h2").innerText;
      const productPrice = parseFloat(
        this.closest(".product").querySelector(".product__price span").innerText
      );

      const quantityContainer = document.querySelector(
        `.quantity-container[data-id='${productId}']`
      );

      // Button verstecken und Mengensteuerung anzeigen
      this.style.display = "none";
      quantityContainer.style.display = "flex";

      // Warenkorb-Anzahl erhöhen
      let currentCount = parseInt(cartCount.innerText);
      cartCount.innerText = currentCount + 1;

      // Produkt zum Warenkorb hinzufügen
      if (!cart[productId]) {
        cart[productId] = {
          name: productName,
          price: productPrice,
          quantity: 1,
        };
        addCartItem(productId);
      } else {
        cart[productId].quantity++;
      }

      updateCartItem(productId);
      updateCartTotal();
    });
  });

  // Event für Menge ändern
  document.querySelectorAll(".quantity-container button").forEach((control) => {
    control.addEventListener("click", function () {
      const action = this.dataset.action;
      const input = this.parentNode.querySelector(".quantity-input");
      const productId = this.parentNode.dataset.id;
      const addToCartButton = document.querySelector(
        `.addToCart[data-id='${productId}']`
      );

      let value = parseInt(input.value);

      if (action === "increase") {
        value++;
      } else if (action === "decrease" && value > 0) {
        value--;
      }

      input.value = value;

      // Sync cart count
      let currentCount = parseInt(cartCount.innerText);
      if (action === "increase") {
        cartCount.innerText = currentCount + 1;
      } else if (action === "decrease") {
        cartCount.innerText = currentCount - 1;
      }

      // Wenn der Zähler 0 erreicht, zurück auf den Add-to-Cart-Button wechseln
      if (value === 0) {
        this.parentNode.style.display = "none";
        addToCartButton.style.display = "flex";
        delete cart[productId];
        removeCartItem(productId);
      } else {
        cart[productId].quantity = value;
        updateCartItem(productId);
      }

      updateCartTotal();
    });
  });

  function addCartItem(id) {
    const item = cart[id];
    const cartItemHTML = `
      <div class="cart__item" data-id="${id}">
        <div class="cart__item__col">
          <div class="cart__item__description">
            <p class="text-preset-4 bold">${item.name}</p>
          </div>
          <div class="cart__item__details text-preset-4">
            <p class="cart__item__quantity bold"><span>${
              item.quantity
            }</span>x</p>
            <p class="cart__item__price">@ $<span>${item.price.toFixed(
              2
            )}</span></p>
            <p class="cart__item__total bold">$<span>${(
              item.price * item.quantity
            ).toFixed(2)}</span></p>
          </div>
        </div>
        <div class="cart__item__col">
            <button class="removeCartItem" data-id="${id}"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg></button>
        </div>
      </div>
    `;
    cartItemsContainer.insertAdjacentHTML("beforeend", cartItemHTML);
  }

  function updateCartItem(id) {
    const item = cart[id];
    const cartItem = cartItemsContainer.querySelector(
      `.cart__item[data-id='${id}']`
    );
    cartItem.querySelector(".cart__item__quantity span").innerText =
      item.quantity;
    cartItem.querySelector(".cart__item__total span").innerText = (
      item.price * item.quantity
    ).toFixed(2);
  }

  function removeCartItem(id) {
    const cartItem = cartItemsContainer.querySelector(
      `.cart__item[data-id='${id}']`
    );
    cartItem.remove();
  }

  function updateCartTotal() {
    let total = 0;
    Object.keys(cart).forEach((id) => {
      total += cart[id].price * cart[id].quantity;
    });
    totalContainer.innerText = total.toFixed(2);
  }
});
