import { renderListWithTemplate } from './utils.mjs';

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
  }

  productTemplate(product) {
    return `
      <li class="product-card">
        <a href="../product_pages/${product.Id}.html">
          <img src="${product.PrimaryMedium}" alt="${product.Name}">
          <h3>${product.Brand}</h3>
          <h2>${product.Name}</h2>
          <p>$${product.FinalPrice}</p>
        </a>
      </li>
    `;
  }

  renderList(list) {
    this.listElement.innerHTML = '';
    renderListWithTemplate(this.productTemplate, this.listElement, list);

    const title = document.querySelector('h1');
    if (title) {
      title.textContent = `Top Products: ${this.category}`;
    }
  }
}