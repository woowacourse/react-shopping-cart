import * as Styled from './CheckBox.style';

export interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  itemId?: number;
  isChecked: boolean;
}

export default function CheckBox({ itemId, isChecked, ...props }: CheckBoxProps) {
  const checkBoxId = itemId ? `item-${itemId}` : 'select-all';

  return (
    <>
      <Styled.CheckBoxInput type="checkbox" id={checkBoxId} {...props} />
      <Styled.CheckBox htmlFor={checkBoxId} isChecked={isChecked}></Styled.CheckBox>
    </>
  );
}
