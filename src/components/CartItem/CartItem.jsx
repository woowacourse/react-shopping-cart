import styled from 'styled-components';
import PropTypes from 'prop-types';
import trash from 'assets/svg/trash.svg';
import comma from 'utils/comma';
import Checkbox from 'components/Checkbox';
import { useEffect, useState } from 'react';
import useDelete from 'hooks/useDelete';

const CartItem = ({
  item,
  onChangeEachCheckbox,
  checked,
  // handleClickDelete,
}) => {
  const [isChecked, setIsChecked] = useState(true);
  const handleChange = () => {
    setIsChecked(!isChecked);
    onChangeEachCheckbox(item.id, isChecked);
  };

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const { callApi: callDeleteApi } = useDelete('/cartList', {
    data: {
      id: item.id,
    },
  });

  const handleClickDelete = () => {
    console.log('hi');
    callDeleteApi();
  };
  return (
    <>
      <Styled.Wrapper>
        <Styled.LeftInfo>
          <Checkbox checked={isChecked} onChange={handleChange} />
          <Styled.ProductImg src={item.imgUrl} alt={item.name} />
          <Styled.ProductName>{item.name}</Styled.ProductName>
        </Styled.LeftInfo>
        <Styled.RightControl>
          <Styled.TrashIcon
            src={trash}
            alt="삭제"
            onClick={handleClickDelete}
          />
          <Styled.InputWrapper>
            <Styled.NumberInput value={item.cartQuantity} />
            <div>
              <Styled.NumberInputButton>▲</Styled.NumberInputButton>
              <Styled.NumberInputButton>▼</Styled.NumberInputButton>
            </div>
          </Styled.InputWrapper>
          <Styled.CartPrice>
            {comma(item.cartQuantity * Number(item.price))}원
          </Styled.CartPrice>
        </Styled.RightControl>
      </Styled.Wrapper>
      <Styled.DivideLine />
    </>
  );
};

CartItem.propTypes = {
  item: PropTypes.object,
  onChangeEachCheckbox: PropTypes.func,
  checked: PropTypes.bool,
  handleClickDelete: PropTypes.func,
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
    width: 25px;
    height: 25px;
    cursor: pointer;
    &:checked {
      background-color: #2ac1bc;
    }
    &::after {
      box-sizing: border-box;
      content: '✔';
      width: 25px;
      height: 25px;
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
    cursor: pointer;
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
    height: 29px;
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
    background-color: #aaaaaa;
  `,
};

export default CartItem;
