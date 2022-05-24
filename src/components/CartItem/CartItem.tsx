import CART_MESSAGE from 'constants/message';
import CheckBox from 'components/@shared/CheckBox';
import { ReactComponent as Delete } from 'assets/Delete.svg';
import Link from 'components/@shared/Link';
import NumberInput from 'components/@shared/NumberInput';
import PATH from 'constants/path';
import { Product } from 'types/index';
import { cartActions } from 'redux/actions';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

type Props = {
  product: Product;
  stock: number;
  checked: boolean;
};

function CartItem({ product, stock, checked }: Props) {
  const { id, name, image } = product;
  const dispatch = useDispatch();

  const onClickDeleteButton = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (window.confirm(CART_MESSAGE.ASK_DELETE)) {
      dispatch(cartActions.deleteToCart(id));
    }
  };

  const onChangeCheckBox = (
    e: React.MouseEvent<HTMLElement> | React.ChangeEvent<HTMLElement>
  ) => {
    e.preventDefault();

    dispatch(cartActions.toggleCheckAProduct(id));
  };

  const onChangeCartStock = (value: number) => {
    dispatch(cartActions.changeProductStock({ id, stock: value }));
  };

  return (
    <Link to={`${PATH.PRODUCT}/${id}`}>
      <StyledCartItem>
        <CheckBox id={id + ''} checked={checked} onChange={onChangeCheckBox} />
        <img src={image} alt={name} />
        <StyledProductName>{name}</StyledProductName>
        <StyledDeleteButton type="button" onClick={onClickDeleteButton}>
          <Delete />
        </StyledDeleteButton>
        <NumberInput
          max={product.stock}
          value={stock}
          setValue={onChangeCartStock}
        />
        <StyledPrice>
          {(product.price * stock).toLocaleString('ko-KR')} 원
        </StyledPrice>
      </StyledCartItem>
    </Link>
  );
}

const StyledCartItem = styled.div`
  width: 100%;
  padding-top: 20px;
  border-top: 1px solid ${({ theme: { colors } }) => colors.lightGray};

  img {
    aspect-ratio: 1 / 1;
    height: 110px;
    margin: 0 10px;
  }
`;

const StyledProductName = styled.div`
  position: relative;
  top: -105px;
  left: 150px;

  width: fit-content;
`;

const StyledDeleteButton = styled.button`
  position: relative;
  top: -125px;
  float: right;

  background: none;
`;

const StyledPrice = styled.div`
  position: relative;
  top: -35px;
  left: 105px;
  float: right;

  font-size: 14px;
`;

export default CartItem;
