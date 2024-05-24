import { useRecoilValueLoadable } from "recoil";
import { Modal } from "river-modal-component";
import InfoIconSrc from "../../assets/infoIcon.png";
import { MAX_APPLICABLE_COUPONS } from "../../constants";
import { couponsState } from "../../recoil/atoms";
import ApplyCouponButton from "../ApplyCouponButton";
import { Info, InfoIcon } from "../CartList/CheckoutSummary/style";
import CouponList from "../CouponList";
import RecoilSuspense from "../common/RecoilSuspense";

const CouponModal = () => {
  const coupons = useRecoilValueLoadable(couponsState);

  return (
    <RecoilSuspense loadable={coupons} fallback={<div>로딩 중</div>}>
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
          <CouponList coupons={coupons.contents} />
        </Modal.Body>
        <Modal.Footer align="center">
          <Modal.Close>
            <ApplyCouponButton />
          </Modal.Close>
        </Modal.Footer>
      </Modal.Content>
    </RecoilSuspense>
  );
};

export default CouponModal;
