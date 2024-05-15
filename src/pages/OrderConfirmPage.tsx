import { selectedCartItemState } from '../recoil/atoms/atoms';
import { useRecoilValue } from 'recoil';

function OrderConfirmPage() {
  const selectedItems = useRecoilValue(selectedCartItemState);

  return (
    <>
      {selectedItems.map((el) => el.id)}
      <div>OrderConfirmPage</div>
    </>
  );
}

export default OrderConfirmPage;
