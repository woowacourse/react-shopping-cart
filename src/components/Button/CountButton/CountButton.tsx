import Plus from '../../../assets/plus.svg';
import Minus from '../../../assets/minus.svg';
import * as S from './CountButton.style';

type CountType = 'plus' | 'minus';

export default function CountButton({ type, onClick }: { type: CountType; onClick: () => void }) {
  return (
    <S.ButtonContainer onClick={onClick}>
      <img src={type === 'plus' ? Plus : Minus} alt={type === 'plus' ? '상품 수량 더하기' : '상품 수량 빼기'} />
    </S.ButtonContainer>
  );
}
