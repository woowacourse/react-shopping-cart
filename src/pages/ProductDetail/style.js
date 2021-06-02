import styled from 'styled-components';

export const Container = styled.div`
  width: 36rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ProductSummary = styled.div`
  width: 100%;
  padding: 2rem 0;

  h2 {
    text-align: center;
    font-size: 2.5rem;
    line-height: 1.5;
    border-bottom: 0.3rem solid #e5e5e5;
  }

  h3 {
    font-size: 2rem;
    font-weight: 600;
  }
`;

export const Price = styled.div`
  display: flex;
  justify-content: space-between;
  p {
    font-size: 1.5rem;
    font-weight: 700;
  }
`;
