import styled from 'styled-components';
import { ReactComponent as ProductDelete } from '../../assets/delete.svg';
import Counter from '../Counter';
import { Cart } from '../../types/cart';
import useCart from '../ProductItem/hooks/useCart';
import { cartState } from '../../atoms/cart';

type CartItemProps = {
  cartItem: Cart;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const CartItem: React.FC<CartItemProps> = ({ cartItem, checked, onChange }) => {
  const { id, product } = cartItem;
  const { name, price, imageUrl } = product;

  const { deleteCart } = useCart(cartState, product);

  const fetchDeleteCart = () => {
    fetch('api/cart-items', {
      method: 'DELETE',
      body: JSON.stringify([id]),
    })
      .then((res) => {
        if (!res.ok) throw new Error('장바구니를 삭제하지 못하였습니다.');

        deleteCart();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <StyledWrapper>
      <StyledCheckBox type="checkbox" checked={checked} onChange={onChange} />
      <StyledThumbnailWrapper>
        <StyledThumbnail src={imageUrl} />
      </StyledThumbnailWrapper>
      <StyledProductWrapper>
        <StyledProductTitleWrapper>
          <StyledProductName>{name}</StyledProductName>
          <ProductDelete width="24" height="24" cursor="pointer" onClick={fetchDeleteCart} />
        </StyledProductTitleWrapper>
        <StyledCounterWrapper>
          <Counter product={product} min={1} max={12} />
        </StyledCounterWrapper>
        <StyledProductPrice>{price.toLocaleString('ko-KR')}원</StyledProductPrice>
      </StyledProductWrapper>
    </StyledWrapper>
  );
};

export default CartItem;

const StyledWrapper = styled.div`
  display: grid;

  grid-template-columns: 0.1fr 1fr 3fr;

  width: 700px;
  height: 190px;
  padding: 20px 0;

  border-top: 1.5px solid #cccccc;
`;

const StyledCheckBox = styled.input`
  width: 28px;
  height: 28px;

  accent-color: #333333;
  cursor: pointer;
`;

const StyledThumbnailWrapper = styled.div`
  width: 144px;
  height: 144px;
  margin-left: 15px;
`;

const StyledThumbnail = styled.img`
  width: 100%;
  height: 100%;
`;

const StyledProductWrapper = styled.div`
  margin-left: 20px;

  justify-self: flex-end;
`;

const StyledProductTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const StyledProductName = styled.div`
  font-size: 20px;
`;

const StyledCounterWrapper = styled.div`
  margin-top: 20px;
`;

const StyledProductPrice = styled.div`
  margin-top: 20px;
  text-align: right;
`;
