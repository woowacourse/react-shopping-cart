import styled from 'styled-components';

const CartItemWrapper = styled.div`
  display: flex;
  gap: 15px;
  width: 100%;

  @media ${({theme}) => theme.DEVICE.tablet} {
    height: 100px;
    & img {
      width: 80px;
      height: 80px;
    }

    & input {
      width: 20px;
      height: 20px;
    }

    & button {
      width: 30px;
      height: 15px;
    }
  }
`;

const ItemNameBox = styled.div`
  width: 40%;
`;

const ItemCountBox = styled.div`
  display: flex;
  border: ${({theme}) => `solid 1px ${theme.COLOR.GRAY_500}`};
  width: 73px;
  height: 58px;
  align-items: center;
  justify-content: center;

  @media ${({theme}) => theme.DEVICE.tablet} {
    width: 35px;
    height: 30px;
  }
`;

export {CartItemWrapper, ItemNameBox, ItemCountBox};
