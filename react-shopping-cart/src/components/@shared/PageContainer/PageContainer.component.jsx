import FlexBox from '../FlexBox/FlexBox.component';
import styled from 'styled-components';

const PageContainer = styled(FlexBox).attrs(props => ({
  justifyContent: 'center',
  direction: props.direction,
  alignItems: props.alignItems,
}))`
  margin: 60px 0;
  min-width: 1350px;
`;

export default PageContainer;
