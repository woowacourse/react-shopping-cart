import { InputHTMLAttributes } from 'react';
import * as S from './CheckBox.styles';
import theme from 'src/styles/theme';

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  backgroundColor?: string;
}

const CheckBox = ({
  backgroundColor,
  id,
  name,
  children,
  ...props
}: CheckBoxProps) => {
  return (
    <S.SelectLabel htmlFor={id ?? name}>
      <S.SelectInput
        type="checkbox"
        backgroundColor={backgroundColor ?? theme.color.primary}
        {...props}
      />
      {children}
    </S.SelectLabel>
  );
};

export default CheckBox;
