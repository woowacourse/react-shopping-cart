import styled from 'styled-components';

const HighlightText = styled.p`
  position: relative;
  font-weight: 700;
  display: inline-block;
  text-align: center;
  padding: 0 2px;
  font-size: 20px;

  &::after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 8px;
    background-color: ${({ theme }) => theme.colors['MINT_001']};
    opacity: 0.5;
    z-index: -1;
  }
`;

export default HighlightText;
