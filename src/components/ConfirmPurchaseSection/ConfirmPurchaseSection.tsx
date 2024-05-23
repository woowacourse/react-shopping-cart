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
import { useRecoilState } from 'recoil';
import { hasExtraDeliveryFeeAtom } from '../../recoil/price/priceSelector';
import useModal from '../../hooks/useModal';
import SelectCouponModal from '../SelectCouponModal/SelectCouponModal';

const ConfirmPurchaseSection = () => {
  const { cartItemList } = useCartItemList();
  const { selectedIdList } = useCartItemSelectedIdList();
  const [hasExtraDeliveryFee, setHasExtraDeliveryFee] = useRecoilState(
    hasExtraDeliveryFeeAtom,
  );

  const { modalOpened, handleModalOpen, handleModalClose } = useModal();

  const selectedCartItemList = cartItemList.filter(({ id }) =>
    selectedIdList.includes(id),
  );

  const totalProducts = selectedIdList.length;

  const totalQuantity = selectedCartItemList.reduce((sum, { quantity }) => {
    return sum + quantity;
  }, 0);

  return (
    <S.ConfirmPurchaseSection>
      <SelectCouponModal modalOpened={modalOpened} onClose={handleModalClose} />
      <Title
        title="주문 확인"
        description={`
        총 ${totalProducts}종류의 상품 ${totalQuantity}개를 주문합니다.
      최종 결제금액을 확인해 주세요
      `}
      />
      <Spacer height={36} />
      <CartItemList type="confirm" cartItemList={selectedCartItemList} />
      <Spacer height={32} />
      <Button size="l" width="full" color="default" onClick={handleModalOpen}>
        쿠폰 적용
      </Button>
      <Spacer height={32} />
      <S.CheckboxTitleContainer>
        <Text size="m" weight="l">
          배송 정보
        </Text>
        <CheckboxWithLabel
          labelText="제주도 및 도서 산간 지역"
          isChecked={hasExtraDeliveryFee}
          onClick={() => setHasExtraDeliveryFee(!hasExtraDeliveryFee)}
        />
      </S.CheckboxTitleContainer>
      <Spacer height={32} />
      <PriceTable type="confirm" />
    </S.ConfirmPurchaseSection>
  );
};

export default ConfirmPurchaseSection;
