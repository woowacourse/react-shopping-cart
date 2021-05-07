import styled from '@emotion/styled';

const Root = styled.div`
  width: 448px;
  display: flex;
  flex-direction: column;
  border: 1px solid ${(props) => props.theme.borderColor.lightGrey};
`;

const TotalPriceHeader = styled.div`
  width: 100%;
  padding: 22px 30px;
  font-size: 24px;
`;

const Divider = styled.hr`
  width: 100%;
  height: 3px;
  margin: 0;
  background-color: ${(props) => props.theme.borderColor.lightGrey};
  border: none;
  box-sizing: border-box;
`;

const TotalPriceContent = styled.div`
  padding: 34px 30px;
`;

const HighlightTextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 70px;
`;

const OrderButton = styled.button`
  border: none;
  background-color: ${(props) => props.theme.bgColor.primary};
  color: ${(props) => props.theme.textColor.defaultWhite};
`;

export default { Root, TotalPriceHeader, Divider, TotalPriceContent, HighlightTextWrapper, OrderButton };
