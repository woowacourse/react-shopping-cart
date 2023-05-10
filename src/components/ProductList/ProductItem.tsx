import styled from 'styled-components';
import { theme } from '@styles/theme';
import AddCartButton from './AddCartButton';

const ProductItem = () => {
  return (
    <Wrapper>
      <Picture />
      <InformationWrapper>
        <TitleAndPriceWrapper>
          <Title>PET보틀-정사각(420ml)</Title>
          <Price>43,400 원</Price>
        </TitleAndPriceWrapper>
        <AddCartButton />
      </InformationWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 282px;
`

const Picture = styled.div`
  width: 282px;
  height: 282px;

  margin-bottom: 18px;

  background: rgba(128, 0, 160, 1);
`;

const InformationWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  margin-left: 10px;
`;

const TitleAndPriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;

  letter-spacing: 0.5px;

  color: ${theme.colors.primaryBlack};
`;

const Price = styled.span`
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;

  letter-spacing: 0.5px;

  color: ${theme.colors.primaryBlack};
`;

export default ProductItem;
