import { SIZE } from '@styles/style.constant';
import styled from 'styled-components';

export const SelectedItemList = styled.section`
  //155px : navigation ~ SelectedItemList 까지의 거리
  // 32px : SelectedItemList ~ 쿠폰
  // 416px 쿠폰 ~금액
  max-height: calc(
    100vh - ${SIZE.navigationHeight} - ${SIZE.bottomButtonHeight} - 155px - 416px - 32px - ${SIZE.layoutPadding}
  );
  min-height: 112px;
  overflow-y: auto;
  margin-top: 36px;
`;
