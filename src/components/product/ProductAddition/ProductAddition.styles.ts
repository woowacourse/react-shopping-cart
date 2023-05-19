import styled from 'styled-components';

import { Text } from '../../common/Text/Text.styles';

const ProductAdditionContainer = styled.div`
  width: 450px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacer.spacing3};
  padding-bottom: ${({ theme }) => theme.spacer.spacing3};
  border-bottom: 1px solid ${({ theme }) => theme.color.gray3};
`;

const ProductInformationContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacer.spacing3};

  & > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacer.spacing3};
  }
`;

const ProductImage = styled.img`
  width: 102px;
  height: 102px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.small};
`;

const ProductName = styled(Text)`
  margin-bottom: ${({ theme }) => theme.spacer.spacing1};
`;

const ProductPrice = styled(Text)`
  font-weight: bold;
`;

const TotalPriceContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacer.spacing5};
  display: flex;
  justify-content: space-between;
`;

const TotalPriceLabel = styled(Text)`
  font-weight: 600;
`;

const ButtonContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacer.spacing4};
  display: flex;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacer.spacing2};
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
