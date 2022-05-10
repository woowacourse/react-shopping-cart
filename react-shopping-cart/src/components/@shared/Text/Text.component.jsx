import styled from 'styled-components';

const Text = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: ${props => `${props.fontSize ?? 16}px`};
  letter-spacing: 0.5px;
  color: #333333;
`;

export default Text;
