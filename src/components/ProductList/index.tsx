import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import { ProductType } from "../../types/product";
import Item from "../Item";

const ProductList: Function = (
  products: ProductType[]
): React.ReactElement[] => {
  const navigate = useNavigate();
  const { createNewCart } = useCart();

  const handleItemClick = (id: number) => {
    navigate(`/product/${id}`);
  };
  return products.map((product: ProductType) => {
    const { id } = product;
    const itemCardElemProps = {
      key: product.id,
      onClick: () => {
        handleItemClick(product.id);
      },
      onClickShoppingCart: () => {
        createNewCart(id, product.price);
      },
      ...product,
    };

    return <Item {...itemCardElemProps} />;
  });
};
export default ProductList;
