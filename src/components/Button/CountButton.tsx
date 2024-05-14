import { CountButtonStyle } from './Button.style';
import Plus from '../../assets/plus.svg';
import Minus from '../../assets/minus.svg';

type CountType = 'plus' | 'minus';

export default function CountButton({ type }: { type: CountType }) {
  return (
    <CountButtonStyle>
      <img
        src={type === 'plus' ? Plus : Minus}
        alt={type === 'plus' ? '상품 수량 더하기' : '상품 수량 빼기'}
      />
    </CountButtonStyle>
  );
}
