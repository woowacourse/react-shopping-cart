import styled from "styled-components";

const ConfirmPageLayout = styled.div`
  height: calc(100vh - 128px);
  padding: 36px 24px 0px 24px;

  overflow-y: scroll;
`;

const Wrapper = styled.div`
  height: calc(100vh - 128px);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 20px;
`;

const ButtonText = styled.span`
  font-size: 16px;
  line-height: 16px;
  font-weight: 700;
`;

const BorderLine = styled.div`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.COLOR.grey};
`;

const PriceSection = styled.div`
  margin-top: 20px;
  gap: 8px;
  display: flex;
  flex-direction: column;

  margin-bottom: 24px;
`;

const ShippingInfoWrapper = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  flex-direction: column;

  margin-top: 32px;
  row-gap: 16px;
`;

const ShippingCheckboxWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const ShippingInfoText = styled.span`
  height: 16px;
  line-break: 16px;
  font-size: 16px;
  font-weight: 700;
`;

const Styled = {
  ConfirmPageLayout,
  PriceSection,
  Wrapper,
  ButtonText,
  BorderLine,
  ShippingInfoWrapper,
  ShippingCheckboxWrapper,
  ShippingInfoText,
};

export default Styled;
