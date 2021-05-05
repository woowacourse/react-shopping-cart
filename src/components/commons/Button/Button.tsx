import { COLORS } from '../../../constants';
import * as Styled from './Button.styles';

export interface Props {
  children: React.ReactNode;
  size: 'SM' | 'MD' | 'LG';
  backgroundColor?: string;
  fontColor?: string;
}

const Button = ({ children, size = 'SM', backgroundColor = COLORS.MINT_500, fontColor = COLORS.WHITE }: Props) => {
  return (
    <Styled.Button size={size} backgroundColor={backgroundColor} fontColor={fontColor}>
      {children}
    </Styled.Button>
  );
};

export default Button;
