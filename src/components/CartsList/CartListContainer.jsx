import CartItem from 'components/CartsList/CartItem';
import SkeletonCartItem from 'components/CartsList/SkeletonCartItem';

function CartListContainer({
  isStoredProductsLoading,
  storedProducts,
  checkedProducts,
}) {
  const checkedProductsId = checkedProducts.map((product) => product.id);

  return (
    <div>
      {isStoredProductsLoading &&
        Array.from({ length: 3 }).map((_, idx) => (
          <SkeletonCartItem key={idx} />
        ))}
      {!isStoredProductsLoading &&
        storedProducts?.map(({ id, price, title, src, quantity }) => (
          <CartItem
            key={id}
            id={id}
            price={price}
            title={title}
            src={src}
            quantity={quantity}
            isChecked={checkedProductsId.includes(id)}
          />
        ))}
    </div>
  );
}

export default CartListContainer;
