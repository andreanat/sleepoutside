import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const parent = document.querySelector(".product-list");

  if (!parent) return;

  parent.innerHTML = cartItems
    .map((item) => `<li class="cart-card">${item.Name} - $${item.FinalPrice}</li>`)
    .join("");
}

renderCartContents();
