import * as S from './ConfirmPurchaseSection.style';

import Title from '../common/Title/Title';
import Spacer from '../common/Spacer/Spacer';
import CartItemList from '../CartItemList/CartItemList';
import PriceTable from '../PriceTable/PriceTable';
import useCartItemList from '../../recoil/cartItemList/useCartItemList';
import Button from '../common/Button/Button';
import { useCartItemSelectedIdList } from '../../recoil/cartItem/useCartItemSelectedIdList';
import Text from '../common/Text/Text';
import CheckboxWithLabel from '../CheckboxWithLabel/CheckboxWithLabel';
import { useState } from 'react';

const ConfirmPurchaseSection = () => {
  const { cartItemList } = useCartItemList();
  const { selectedIdList } = useCartItemSelectedIdList();

  const totalProducts = selectedIdList.length;

  const totalQuantity = cartItemList
    .filter(({ id }) => selectedIdList.includes(id))
    .reduce((sum, { quantity }) => {
      return sum + quantity;
    }, 0);

  const [kkangchon, setKkangchon] = useState(false);

  return (
    <S.ConfirmPurchaseSection>
      <Title
        title="주문 확인"
        description={`
        총 ${totalProducts}종류의 상품 ${totalQuantity}개를 주문합니다.
      최종 결제금액을 확인해 주세요
      `}
      />
      <Spacer height={36} />
      <CartItemList type="confirm" />
      <Spacer height={32} />
      <Button size="l" width="full" color="default">
        쿠폰 적용
      </Button>
      <Spacer height={32} />
      <S.CheckboxTitleContainer>
        <Text size="m" weight="l">
          배송 정보
        </Text>
        <CheckboxWithLabel labelText="제주도 및 도서 산간 지역" isChecked={kkangchon} onClick={() => setKkangchon} />
      </S.CheckboxTitleContainer>
      <Spacer height={32} />
      <PriceTable />
    </S.ConfirmPurchaseSection>
  );
};

export default ConfirmPurchaseSection;
