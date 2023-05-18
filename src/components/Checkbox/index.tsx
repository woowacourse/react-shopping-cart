import checkedIcon from '@Asset/checkedIcon.png';

import * as S from './style';

type CheckboxProps = {
  isChecked: boolean;
  changeEvent: () => void;
};

function Checkbox({ isChecked, changeEvent }: CheckboxProps) {
  return (
    <S.ProductItemCheckboxLabel checked={isChecked}>
      <S.ProductItemCheckbox
        type="checkbox"
        className="checkbox-product-select-item"
        onChange={changeEvent}
        checked={isChecked}
      />
      {isChecked && <S.ProductItemCheckboxCheckIcon src={checkedIcon} />}
    </S.ProductItemCheckboxLabel>
  );
}

export default Checkbox;
