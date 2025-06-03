import { CouponApi } from "@/apis";
import { Button, Checkbox, Spacing, Text } from "@/components";
import { CloseIcon, Info } from "@/components/icons";
import Modal from "@/components/Modal/Modal";
import { QUERY_KEY } from "@/constants";
import { useQuery } from "@/modules";
import { useShoppingCartContext } from "@/pages/MainPage/context";
import { css } from "@emotion/react";

export default function CouponModal() {
  const { data: coupons } = useQuery({
    queryFn: CouponApi.getAllCoupons,
    queryKey: QUERY_KEY.coupon,
  });

  const { selectedCouponIds, setSelectedCouponIds } = useShoppingCartContext();

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
            display: flex;
            flex-direction: column;
            gap: 8px;
          `}
        >
          {coupons?.map((coupon) => (
            <div
              key={coupon.id}
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
                <Checkbox
                  checked={selectedCouponIds.includes(coupon.id)}
                  onClick={() =>
                    setSelectedCouponIds((prev) =>
                      prev.includes(coupon.id) ? prev.filter((id) => id !== coupon.id) : [...prev, coupon.id],
                    )
                  }
                />
                <Text variant="title-2">{coupon.description}</Text>
              </div>

              <Spacing size={16} />

              <div>
                <p>
                  <Text variant="body-1">만료일: {coupon.expirationDate}</Text>
                </p>
                <Spacing size={4} />
                {coupon.minimumAmount && (
                  <p>
                    <Text variant="body-1">최소 주문 금액: {coupon.minimumAmount?.toLocaleString()}원</Text>
                  </p>
                )}
                {coupon.availableTime && (
                  <p>
                    <Text variant="body-1">
                      사용 가능 시간: {coupon.availableTime.start} ~ {coupon.availableTime.end}
                    </Text>
                  </p>
                )}
              </div>
            </div>
          ))}
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
