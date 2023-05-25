import { InputHTMLAttributes, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { checkedCartItemsState } from '@recoil/atom';

import { StyledOuterCheckbox, StyledInnerCheckbox } from './Checkbox.styled';
import { Check } from '@assets/index';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  productId?: number;
  border?: string | null;
  borderRadius?: string | number | null;
  backgroundColor?: string | null;
}

export const Checkbox = (props: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const { productId } = props;
  const setCheckedCartItems = useSetRecoilState(checkedCartItemsState);

  useEffect(() => {
    if (productId && isChecked) {
      setCheckedCartItems(prev => {
        const newCheckedCartItems = {
          ...prev,
          [`productId${productId}`]: productId,
        };

        return newCheckedCartItems;
      });
    }

    if (productId && !isChecked) {
      setCheckedCartItems(prev => {
        const newCheckedCartItems = {
          ...prev,
        };
        delete newCheckedCartItems[`productId${productId}`];

        return newCheckedCartItems;
      });
    }
  }, [isChecked, productId, setCheckedCartItems]);

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
