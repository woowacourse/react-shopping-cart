import { useRecoilState } from 'recoil';
import { remoteShippingOptionState } from '../../../recoil/atoms';

import { CheckBox } from '../../common';
import * as Styled from './RemoteShippingCheckBox.style';

export default function RemoteShippingCheckBox() {
  const [remoteShippingOption, setRemoteShippingOption] = useRecoilState(remoteShippingOptionState);

  return (
    <Styled.RemoteShippingCheckBox>
      <Styled.Title>배송 정보</Styled.Title>
      <Styled.CheckBoxContainer>
        <CheckBox
          isChecked={remoteShippingOption}
          onClick={() => setRemoteShippingOption(!remoteShippingOption)}
        />
        <span>제주도 및 도서 산간 지역</span>
      </Styled.CheckBoxContainer>
    </Styled.RemoteShippingCheckBox>
  );
}
