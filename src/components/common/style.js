import styled from 'styled-components';

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction || 'row'};
  align-items: ${(props) => props.alignItems || 'center'};
  justify-content: ${(props) => props.justifyContent || 'center'};
  gap: ${(props) => props.gap || 0};

  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '100%'};
`;

export {FlexWrapper};
