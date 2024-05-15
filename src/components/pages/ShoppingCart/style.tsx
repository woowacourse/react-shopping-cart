import styled from 'styled-components';

export const ShoppingCart = styled.section`
  width: 26.875rem;
  min-height: 58.5rem;
  position: relative;

  background-color: ${(props) => props.theme.color.white};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.8125rem;

  padding: 2.25rem 1.5rem;
  padding-bottom: 8rem;
`;
