import { useRecoilState } from 'recoil';
import { cartListAtom } from 'src/recoil/cartList';
import { Product } from 'src/types';

const useProductSelect = (product: Product) => {
  const [cartList, setCartList] = useRecoilState(cartListAtom);

  const currentCartItem = cartList.find(
    (item) => item.product.id === product.id
  );

  const onSelectItem: React.MouseEventHandler<SVGElement> = () => {
    setCartList((prev) => [...prev, { id: product.id, quantity: 1, product }]);
  };

  const add: React.MouseEventHandler<HTMLButtonElement> = () => {
    setCartList((cur) =>
      cur.map((cart) =>
        cart.product.id === product.id
          ? {
              ...cart,
              quantity: cart.quantity + 1,
            }
          : cart
      )
    );
  };

  const remove: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (currentCartItem?.quantity === 1) {
      setCartList((cur) =>
        cur.filter((item) => item.product.id !== product.id)
      );
      return;
    }
    setCartList((cur) =>
      cur.map((cart) =>
        cart.product.id === product.id
          ? {
              ...cart,
              quantity: cart.quantity - 1,
            }
          : cart
      )
    );
  };

  return { currentCartItem, remove, add, onSelectItem };
};

export default useProductSelect;
