import styled from 'styled-components';
import PropType from 'prop-types';
import CheckBox from 'components/CartPage/CheckBox';
import ProductImage from 'components/Main/ProductImage';
import { ReactComponent as TrashButton } from 'components/CartPage/TrashButton.svg';
import AmountController from 'components/CartPage/AmountController';
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteCart } from 'store/carts/action';
import { NOTICE } from 'constants';

function CartProduct({ product, checkedList, updateCheckedList }) {
  const dispatch = useDispatch();

  const deleteCartProduct = () => {
    if (window.confirm(NOTICE.DELETE_CONFIRM)) {
      dispatch(deleteCart(product.id));
    }
  };

  const updateCheckedListWithProduct = (isChecked) => {
    updateCheckedList(product, isChecked);
  };

  return (
    <Styled.CartContainer>
      <React.Fragment key={product.id}>
        <Styled.ProductLeftWrapper>
          <CheckBox
            checked={checkedList.some((item) => item.id === product.id)}
            onChange={updateCheckedListWithProduct}
          />
          <ProductImage
            src={product.src}
            size="small"
            alt={`${product.title} 사진`}
          />
          <Styled.ProductTitle>{product.title}</Styled.ProductTitle>
        </Styled.ProductLeftWrapper>
        <Styled.ProductRightWrapper>
          <Styled.TrashButtonWrapper>
            <TrashButton onClick={deleteCartProduct} />
          </Styled.TrashButtonWrapper>
          <AmountController product={product} />
          <Styled.ProductPrice>{`${product.price}원`}</Styled.ProductPrice>
        </Styled.ProductRightWrapper>
      </React.Fragment>
    </Styled.CartContainer>
  );
}

export default CartProduct;

CartProduct.propTypes = {
  product: PropType.shape({
    id: PropType.string.isRequired,
    price: PropType.string.isRequired,
    src: PropType.string.isRequired,
    title: PropType.string.isRequired,
    quantity: PropType.number.isRequired,
  }).isRequired,
  checkedList: PropType.arrayOf(
    PropType.shape({
      id: PropType.string.isRequired,
      price: PropType.string.isRequired,
      src: PropType.string.isRequired,
      title: PropType.string.isRequired,
      quantity: PropType.number.isRequired,
    }),
  ).isRequired,
  updateCheckedList: PropType.func.isRequired,
};

const Styled = {
  CartContainer: styled.div`
    display: flex;
    justify-content: space-between;
    margin: 20px 0 20px 0;
  `,
  ProductLeftWrapper: styled.div`
    display: flex;
    gap: 15px;
    margin-top: 10px;
  `,
  ProductTitle: styled.span`
    font-size: 20px;
  `,
  ProductRightWrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: end;
    gap: 15px;
  `,
  ProductPrice: styled.span`
    color: #333333;
    align-self: flex-end;
  `,
  TrashButtonWrapper: styled.div`
    align-self: flex-end;
    cursor: pointer;
    margin-bottom: 12px;
    &:hover {
      opacity: 0.6;
    }
  `,
};
