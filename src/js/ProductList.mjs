import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const brand =
    typeof product.Brand === "object"
      ? product.Brand.Name
      : product.Brand || "Unknown";

  return `
    <li class="product-card">
      <a href="/product_pages/index.html?product=${product.Id}">
        <img src="${product.Image}" alt="${product.Name}" />
        <h3 class="card__brand">${brand}</h3>
        <h2 class="card__name">${product.Name}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    try {
      const products = await this.dataSource.getData();
      this.renderList(products);
    } catch (error) {
      console.error("Error loading product list:", error);
      this.listElement.innerHTML = `<p class="error">Failed to load products. Please try again later.</p>`;
    }
  }

  renderList(list) {
    if (!Array.isArray(list) || list.length === 0) {
      this.listElement.innerHTML = `<p>No products found.</p>`;
      return;
    }

    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      "afterbegin",
      true
    );
  }
}