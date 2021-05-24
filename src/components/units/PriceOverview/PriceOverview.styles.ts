import styled from '@emotion/styled';

type RootProps = {
  border?: boolean;
};

const Root = styled.div<RootProps>`
  width: 448px;
  display: flex;
  flex-direction: column;
  border: ${(props) => (props.border ? `1px solid  ${props.theme.borderColor.lightGrey}` : 'none')};
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
  background-color: ${({ theme }) => theme.borderColor.lightGrey};
  border: none;
  box-sizing: border-box;
`;

const TotalPriceContent = styled.div`
  padding: 34px 30px;
`;

const OrderButton = styled.button`
  border: none;
  background-color: ${({ theme }) => theme.bgColor.primary};
  color: ${({ theme }) => theme.textColor.defaultWhite};
`;

export default { Root, TotalPriceHeader, Divider, TotalPriceContent, OrderButton };
