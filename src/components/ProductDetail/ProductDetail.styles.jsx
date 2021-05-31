import styled from "styled-components";
import { COLOR } from "../../constants/style";

export const ProductDetail = styled.div`
  max-width: 30rem;
  min-width: 20rem;
  margin: 0 auto;
  text-align: center;
`;

export const ImgWrapper = styled.div`
  width: 100%;
  height: 30rem;
  position: relative;
  margin-bottom: 2rem;
  border-bottom: 1px solid ${COLOR.GRAY_300};
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
`;

export const Name = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export const Price = styled.div`
  padding-bottom: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid ${COLOR.GRAY_300};
`;

export const Cart = styled.div``;
