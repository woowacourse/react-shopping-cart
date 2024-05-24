import { SIZE } from '@styles/style.constant';
import styled from 'styled-components';

export const SelectListItemList = styled.section`
  max-height: calc(100vh - ${SIZE.navigationHeight} - ${SIZE.bottomButtonHeight} - 240px - 112px - 155px - 12px);
  overflow-y: auto;
`;
