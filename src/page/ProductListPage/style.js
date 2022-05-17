import {FlexRow} from 'style/common';
import styled from 'styled-components';

const ProductListPageLayout = styled(FlexRow)`
  justify-content: center;
  margin-top: 140px;
`;

const ProductListBox = styled.div`
  display: grid;
  gap: 3vh 3vw;
  grid-template-columns: repeat(4, 1fr);
  margin: 0 10%;
`;

export {ProductListPageLayout, ProductListBox};
