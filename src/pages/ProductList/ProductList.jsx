import productAPI from 'apis/productAPI';

import { useEffect, useState } from 'react';

import { GridLayout } from 'components/@common';
import { ListProduct, LoadingSpinner, PageLayout } from 'components';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const updateProducts = async () => {
      const newProducts = await productAPI.getProducts();

      setProducts(newProducts);
    };

    updateProducts();
  }, []);

  if (!products.length) {
    return (
      <PageLayout>
        <LoadingSpinner />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <GridLayout>
        {products.map(product => (
          <ListProduct key={`list${product.id}`} {...product} />
        ))}
      </GridLayout>
    </PageLayout>
  );
}

export default ProductList;
