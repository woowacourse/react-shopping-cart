import { useRecoilState } from 'recoil';

import Text from '../common/Text/Text';
import Title from '../common/Title/Title';
import useModal from '../../hooks/components/useModal';
import Spacer from '../common/Spacer/Spacer';
import Button from '../common/Button/Button';
import PriceTable from '../PriceTable/PriceTable';
import * as S from './ConfirmPurchaseSection.style';
import CartItemList from '../CartItemList/CartItemList';
import { hasExtraDeliveryFeeState } from '../../recoil/cartItem/atom';
import CheckboxWithLabel from '../CheckboxWithLabel/CheckboxWithLabel';
import SelectCouponModal from '../SelectCouponModal/SelectCouponModal';
import useSelectedCartItemList from '../../hooks/cartItem/useSelectedCartItemList';

const ConfirmPurchaseSection = () => {
  const { selectedCartItemList, totalProducts, totalQuantity } =
    useSelectedCartItemList();
  const [hasExtraDeliveryFee, setHasExtraDeliveryFee] = useRecoilState(
    hasExtraDeliveryFeeState,
  );

  const { modalOpened, handleModalOpen, handleModalClose } = useModal();

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
