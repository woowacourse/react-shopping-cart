import styled from 'styled-components';

const DetailItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 640px;
`;

const ItemNameWrapper = styled.span`
  display: flex;
  align-items: flex-start;
  width: 570px;

  font-weight: 700;
  font-size: 32px;
  line-height: 36px;
  letter-spacing: 0.5px;
  color: ${({theme}) => theme.COLOR.BLACK};

  margin-top: 21px;
`;

const ItemPriceWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 60px;

  margin-top: 33px;
  margin-bottom: 10px;
  padding: 0 20px;

  border-top: ${({theme}) => `4px solid ${theme.COLOR.GRAY_700}`};
`;

export {DetailItemWrapper, ItemNameWrapper, ItemPriceWrapper};
