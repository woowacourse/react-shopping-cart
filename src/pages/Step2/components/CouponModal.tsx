import { Button, Checkbox, Spacing, Text } from "@/components";
import { CloseIcon, Info } from "@/components/icons";
import Modal from "@/components/Modal/Modal";
import { css } from "@emotion/react";

export default function CouponModal() {
  return (
    <Modal isBackdropClose>
      <Modal.Top>
        <Modal.Title>쿠폰 적용</Modal.Title>
        <Modal.Close>
          <CloseIcon />
        </Modal.Close>
      </Modal.Top>

      <Modal.Content>
        <Text
          variant="body-1"
          css={css`
            display: flex;
            align-items: center;
            gap: 4px;
          `}
        >
          <Info /> 쿠폰은 최대 2개까지 사용할 수 있습니다.
        </Text>

        <Spacing size={16} />

        <div
          css={css`
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            padding: 16px;
          `}
        >
          <div
            css={css`
              display: flex;
              align-items: center;
              gap: 12px;
            `}
          >
            <Checkbox checked={false} />
            <Text variant="title-2">5,000원 할인 쿠폰</Text>
          </div>

          <Spacing size={16} />

          <div>
            <p>
              <Text variant="body-1">만료일: 2025.06.03</Text>
            </p>
            <Spacing size={4} />
            <p>
              <Text variant="body-1">최소 주문 금액:1</Text>
            </p>
          </div>
        </div>
      </Modal.Content>

      <Modal.Bottom>
        <Button
          css={css`
            width: 100%;
          `}
        >
          총 6,000원 할인 쿠폰 사용하기
        </Button>
      </Modal.Bottom>
    </Modal>
  );
}
