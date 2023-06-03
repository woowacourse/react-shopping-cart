import styled from 'styled-components';

export const Section = styled.section`
  width: 30%;
  height: 25rem;
  border: 1px solid darkgray;

  @media (max-width: 840px) {
    margin-top: 5rem;
    width: 70%;
  }
`;

export const Title = styled.h3`
  height: 20%;
  font-size: 1.3rem;
  padding: 2rem;
  border-bottom: 1px solid darkgray;
`;

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80%;
  font-size: 1.5rem;
  font-weight: 700;

  padding: 2rem;
`;

export const PriceWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const TotalPrice = styled(PriceWrapper)`
  padding-top: 1rem;
`;
