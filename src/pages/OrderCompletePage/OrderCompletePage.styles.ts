import styled from '@emotion/styled';

const Root = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 24px;
  font-weight: 500;
  padding: 108px 0;
`;

const OrderCompleteImage = styled.img`
  width: 512px;
`;

const OrderCompleteText = styled.div`
  margin-top: 64px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 40px;
  gap: 24px;
`;

export default {
  Root,
  OrderCompleteImage,
  OrderCompleteText,
  ButtonWrapper,
};
