import checkedIcon from '@Asset/checkedIcon.png';

import * as S from './style';

type CheckboxProps = {
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
};

function Checkbox({ checked, setChecked }: CheckboxProps) {
  return (
    <S.ProductItemCheckboxLabel checked={checked}>
      <S.ProductItemCheckbox
        type="checkbox"
        className="checkbox-product-select-item"
        onChange={() => setChecked(!checked)}
        checked={checked}
      />
      {checked && <S.ProductItemCheckboxCheckIcon src={checkedIcon} />}
    </S.ProductItemCheckboxLabel>
  );
}

export default Checkbox;
