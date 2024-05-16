import { useRecoilValue } from 'recoil';
import { hasCheckedItemsState } from '../../recoil/selectors';
import FooterButton from '../FooterButton/FooterButton';

export default function ConfirmButton() {
  const hasCheckedItems = useRecoilValue(hasCheckedItemsState);
  return <FooterButton buttonText="주문 확인" disabled={!hasCheckedItems} />;
}
