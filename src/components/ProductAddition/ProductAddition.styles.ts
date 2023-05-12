import styled from 'styled-components';

import { Text } from '../common/Text/Text.styles';

const ProductAdditionContainer = styled.div`
  width: 450px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray3};
`;

const ProductInformationContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;

  & > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
  }
`;

const ProductImage = styled.img`
  width: 102px;
  height: 102px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.small};
`;

const ProductName = styled(Text)`
  margin-bottom: 4px;
`;

const ProductPrice = styled(Text)`
  font-weight: bold;
`;

const TotalPriceContainer = styled.div`
  margin-top: 36px;
  display: flex;
  justify-content: space-between;
`;

const TotalPriceLabel = styled(Text)`
  font-weight: 600;
`;

const ButtonContainer = styled.div`
  margin-top: 18px;
  display: flex;
  gap: 8px;
  align-items: flex-end;
`;

export {
  ProductAdditionContainer,
  Header,
  ProductInformationContainer,
  ProductImage,
  ProductName,
  ProductPrice,
  TotalPriceContainer,
  TotalPriceLabel,
  ButtonContainer,
};
