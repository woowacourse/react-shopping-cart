import Close from "../../../assets/Close.png";
import Info from "../../../assets/Info.png";
import Hr from "../../common/Hr/Hr";
import CheckBox from "../../common/CheckBox/CheckBox";
import * as S from "./Modal.styles";
import { CouponResponse } from "../../../api/fetchCouponList";
import {
  formatDate,
  formatCurrency,
  formatAvailableTime,
} from "../../../utils/format";

interface ModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  couponList: CouponResponse[];
}

export default function Modal({
  isModalOpen,
  onClose,
  couponList,
}: ModalProps) {
  if (!isModalOpen) {
    return null;
  }

  console.log(couponList[0].id);

  return (
    <>
      <S.ModalBackground isModalOpen={isModalOpen}>
        <S.ModalContainer>
          <S.ModalHeader>
            <S.ModalHeaderTitle>
              <p>쿠폰을 선택해 주세요</p>
            </S.ModalHeaderTitle>
            <S.ModalHeaderCloseImg src={Close} onClick={onClose} />
          </S.ModalHeader>
          <S.ModalBody>
            <S.Info>
              <S.InfoImg src={Info}></S.InfoImg>
              <S.InfoDescription>
                쿠폰은 최대 2개까지 사용할 수 있습니다.
              </S.InfoDescription>
            </S.Info>
            <S.CouponList>
              {couponList.map((coupon) => (
                <S.Item key={coupon.id}>
                  <Hr />
                  <S.ItemTitleWrapper>
                    <CheckBox type="checkbox" />
                    <S.ItemTitle>{coupon.description}</S.ItemTitle>
                  </S.ItemTitleWrapper>
                  <S.ItemInfoWrapper>
                    <S.CouponInfo>
                      만료일: {formatDate(coupon.expirationDate)}
                    </S.CouponInfo>
                    {coupon.minimumAmount && (
                      <S.CouponInfo>
                        최소 주문 금액: {formatCurrency(coupon.minimumAmount)}
                      </S.CouponInfo>
                    )}
                    {coupon.availableTime && (
                      <S.CouponInfo>
                        {formatAvailableTime(coupon.availableTime)}
                      </S.CouponInfo>
                    )}
                  </S.ItemInfoWrapper>
                </S.Item>
              ))}
            </S.CouponList>
          </S.ModalBody>
          <S.ModalButton>총 6,000원 할인 쿠폰 사용하기</S.ModalButton>
        </S.ModalContainer>
      </S.ModalBackground>
    </>
  );
}
