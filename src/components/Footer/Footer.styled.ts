import styled from 'styled-components';

interface FooterContainerProps {
  $backgroundColor: string;
}

export const FooterContainer = styled.div<FooterContainerProps>`
  background-color: ${(props) => props.$backgroundColor};
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 6.4rem;

  color: #ffffff;
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.6rem;
  text-align: center;

  justify-content: center;
  align-items: center;
`;
