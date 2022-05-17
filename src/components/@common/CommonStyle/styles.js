import styled from '@emotion/styled';
import { COLORS } from 'styles/theme';

const FlexWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  width: ${(props) => props.width || '100%'};
  align-items: ${(props) => props.alignItem || 'center'};
  justify-content: ${(props) => props.justifyContent};
`;

const HR = styled.hr`
  border: 2px solid ${COLORS.GRAY_003};
  margin: 1rem 0;
`;

export { FlexWrapper, HR };
