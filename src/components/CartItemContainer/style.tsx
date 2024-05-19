import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.8125rem;

  padding: 2.25rem 1.5rem;
  padding-bottom: 8rem;
`;

export const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100%;

  text-align: center;
`;

export const EmptyCartMessage = styled.p`
  ${(props) => props.theme.typography.content};
  color: ${(props) => props.theme.color.captionBlack};
`;
