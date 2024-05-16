import FooterButton from '../FooterButton/FooterButton';
import { hasCheckedItemsState } from '../../recoil/selectors';
import { useRecoilValue } from 'recoil';

export default function ConfirmButton() {
  const hasCheckedItems = useRecoilValue(hasCheckedItemsState);
  return <FooterButton buttonText="주문 확인" disabled={!hasCheckedItems} />;
}
