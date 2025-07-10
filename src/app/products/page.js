// /app/products/page.js
import { getProducts, getProductPageData } from "../lib/products";
import ProductPageClient from "./ProductPageClient";
import "../Css/Products.css";

export default async function ProductsPage() {
  const allProducts = await getProducts();
  const pageData = await getProductPageData();

  return <ProductPageClient products={allProducts} pageData={pageData} />;
}
