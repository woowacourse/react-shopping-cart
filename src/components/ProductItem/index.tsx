import { useRecoilState } from 'recoil';
import { cartListAtom } from 'src/recoil/cartList';
import { Product } from 'src/types';
import Svg from '../@common/Svg';
import Counter from '../Counter';
import * as S from './ProductItem.styles';

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
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

  const productSelect = currentCartItem ? (
    <Counter count={currentCartItem.quantity} add={add} remove={remove} />
  ) : (
    <Svg type="cart-icon" width={25} height={22} onClick={onSelectItem} />
  );

  return (
    <S.ItemWrapper>
      <S.ItemImage src={product.imageUrl} alt={product.name} />
      <S.ProductWrapper>
        <div>
          <S.ProductName>{product.name}</S.ProductName>
          <S.ProductPrice>
            {product.price.toLocaleString('KR')} 원
          </S.ProductPrice>
        </div>
        {productSelect}
      </S.ProductWrapper>
    </S.ItemWrapper>
  );
};

export default ProductItem;
