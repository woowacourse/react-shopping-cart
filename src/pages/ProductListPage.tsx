import { useState, useEffect } from 'react';
import { Product } from 'types/product';
import ProductCardList from 'components/ProductCardList/ProductCardList';

const ProductListPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`${process.env.PUBLIC_URL}/data/mockProducts.json`);
      const products = await response.json();

      setProducts(products);
    };

    fetchProducts();
  }, []);

  return <ProductCardList products={products} />;
};

export default ProductListPage;
