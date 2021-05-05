import styled from "styled-components";
import { COLOR } from "../../constants/theme";

const Container = styled.div`
  display: inline-block;
  position: relative;
`;

const Desc = styled.div`
  margin-top: 1.1rem;
  padding-left: 0.75rem;
  color: ${COLOR.GRAY_600};
`;

const Name = styled.p`
  font-size: 1rem;
`;

const Price = styled.p`
  font-size: 1.25rem;
`;

const CartButton = styled.button`
  position: absolute;
  right: 0;
  bottom: 0.7rem;
`;

export { Container, Desc, Name, Price, CartButton };
