import * as S from './style';

import CheckedItem from '../CheckedItem/CheckedItem';
import { checkedItemsState } from '../../../recoil/selectors';
import { useRecoilValue } from 'recoil';

export default function CheckedItemContainer() {
  const items = useRecoilValue(checkedItemsState);

  const totalCartItemsCount = items.length;
  const totalProductsCount = items.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <>
      <S.DescriptionContainer>
        <S.Description>{`총 ${totalCartItemsCount}종류의 상품 ${totalProductsCount}개를 주문합니다.`}</S.Description>
        <S.Description>{`최종 결제 금액을 확인해주세요.`}</S.Description>
      </S.DescriptionContainer>

      {items.map((item) => {
        return <CheckedItem cartItem={item} key={item.id} />;
      })}
    </>
  );
}
