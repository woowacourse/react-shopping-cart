import styled from 'styled-components';

const ListProduct = styled.div`
  width: 282px;
  height: 358px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Image = styled.img`
  width: 282px;
  height: 282px;
  object-fit: cover;
`;

const DescriptionBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 12px;
`;

const Name = styled.p`
  font-weight: 400;
  font-size: 16px;
  letter-spacing: 0.5px;
  color: var(--gray-900);
`;

const Price = styled.p`
  font-weight: 400;
  font-size: 20px;
  letter-spacing: 0.5px;
  color: var(--gray-900);
`;

const ShoppingCartIcon = styled.span`
  font-size: 25px;
  transition: font-size 0.1s ease;

  &:hover {
    font-size: 35px;
  }
`;

export { ListProduct, Image, DescriptionBox, Name, Price, ShoppingCartIcon };
