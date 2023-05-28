import { styled } from 'styled-components';

export const CartItemList = styled.ul`
  width: inherit;

  border: 1px solid var(--grey-300);
  border-radius: 8px;

  margin-bottom: 45px;
`;

export const CartItem = styled.li`
  display: flex;
  flex-direction: column;

  padding: 0 16px;

  margin-bottom: 15px;
`;

export const CartInfo = styled.div`
  position: relative;

  display: flex;
  justify-content: space-between;

  color: var(--grey-400);

  padding: 24px 0;
`;

export const LeftInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const ProductImage = styled.div<{ path: string }>`
  width: 85px;
  height: 85px;

  border-radius: 4px;

  margin: 0 15px;

  background-image: ${(props) => `url(${props.path})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

export const ProductName = styled.div`
  position: absolute;

  left: 155px;
  top: 30px;
  font-size: 15px;

  font-weight: 400;
`;

export const RightInfo = styled.div`
  display: flex;
  align-items: center;

  column-gap: 6px;
`;

export const ProductPrice = styled.div`
  display: flex;
  justify-content: center;
  width: 81px;
  font-size: 13px;
`;

export const DeleteButton = styled.button`
  border: none;
  background-color: var(--grey-100);

  cursor: pointer;

  @media screen and (max-width: 850px) {
    position: absolute;

    top: 20px;
    right: 8px;
  }
`;

export const TotalPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 40px;

  border-radius: 4px;

  font-size: 12px;

  background-color: var(--grey-200);

  letter-spacing: 1px;

  & > span {
    font-weight: 900;
  }
`;
