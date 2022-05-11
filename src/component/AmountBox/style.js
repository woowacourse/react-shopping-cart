import styled from 'styled-components';

const AmountBoxWrapper = styled.div`
  box-sizing: border-box;

  width: 448px;
  height: 318px;

  border: ${({theme}) => `1px solid ${theme.GRAY_500}`};
  padding: 30px;
`;

const AmountBoxHeaderWrapper = styled.div`
  width: 100%;
  font-size: 24px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: ${({theme}) => `3px solid ${theme.GRAY_500}`};
`;

const PriceInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 34px 0 68px;

  & p {
    font-size: 20px;
    font-weight: 700;
    background: linear-gradient(to top, #2ac1bc, transparent 50%);
  }
`;

export {AmountBoxWrapper, AmountBoxHeaderWrapper, PriceInfoWrapper};
