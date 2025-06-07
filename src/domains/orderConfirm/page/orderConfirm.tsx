import { useState } from "react";
import Button from "../../../components/Button/Button";
import { Footer } from "../../../layout/Footer/Footer";
import Header from "../../../layout/Header/Header";
import Main from "../../../layout/Main/Main";
import { PageLayout } from "../../../layout/PageLayout/PageLayout";
import { subTitleStyle, titleBox, titleStyle } from "../../common/common.style";
import { useCartContext } from "../../common/context/cartProvider";
import { PaymentSummary } from "../../shopping-cart/components/PaymentSummary/PaymentSummary";
import { getTotalPrice } from "../../shopping-cart/utils/getTotalPrice/getTotalPrice";
import { SelectedCartContainer } from "../components/SelectedCartContainer/SelectedCartContainer";

import Modal from "compoents-modal-test-kangoll";
import { InfoText } from "../../../components/InfoText/InfoText";
import { CouponList } from "../components/CouponList/CouponList";
import { useSelectedCartContext } from "../../common/context/selectedCartProvider";

export default function OrderConfirm() {
  const { cartItems } = useCartContext();
  const { selectedCartIds } = useSelectedCartContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoupons, setSelectedCoupons] = useState<string[]>([]);

  const handleModalOpen = () => {
    console.log("쿠폰 선택 모달 열기");
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleCouponSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const couponId = e.target.id;
    setSelectedCoupons((prev) => {
      if (prev.includes(couponId)) return prev.filter((id) => id !== couponId);
      if (prev.length < 2) {
        return [...prev, couponId];
      }
      return prev;
    });
  };

  const totalPrice = getTotalPrice({
    cartItems: cartItems,
    selectedCartIds,
  });

  return (
    <PageLayout>
      <Header>
        <img src="./arrowBack.png" alt="뒤로가기" />
      </Header>
      <Main>
        <div css={titleBox}>
          <p css={titleStyle}>주문 확인</p>
          <p css={subTitleStyle}>
            총 1종류의 상품 2개를 주문합니다. <br />
            최종 결제 금액을 확인해 주세요..
          </p>
          {/** toto : 변수 설정 필요 */}
        </div>
        <SelectedCartContainer handleModalOpen={handleModalOpen} />
        <PaymentSummary price={totalPrice} />
      </Main>
      <Footer>
        <Button onClick={() => {}} type="submit" size="full" disabled={false}>
          결제하기
        </Button>
      </Footer>
      <Modal
        position="center"
        isOpen={isModalOpen}
        onClose={handleModalClose}
        size="sm"
        backdropClosable
      >
        <Modal.Header hasCloseButton>쿠폰을 선택해주세요</Modal.Header>
        <Modal.Content>
          <InfoText showImg>쿠폰은 최대 2개까지 사용할 수 있습니다.</InfoText>
          <CouponList
            handleCouponSelect={handleCouponSelect}
            selectedCoupons={selectedCoupons}
          />
        </Modal.Content>
        <Modal.Footer>
          <Button onClick={handleModalClose} size="full">
            총 6,000원 할인 쿠폰 사용하기
          </Button>
        </Modal.Footer>
      </Modal>
    </PageLayout>
  );
}
