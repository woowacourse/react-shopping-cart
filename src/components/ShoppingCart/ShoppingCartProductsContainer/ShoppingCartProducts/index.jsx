import React from "react";
import ShoppingCartProduct from "./ShoppingCartProduct";

const ShoppingCartProducts = ({ products, checkedProductIds }) => {
  return (
    <div>
      {products.map((product) => {
        const { id } = product;
        const checked = checkedProductIds.includes(id);

        return (
          <ShoppingCartProduct
            checked={checked}
            key={product.id}
            {...product}
          />
        );
      })}
    </div>
  );
};

export default ShoppingCartProducts;
