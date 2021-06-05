import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const LineText = styled.span`
  :after {
    content: '';
    height: 5px;
    display: block;
    background-color: var(--color-mint);
    transform: translateY(-7px);
    opacity: 0.5;
  }
`;
