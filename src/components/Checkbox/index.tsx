import checkedIcon from '@Assets/checkedIcon.png';

import * as S from './style';

function Checkbox({ checked, onChange }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <S.ProductItemCheckboxLabel checked={checked ?? false}>
      <S.ProductItemCheckbox
        type="checkbox"
        className="checkbox-product-select-item"
        onChange={onChange}
        checked={checked}
      />
      {checked && <S.ProductItemCheckboxCheckIcon src={checkedIcon} />}
    </S.ProductItemCheckboxLabel>
  );
}

export default Checkbox;
