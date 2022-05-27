import styled from "styled-components";

const CartItemContainer = styled.li`
  position: relative;

  display: flex;
  gap: 20px;
  width: 100%;
  height: 200px;
  padding: 25px 0;

  border-bottom: 1.5px solid ${({ theme }) => theme.color.grey_light};

  list-style-type: none;

  a {
    display: flex;
    gap: 20px;
  }
`;

const ProductName = styled.p`
  font-size: 20px;
  line-height: 24px;
  color: ${({ theme }) => theme.color.grey_darker};
`;

const ProductPrice = styled.p`
  position: absolute;
  bottom: 25px;
  right: 0;

  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.color.grey_darker};
`;

const ProductQuantityManagement = styled.div`
  position: absolute;
  top: 25px;
  right: 0;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
`;

export {
  CartItemContainer,
  ProductName,
  ProductPrice,
  ProductQuantityManagement,
};
