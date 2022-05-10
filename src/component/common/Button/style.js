import styled from 'styled-components';

const ButtonWrapper = styled.button`
  color: #ffffff;
  font-size: 24px;
  font-weight: 500;
  line-height: 12px;
  background-color: ${(props) => {
    props.backgroundColor || 'transparent';
  }};
  width: ${(props) => {
    props.width || '100%';
  }};
  height: ${(props) => {
    props.height || '100%';
  }};
`;

export {ButtonWrapper};
