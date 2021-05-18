import React, { ReactElement, FC } from "react";

import { OrderProductItemProps } from "../OrderProductItem";
import { Container, Header, ShowDetailLink } from "./style";

interface OrderListProps {
  id: string;
  showDetailLinkHref: string;
  children: ReactElement<OrderProductItemProps>[];
}
const OrderList: FC<OrderListProps> = ({ id, showDetailLinkHref, children }) => (
  <Container>
    <Header>
      <span>주문번호:{id}</span>
      {showDetailLinkHref && <ShowDetailLink to={showDetailLinkHref}>{"상세보기 >"}</ShowDetailLink>}
    </Header>
    <ul>{children}</ul>
  </Container>
);

export default OrderList;
export { OrderListProps };
