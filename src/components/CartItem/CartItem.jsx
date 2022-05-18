import styled from 'styled-components';
import PropTypes from 'prop-types';
import trash from 'assets/svg/trash.svg';
import comma from 'utils/comma';

const CartItem = ({ cartList }) => {
  return (
    <>
      <Styled.Wrapper>
        <Styled.LeftInfo>
          <Styled.Checkbox type="checkbox" checked="true"></Styled.Checkbox>
          <Styled.ProductImg src={cartList.imgUrl} alt={cartList.name} />
          <Styled.ProductName>{cartList.name}</Styled.ProductName>
        </Styled.LeftInfo>
        <Styled.RightControl>
          <Styled.TrashIcon src={trash} alt="삭제" />
          <Styled.InputWrapper>
            <Styled.NumberInput value={cartList.cartQuantity} />
            <div>
              <Styled.NumberInputButton>▲</Styled.NumberInputButton>
              <Styled.NumberInputButton>▼</Styled.NumberInputButton>
            </div>
          </Styled.InputWrapper>
          <Styled.CartPrice>
            {comma(cartList.cartQuantity * Number(cartList.price))}원
          </Styled.CartPrice>
        </Styled.RightControl>
      </Styled.Wrapper>
      <Styled.DivideLine />
    </>
  );
};

CartItem.propTypes = {
  cartList: PropTypes.object,
};

const Styled = {
  Wrapper: styled.div`
    display: flex;
    justify-content: space-between;
  `,

  LeftInfo: styled.div`
    display: flex;
    margin-top: 10px;
    gap: 15px;
  `,
  Checkbox: styled.input`
    appearance: none;
    border: 1px solid #2ac1bc;
    border-radius: 2px;
    width: 1.75rem;
    height: 1.75rem;
    cursor: pointer;
    &:checked {
      background-color: #2ac1bc;
    }
    &::after {
      box-sizing: border-box;
      content: '✔';
      width: 100%;
      height: 100%;
      font-size: 0.75rem;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `,
  ProductImg: styled.img`
    width: 144px;
    height: 144px;
  `,
  ProductName: styled.span`
    font-size: 20px;
  `,

  RightControl: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
  `,
  TrashIcon: styled.img`
    align-self: flex-end;
  `,
  InputWrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  NumberInput: styled.input`
    width: 70px;
    height: 58px;
    border: 1px solid #ddd;
    text-align: center;
    font-size: 24px;
  `,
  NumberInputButton: styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #dddddd;
    height: 31px;
    cursor: pointer;
  `,
  CartPrice: styled.span`
    color: #333333;
    align-self: flex-end;
  `,
  DivideLine: styled.hr`
    width: 100%;
    border: 1px solid #aaaaaa;
    margin-top: 10px;
  `,
};

export default CartItem;
