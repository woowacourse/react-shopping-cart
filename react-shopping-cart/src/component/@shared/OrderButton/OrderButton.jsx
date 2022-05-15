import styled from "styled-components";
import Button from "component/@shared/Button/Button";

const OrderButton = styled(Button)`
  width: 258px;
  height: 48px;
  font-size: 16px;
  background: ${({ theme }) => theme.colors.cyon};
`;

export default OrderButton;
