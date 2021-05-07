import styled from '@emotion/styled';

const Root = styled.span`
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
    background-color: ${(props) => props.theme.bgColor.primary};
    opacity: 0.5;
    z-index: -1;
  }
`;

export default {
  Root,
};
