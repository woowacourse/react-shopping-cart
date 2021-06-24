import styled from 'styled-components';
import { COLOR } from '../../constants';

export const Container = styled.div`
  max-width: 40rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const DetailWrapper = styled.div`
  width: 100%;
  margin-top: 1.5rem;
`;

export const NameWrapper = styled.div`
  width: 100%;
  padding: 1rem 2rem;
  border-bottom: 0.3rem solid ${COLOR['GRAY-500']};

  h2 {
    color: ${COLOR.BLACK};
    font-size: 2rem;
    line-height: 1.5;
  }
`;
export const PriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;

  p {
    padding: 0 2rem;
    font-size: 1.5rem;
  }
`;
