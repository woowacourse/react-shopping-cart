import styled from 'styled-components';

export const CompletedContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  align-items: center;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Title = styled.p`
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 3.475rem;
`;

export const SubTitle = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.8rem;
`;

export const TotalAmountLabel = styled.p`
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.6rem;
`;

export const TotalAmountStyle = styled.p`
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 3.475rem;
`;
