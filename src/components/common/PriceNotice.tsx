import styled from 'styled-components';
import theme from 'styles/theme';

import Division from './Division';
import UnderLinedText from './UnderLinedText';

const PriceNotice = ({ title, priceDescription, price }) => {
  return (
    <>
      <StyledTitle>{title}</StyledTitle>
      <StyledDivision>
        <Division color={theme.colors.GRAY_400} height='3px' />
      </StyledDivision>
      <StyledBottom>
        <UnderLinedText fontSize='2rem' fontWeight='700'>
          {priceDescription}
        </UnderLinedText>
        <UnderLinedText fontSize='2rem' fontWeight='700'>
          {price.toLocaleString()}원
        </UnderLinedText>
      </StyledBottom>
    </>
  );
};

export default PriceNotice;

const StyledTitle = styled.p`
  font-size: 2.4rem;
  margin-bottom: 5.3rem;
`;

const StyledDivision = styled.div`
  position: absolute;
  width: 100%;
  top: 8.1rem;
  right: 0;
`;

const StyledBottom = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 6.8rem;
`;
