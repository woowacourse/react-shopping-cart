import * as Styled from './CheckBox.style';

export interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  cartItemId?: number;
  isChecked: boolean;
}

export default function CheckBox({ cartItemId, isChecked, ...props }: CheckBoxProps) {
  const checkBoxId = cartItemId ? `cart-item-${cartItemId}` : 'cart-select-all';

  return (
    <>
      <Styled.CheckBoxInput type="checkbox" id={checkBoxId} {...props} />
      <Styled.CheckBox htmlFor={checkBoxId} isChecked={isChecked}></Styled.CheckBox>
    </>
  );
}
