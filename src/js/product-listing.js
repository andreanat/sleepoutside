import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

// leer categoría de la URL, default "tents"
const category = getParam("category") || "tents";

// datasource sin categoría en el constructor
const dataSource = new ProductData();

// UL donde se pintan los productos
const listElement = document.querySelector(".product-list");

// crear y arrancar la lista
const myList = new ProductList(category, dataSource, listElement);
myList.init();
