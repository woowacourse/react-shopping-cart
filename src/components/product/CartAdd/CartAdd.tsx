import * as Styled from './CartAdd.style';
import * as GlobalStyled from '../../../styles/GlobalStyles';
import Counter from '../../common/Counter/Counter';
import { useCount } from '../../../hooks/useCount';
import { ProductType } from '@/domain/product';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '@/route';
import { useDispatch } from 'react-redux';
import { fetchAddCartAsync } from '@/store/cart/action';
interface CartAddPropsType {
  product: Pick<ProductType, 'name' | 'price' | 'quantity'>;
  closeModal: () => void;
}

function CartAdd({ product, closeModal }: CartAddPropsType) {
  const { name, price, quantity } = product;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { count, increaseCount, decreaseCount } = useCount({
    initialValue: 1,
    min: 1,
    max: quantity,
  });

  const onClickCartAdd = () => {
    dispatch(fetchAddCartAsync({ ...product, quantity: count }) as any);

    if (confirm('장바구니로 이동하시겠습니까?')) {
      navigate(ROUTE.ShoppingCart);
    }

    closeModal();
  };

  return (
    <Styled.Container>
      <GlobalStyled.Position>
        <Styled.ProductInfoWrapper>
          <Styled.Name>{name}</Styled.Name>
          <Styled.Price>{price} 원</Styled.Price>
          <GlobalStyled.Position position="absolute" right="0" bottom="0">
            <Counter count={count} increaseCount={increaseCount} decreaseCount={decreaseCount} />
          </GlobalStyled.Position>
        </Styled.ProductInfoWrapper>
      </GlobalStyled.Position>

      <Styled.TotalPriceWrapper>
        <Styled.Title>합계</Styled.Title>
        <Styled.TotalPrice>{price * count} 원</Styled.TotalPrice>
      </Styled.TotalPriceWrapper>

      <Styled.Button onClick={onClickCartAdd}>장바구니에 담기</Styled.Button>
    </Styled.Container>
  );
}

export default CartAdd;
