import CartItem from './CartItem';

function CartListContainer({
  isStoredProductsLoading,
  storedProducts,
  checkedProducts,
}) {
  const checkedProductsId = checkedProducts.map((product) => product.id);

  return (
    <div>
      {isStoredProductsLoading && <h1>로딩중...</h1>}
      {!isStoredProductsLoading &&
        storedProducts?.map(({ id, price, title, src }) => (
          <CartItem
            key={id}
            id={id}
            price={price}
            title={title}
            src={src}
            quantity={storedProducts?.quantity}
            isChecked={checkedProductsId.includes(id)}
          />
        ))}
    </div>
  );
}

export default CartListContainer;
