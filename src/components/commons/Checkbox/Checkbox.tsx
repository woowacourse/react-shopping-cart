import { InputHTMLAttributes, useState } from 'react';
import { Check } from '@assets/index';

import { StyledOuterCheckbox, StyledInnerCheckbox } from './Checkbox.styled';
import { useUpdateCheckedCartItems } from '@components/pages/CartPage/CartListSection/CartList/CartItem/useUpdateCheckedCartItems';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  productId?: number;
  border?: string | null;
  borderRadius?: string | number | null;
  backgroundColor?: string | null;
}

export const Checkbox = (props: CheckboxProps) => {
  const { productId } = props;
  const [isChecked, setIsChecked] = useState(false);

  useUpdateCheckedCartItems(productId ?? 0, isChecked);

  return (
    <StyledOuterCheckbox
      {...props}
      onClick={() => {
        setIsChecked(!isChecked);
      }}
    >
      {isChecked && (
        <StyledInnerCheckbox {...props} aria-label="checked">
          <Check />
        </StyledInnerCheckbox>
      )}
    </StyledOuterCheckbox>
  );
};
