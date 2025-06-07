import Button from "../../../components/common/Button";

function CouponApplyButton({ onApply }: { onApply: () => void }) {
  return (
    <Button
      backgroundColor="#333333"
      color="white"
      onClick={() => onApply()}
      disabled={false}
    >
      총 6,000원 쿠폰 적용하기
    </Button>
  );
}

export default CouponApplyButton;
