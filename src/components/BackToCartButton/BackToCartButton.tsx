import { useNavigate } from 'react-router';

import Text from '../@common/Text/Text';

import { ButtonStyle } from './BackToCartButton.styles';

function BackToCartButton() {
  const navigate = useNavigate();

  return (
    <button css={ButtonStyle} onClick={() => navigate('/')}>
      <Text varient="body">장바구니로 돌아가기</Text>
    </button>
  );
}

export default BackToCartButton;
