import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="/product_pages/?product=${item.Id}" class="cart-card__image">
      <img
        src="${item.Image}"
        alt="${item.Name}"
      />
    </a>
    <a href="/product_pages/?product=${item.Id}">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const list = document.querySelector(".product-list");
  const footer = document.querySelector(".list-footer");
  const totalElement = document.querySelector(".list-total");

  // carrito vacío
  if (!cartItems.length) {
    list.innerHTML = "<p>Your cart is empty.</p>";
    if (footer) {
      footer.classList.add("hide");
    }
    return;
  }

  // render de items
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  list.innerHTML = htmlItems.join("");

  // calcular total
  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.FinalPrice),
    0
  );

  if (totalElement) {
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
  }

  if (footer) {
    footer.classList.remove("hide");
  }
}

renderCartContents();
