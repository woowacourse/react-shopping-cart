import styled from 'styled-components';
import Text from 'components/@common/Text';

export const EllipsisText = styled(Text)`
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
