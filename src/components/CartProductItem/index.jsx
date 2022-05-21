import { useSelector } from 'react-redux';
import Styled from 'components/CartProductItem/index.style';
import { Image } from 'components';
import { ReactComponent as DeleteIcon } from 'assets/trash_can_icon.svg';
import Counter from 'components/Counter';
import autoComma from 'utils/autoComma';
import CheckBox from 'components/CheckBox';
import store from 'store/store';
import { doPutProductToCart } from 'actions/actionCreator';

const CartProductItem = ({ id, quantity }) => {
  const { products } = useSelector(state => state.reducer);
  const product = products.find(product => product.id === id);
  const { name, price, image } = product;

  return (
    <Styled.ProductItem>
      <Styled.ProductDetailController>
        <CheckBox />
        <Image src={image} size="200px" />
        <Styled.ProductName>{name}</Styled.ProductName>
      </Styled.ProductDetailController>

      <Styled.ProductController>
        <DeleteIcon />
        <Counter
          quantity={quantity}
          increase={() => store.dispatch(doPutProductToCart({ id, quantity: quantity + 1 }))}
          decrease={() => store.dispatch(doPutProductToCart({ id, quantity: quantity - 1 }))}
        />
        {autoComma(price)}원
      </Styled.ProductController>
    </Styled.ProductItem>
  );
};

export default CartProductItem;
