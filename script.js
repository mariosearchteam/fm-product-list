document.addEventListener("DOMContentLoaded", initCartApp);

function initCartApp() {
  ("use strict");

  // -------------------------
  // DOM
  // -------------------------

  const dom = {
    cartCount: document.querySelector(".cartCount"),
    cartItemsContainer: document.querySelector(".cart__items"),
    modalTotal: document.querySelector(".modal__total"),
    modalItemsContainer: document.querySelector(".modal__items"),
    totalContainer: document.querySelector(".total"),
    cartWrapper: document.querySelector(".cart__wrapper"),
    cartEmptyWrapper: document.querySelector(".cart__empty"),
    modal: document.querySelector("#my-modal"),
    modalBtn: document.querySelector(".cart__confirm__button"),
    closeBtn: document.querySelector(".close"),
  };

  let cart = {};

  // -------------------------
  // Event Listener
  // -------------------------
  document.body.addEventListener("click", handleBodyClick);
  dom.modalBtn.addEventListener("click", openModal);
  dom.closeBtn.addEventListener("click", () => {
    closeModal();
    resetCart();
  });
  window.addEventListener("click", outsideClick);

  // -------------------------
  // Haupt-Event-Handler
  // -------------------------
  function handleBodyClick(e) {
    const target = e.target;

    if (target.classList.contains("addToCart")) {
      onAddToCart(target);
    } else if (target.classList.contains("quantity-control")) {
      onQuantityChange(target);
    } else if (target.classList.contains("removeCartItem")) {
      onRemoveCartItem(target);
    }

    toggleEmptyCartState();
  }

  // -------------------------
  // Cart-Logik
  // -------------------------
  function onAddToCart(button) {
    const productId = button.dataset.id;
    const productData = products[button.dataset.id];

    toggleQuantityContainer(productId, true);
    // Setze Menge auf 1
    const quantityContainer = document.querySelector(
      `.quantity-container[data-id='${productId}']`
    );
    if (quantityContainer) {
      quantityContainer.querySelector(".quantity-input").value = 1;
    }

    updateCart(productId, productData, 1);
  }

  function onQuantityChange(button) {
    const action = button.dataset.action;
    const container = button.closest(".quantity-container");
    const input = container.querySelector(".quantity-input");
    const productId = container.dataset.id;
    let quantity = parseInt(input.value, 10);

    quantity = action === "increase" ? quantity + 1 : Math.max(0, quantity - 1);
    input.value = quantity;

    updateCart(productId, null, quantity);
    if (quantity === 0) {
      toggleQuantityContainer(productId, false);
    }
  }

  function onRemoveCartItem(button) {
    const productId = button.dataset.id;
    toggleQuantityContainer(productId, false);
    updateCart(productId, null, 0);
  }

  function updateCart(productId, productData, quantity) {
    if (quantity === 0) {
      delete cart[productId];
      removeCartItemDOM(productId);
    } else {
      if (!cart[productId]) {
        cart[productId] = { ...productData, quantity: 0 };
        addCartItemDOM(productId);
      }
      cart[productId].quantity = quantity;
      updateCartItemDOM(productId);
      updateModalItemDOM(productId);
    }
    updateCartCount();
    updateCartTotal();
  }

  // -------------------------
  // Hilfsfunktionen / Daten
  // -------------------------

  function toggleQuantityContainer(id, show) {
    const addToCartButton = document.querySelector(
      `.addToCart[data-id='${id}']`
    );
    const quantityContainer = document.querySelector(
      `.quantity-container[data-id='${id}']`
    );
    if (!addToCartButton || !quantityContainer) return;

    addToCartButton.style.display = show ? "none" : "flex";
    quantityContainer.style.display = show ? "flex" : "none";
  }

  // -------------------------
  // DOM-Updates (Cart)
  // -------------------------
  function addCartItemDOM(id) {
    const item = cart[id];
    const html = `
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
          <button class="removeCartItem" data-id="${id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
              <path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/>
            </svg>
          </button>
        </div>
      </div>
    `;
    dom.cartItemsContainer.insertAdjacentHTML("beforeend", html);
  }

  function updateCartItemDOM(id) {
    const item = cart[id];
    const cartItem = dom.cartItemsContainer.querySelector(
      `.cart__item[data-id='${id}']`
    );
    if (!cartItem) return;

    cartItem.querySelector(".cart__item__quantity span").innerText =
      item.quantity;
    cartItem.querySelector(".cart__item__total span").innerText = (
      item.price * item.quantity
    ).toFixed(2);
  }

  function removeCartItemDOM(id) {
    const cartItem = dom.cartItemsContainer.querySelector(
      `.cart__item[data-id='${id}']`
    );
    if (cartItem) cartItem.remove();

    const quantityContainer = document.querySelector(
      `.quantity-container[data-id='${id}']`
    );
    if (quantityContainer) {
      quantityContainer.querySelector(".quantity-input").value = 0;
    }
  }

  // -------------------------
  // DOM-Updates (Modal)
  // -------------------------
  function updateModalItemDOM(id) {
    const item = cart[id];
    const modalItem = dom.modalItemsContainer.querySelector(
      `.modal__item[data-id='${id}']`
    );
    const total = (item.price * item.quantity).toFixed(2);

    if (!modalItem) {
      const html = `
        <div class="modal__item" data-id="${id}">
        <div class="modal__item__col">
        <img class="modal__thumbnail" src="${
          products[id].image.thumbnail
        }" alt="${item.name}" width="48" height="48"/>
        </div>
        <div class="modal__item__col">
          <p class="modal__item__name text-preset-4">${item.name}</p>
          <p class="modal__item__details text-preset-4"><span class="modal__item__quantity">${
            item.quantity
          }x  </span><span class="modal__item__price">@ $${item.price.toFixed(
        2
      )}</span> </p>
        </div>
        <div class="modal__item__col">
        <p class="modal__item__total text-preset-4">$${total}</p>
        </div>
        </div>
      `;
      dom.modalItemsContainer.insertAdjacentHTML("beforeend", html);
    } else {
      const quantityEl = modalItem.querySelector(".modal__item__quantity");
      const priceEl = modalItem.querySelector(".modal__item__price");
      const totalEl = modalItem.querySelector(".modal__item__total");

      quantityEl.textContent = `${item.quantity}x`;
      priceEl.textContent = `@ $${item.price.toFixed(2)}`;
      totalEl.textContent = `$${total}`;
    }
    updateModalTotal();
  }

  function updateModalTotal() {
    const total = Object.values(cart).reduce(
      (sum, { price, quantity }) => sum + price * quantity,
      0
    );
    dom.modalTotal.innerHTML = `<p>Order Total</p><p class="modal__item__order-total text-preset-2 bold">$${total.toFixed(
      2
    )}</p>`;
  }

  // -------------------------
  // Cart-Hilfsupdates
  // -------------------------
  function updateCartCount() {
    const count = Object.values(cart).reduce(
      (sum, { quantity }) => sum + quantity,
      0
    );
    dom.cartCount.innerText = count;
  }

  function updateCartTotal() {
    const total = Object.values(cart).reduce(
      (sum, { price, quantity }) => sum + price * quantity,
      0
    );
    dom.totalContainer.innerText = total.toFixed(2);
  }

  function resetCart() {
    cart = {};
    dom.cartItemsContainer.innerHTML = "";
    dom.modalItemsContainer.innerHTML = "";
    updateCartCount();
    updateCartTotal();
    document.querySelectorAll(".quantity-container").forEach((container) => {
      container.querySelector(".quantity-input").value = 0;
      toggleQuantityContainer(container.dataset.id, false);
    });
  }

  function toggleEmptyCartState() {
    const itemCount = parseInt(dom.cartCount.innerText, 10);
    dom.cartWrapper.style.display = itemCount === 0 ? "none" : "block";
    dom.cartEmptyWrapper.style.display = itemCount === 0 ? "block" : "none";
  }

  // -------------------------
  // Modal-Logik
  // -------------------------
  function openModal() {
    dom.modal.style.display = "block";
  }

  function closeModal() {
    dom.modal.style.display = "none";
  }

  function outsideClick(e) {
    if (e.target === dom.modal) {
      closeModal();
    }
  }

  // Initialer Zustand setzen
  toggleEmptyCartState();
}
