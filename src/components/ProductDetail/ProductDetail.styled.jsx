import styled from "styled-components";
import { COLOR } from "../../constants/style";

export const ProductDetail = styled.section`
  margin: 0 auto;
  width: 40rem;
`;

export const ImgContainer = styled.div`
  padding: 1.5rem 2.25rem;
  border-bottom: 4px solid ${COLOR.GRAY.LIGHT_100};

  & > *:not(:last-child) {
    margin-bottom: 1.25rem;
  }
`;

export const Name = styled.h1`
  font-size: 2rem;
  line-height: 3rem;
  font-weight: 700;
  height: 3rem;
`;

export const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
`;

export const PriceLabel = styled.b`
  font-size: 1.5rem;
  line-height: 2.25rem;
`;

export const Price = styled.strong`
  font-size: 2rem;
  line-height: 3rem;
`;

export const ButtonContent = styled.span`
  font-size: 2rem;
  line-height: 3rem;
  font-weight: 700;
`;
