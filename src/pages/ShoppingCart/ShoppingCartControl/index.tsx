import Checkbox from '@Components/Checkbox';

import * as S from './style';

function ShoppingCartControl() {
  return (
    <S.Container>
      <Checkbox
        isChecked={true}
        updateSelectedState={() => {
          console.log('#');
        }}
        size="small"
      />
      <S.SelectedSituation>전체선택(2/3)</S.SelectedSituation>
      <S.DeleteButton>선택삭제</S.DeleteButton>
    </S.Container>
  );
}

export default ShoppingCartControl;
