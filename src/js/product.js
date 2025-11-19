import ProductData from "./ProductData.mjs";
import { loadHeaderFooter, getParam, renderWithTemplate } from "./utils.mjs";

loadHeaderFooter();

const dataSource = new ProductData();
const productId = getParam("product");
const productElement = document.querySelector(".product-detail");

function productDetailTemplate(product) {
  return `
    <article class="product-detail-card">
      <h1>${product.Name}</h1>
      <img src="${product.Images.PrimaryLarge}" alt="${product.Name}" />
      <h2>${product.Brand.Name}</h2>
      <p>${product.Description}</p>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </article>
  `;
}

async function init() {
  try {
    const product = await dataSource.findProductById(productId);
    const template = productDetailTemplate(product);
    renderWithTemplate(template, productElement, product);
  } catch (e) {
    productElement.innerHTML = "<p>Sorry, product not found.</p>";
    console.error(e);
  }
}

init();