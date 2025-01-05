document.addEventListener("DOMContentLoaded", function () {
  const cartCount = document.querySelector(".cartCount");
  const cartItemsContainer = document.querySelector(".cart__items");
  const modalTotal = document.querySelector(".modal__total");
  const modalItemsContainer = document.querySelector(".modal__items");
  const totalContainer = document.querySelector(".total");
  const cartWrapper = document.querySelector(".cart__wrapper");
  const cartEmptyWrapper = document.querySelector(".cart__empty");

  let cart = {}; // Cart-Data

  document.body.addEventListener("click", function (e) {
    const target = e.target;

    // Add to Cart Button
    if (target.classList.contains("addToCart")) {
      const productId = target.dataset.id;
      const product = getProductData(target);
      toggleQuantityContainer(productId, true);
      updateCart(productId, product, 1);
      const quantityContainer = document.querySelector(
        `.quantity-container[data-id='${productId}']`
      );
      quantityContainer.querySelector(".quantity-input").value = 1;
    }

    // Increase/Decrease Button
    if (target.classList.contains("quantity-control")) {
      const action = target.dataset.action;
      const container = target.closest(".quantity-container");
      const input = container.querySelector(".quantity-input");
      const productId = container.dataset.id;
      let quantity = parseInt(input.value);

      quantity =
        action === "increase" ? quantity + 1 : Math.max(0, quantity - 1);
      input.value = quantity;

      updateCart(productId, null, quantity);

      if (quantity === 0) {
        toggleQuantityContainer(productId, false);
      }
    }

    // Remove from Cart Button
    if (target.classList.contains("removeCartItem")) {
      const productId = target.dataset.id;
      toggleQuantityContainer(productId, false);
      updateCart(productId, null, 0);
    }

    // Empty Card Image toggle
    if (parseInt(cartCount.innerText) === 0) {
      cartWrapper.style.display = "none";
      cartEmptyWrapper.style.display = "block";
    } else {
      cartWrapper.style.display = "block";
      cartEmptyWrapper.style.display = "none";
    }
  });

  function getProductData(button) {
    const productElement = button.closest(".product");
    return {
      name: productElement.querySelector("h2").innerText,
      price: parseFloat(
        productElement.querySelector(".product__price span").innerText
      ),
    };
  }

  function toggleQuantityContainer(id, show) {
    const addToCartButton = document.querySelector(
      `.addToCart[data-id='${id}']`
    );
    const quantityContainer = document.querySelector(
      `.quantity-container[data-id='${id}']`
    );
    addToCartButton.style.display = show ? "none" : "flex";
    quantityContainer.style.display = show ? "flex" : "none";
  }

  function updateCart(id, product, quantity) {
    if (quantity === 0) {
      delete cart[id];
      removeCartItem(id);
    } else {
      if (!cart[id]) {
        cart[id] = { ...product, quantity: 0 };
        addCartItem(id);
      }
      cart[id].quantity = quantity;
      updateCartItem(id);
      updateModalItem(id);
    }
    updateCartCount();
    updateCartTotal();
  }

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

  function updateModalItem(id) {
    const item = cart[id];
    const modalItem = modalItemsContainer.querySelector(
      `.modal__item[data-id='${id}']`
    );
    if (!modalItem) {
      const modalItemHTML = `
                    <div class="modal__item" data-id="${id}">
                        <p>${item.name} - ${
        item.quantity
      } x $${item.price.toFixed(2)} = $${(item.price * item.quantity).toFixed(
        2
      )}</p>
                    </div>
                `;
      modalItemsContainer.insertAdjacentHTML("beforeend", modalItemHTML);
    } else {
      modalItem.innerHTML = `<p>${item.name} - ${
        item.quantity
      } x $${item.price.toFixed(2)} = $${(item.price * item.quantity).toFixed(
        2
      )}</p>`;
    }
    updateModalTotal();
  }

  function updateModalTotal() {
    const total = Object.values(cart).reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    modalTotal.innerText = `Total: $${total.toFixed(2)}`;
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
    if (cartItem) cartItem.remove();
    //set quantity back to 0
    const quantityContainer = document.querySelector(
      `.quantity-container[data-id='${id}']`
    );
    quantityContainer.querySelector(".quantity-input").value = 0;
  }

  function updateCartCount() {
    const count = Object.values(cart).reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    cartCount.innerText = count;
  }

  function updateCartTotal() {
    const total = Object.values(cart).reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    totalContainer.innerText = total.toFixed(2);
  }

  function resetCart() {
    cart = {};
    cartItemsContainer.innerHTML = "";
    updateCartCount();
    updateCartTotal();
    document.querySelectorAll(".quantity-container").forEach((container) => {
      container.querySelector(".quantity-input").value = 0;
      toggleQuantityContainer(container.dataset.id, false);
    });
  }

  // Modal
  // Get DOM Elements
  const modal = document.querySelector("#my-modal");
  const modalBtn = document.querySelector(".cart__confirm__button");
  const closeBtn = document.querySelector(".close");

  // Events
  modalBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", () => {
    closeModal();
    resetCart();
  });
  window.addEventListener("click", outsideClick);

  // Open
  function openModal() {
    modal.style.display = "block";
  }

  // Close
  function closeModal() {
    modal.style.display = "none";
  }

  // Close If Outside Click
  function outsideClick(e) {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  }
});
