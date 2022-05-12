import styled from 'styled-components';

const ButtonWrapper = styled.button`
  color: ${({theme}) => theme.WHITE};
  font-size: 24px;
  font-weight: 500;
  line-height: 12px;

  background-color: ${(props) => props.backgroundColor || 'transparent'};

  width: ${(props) => props?.width};
  height: ${(props) => props?.height};

  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};

  opacity: ${(props) => props.disabled && 0.2};
`;

export {ButtonWrapper};
