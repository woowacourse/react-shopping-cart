import { Modal } from "river-modal-component";
import InfoIconSrc from "../../assets/infoIcon.png";
import { MAX_APPLICABLE_COUPONS } from "../../constants";
import { mockCoupons } from "../../mocks";
import formatPriceToKoreanWon from "../../util/formatPriceToKoreanWon";
import { Info, InfoIcon } from "../CartList/CheckoutSummary/style";
import CouponList from "../CouponList";
import BorderButton from "../common/BorderButton";

const CouponModal = () => {
  //   const { coupons, totalDiscountAmount } = useCoupons();
  const coupons = mockCoupons;
  const totalDiscountAmount = 0;

  return (
    <Modal.Content
      modalPosition="center"
      closeButtonPosition="bottom"
      size="small"
    >
      <Modal.Header title="쿠폰을 선택해 주세요" containClose />
      <Modal.Body>
        <Info>
          <InfoIcon src={InfoIconSrc} alt="Info Icon" />
          {`쿠폰은 최대 ${MAX_APPLICABLE_COUPONS}개까지 사용할 수 있습니다.`}
        </Info>
        <CouponList coupons={coupons} />
      </Modal.Body>
      <Modal.Footer align="center">
        <Modal.Close>
          <BorderButton size="full" bgColor="#000000" color="#ffffff">
            {formatPriceToKoreanWon(totalDiscountAmount)} 할인 적용
          </BorderButton>
        </Modal.Close>
      </Modal.Footer>
    </Modal.Content>
  );
};

export default CouponModal;
