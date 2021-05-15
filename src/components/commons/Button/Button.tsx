import * as Styled from './Button.styles';

export interface Props
  extends Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled' | 'onClick' | 'children'> {
  /** 버튼의 크기 및 폰트 크기 유형 */
  size: 'SM' | 'MD' | 'LG';
  backgroundColor?: string;
  fontColor?: string;
}

const Button = ({ disabled, onClick, size, backgroundColor, fontColor, children }: Props) => {
  return (
    <Styled.Button
      disabled={disabled}
      onClick={onClick}
      size={size}
      backgroundColor={backgroundColor}
      fontColor={fontColor}
    >
      {children}
    </Styled.Button>
  );
};

export default Button;
