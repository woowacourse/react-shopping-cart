import styled from "styled-components";
import { COLOR } from "../../constants/theme";

const Container = styled.div`
  width: 90%;
  max-width: 40rem;
  margin: 3rem auto;
`;

const ImageMain = styled.div`
  border-bottom: 0.25rem solid ${COLOR.GRAY_250};
  padding: 0 1.5rem;
`;

const ImageTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${COLOR.GRAY_600};
  padding: 1rem 0;
`;

const ImageDesc = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
  padding: 2rem 1.5rem 3rem;
`;

const Price = styled.p`
  font-size: 2rem;
`;

export { Container, ImageMain, ImageTitle, ImageDesc, Price };
