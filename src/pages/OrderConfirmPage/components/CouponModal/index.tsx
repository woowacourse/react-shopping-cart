import * as S from "./CouponModal.styled";
import Text from "../../../../components/common/Text";
import CloseSign from "../../../../components/icons/CloseSign";
import GuideSign from "../../../../components/icons/GuideSign";
import CheckBox from "../../../../components/common/CheckBox";
import Button from "../../../../components/common/Button";
import { Modal } from "@seo_dev/react-modal";

const CouponModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal onClose={onClose}>
      <Modal.BackDrop />
      <S.StyledModalContent>
        <S.ModalTop>
          <Modal.Title>
            <Text variant="title-1">쿠폰을 선택해 주세요</Text>
          </Modal.Title>
          <Modal.CloseButton>
            <CloseSign />
          </Modal.CloseButton>
        </S.ModalTop>
        <S.ModalMiddle>
          <S.CouponInfo>
            <GuideSign />
            <Text variant="body-2">쿠폰은 최대 2개까지 사용할 수 있습니다.</Text>
          </S.CouponInfo>
          <S.CouponList>
            {[0, 1, 2].map((index) => (
              <S.CouponCard key={index}>
                <CheckBox isChecked={false} onClick={() => {}}>
                  <Text variant="title-2">3,000원 할인 쿠폰</Text>
                </CheckBox>
                <S.CouponCardInfoWrap>
                  <Text variant="body-2">만료일: 2024년 11월 30일</Text>
                  <Text variant="body-2">사용 가능 금액: 10,000원 이상</Text>
                </S.CouponCardInfoWrap>
              </S.CouponCard>
            ))}
          </S.CouponList>
        </S.ModalMiddle>
        <Button variant="primary" size="full" radius={8} onClick={() => {}}>
          총 6,000원 할인 쿠폰 사용하기
        </Button>
      </S.StyledModalContent>
    </Modal>
  );
};

export default CouponModal;
