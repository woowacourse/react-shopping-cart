import { useNavigate } from 'react-router';

import Text from '../@common/Text/Text';

import { ButtonStyle } from './PayButton.styles';

function PayButton({
  orderItemsQuantity,
  productTypeCount,
  orderPrice,
}: {
  orderItemsQuantity: number;
  productTypeCount: number;
  orderPrice: number;
}) {
  const navigate = useNavigate();

  return (
    <button
      css={ButtonStyle}
      onClick={() =>
        navigate('/price-check', {
          state: { orderItemsQuantity, productTypeCount, orderPrice },
        })
      }
    >
      <Text variant="body">결제하기</Text>
    </button>
  );
}

export default PayButton;
