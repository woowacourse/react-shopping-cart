import styled from "styled-components";

import { FlexBetween } from "../../SharedStyled/Flex";
import { COLOR } from "../../constants/theme";

const Container = styled.div`
  display: inline-block;
  position: relative;
`;

const ItemInfoWrap = styled(FlexBetween("div"))`
  padding: 0 0.8rem;
`;

const Desc = styled.div`
  margin-top: 1.1rem;
  color: ${COLOR.GRAY_600};
`;

const Name = styled.p`
  font-size: 1rem;
`;

const Price = styled.p`
  font-size: 1.25rem;
`;

const CartButton = styled.button``;

export { Container, ItemInfoWrap, Desc, Name, Price, CartButton };
