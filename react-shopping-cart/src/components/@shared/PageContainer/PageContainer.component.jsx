import styled from 'styled-components';
import FlexBox from '../FlexBox/FlexBox.component';

const PageContainer = styled(FlexBox).attrs(props => ({
  justifyContent: 'center',
}))`
  margin: 60px 0;
  min-width: 1350px;
`;

export default PageContainer;
