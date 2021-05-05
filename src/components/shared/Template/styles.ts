import styled from 'styled-components';

interface Props {
  backgroundColor?: string;
}

const TemplateContainer = styled.div<Props>`
  display: flex;
  justify-content: center;
   ${({ backgroundColor }) => backgroundColor && `background-color: ${backgroundColor}`};
`;

export default TemplateContainer;

