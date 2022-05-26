import CartItem from 'components/CartsList/CartItem';
import SkeletonCartItem from 'components/CartsList/SkeletonCartItem';

function CartListContainer({ isLoading, storedProducts }) {
  return (
    <div>
      {isLoading &&
        Array.from({ length: 3 }).map((_, idx) => (
          <SkeletonCartItem key={idx} />
        ))}
      {!isLoading &&
        storedProducts?.map((product) => (
          <CartItem key={product.id} {...product} />
        ))}
    </div>
  );
}

export default CartListContainer;
