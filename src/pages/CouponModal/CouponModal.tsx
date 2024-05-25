import {Modal} from "rian-modal-component";
import MoreInfo from "@/components/_common/MoreInfo/MoreInfo";
import TextBox from "@/components/_common/TextBox/TextBox";
import DeleteButton from "@/assets/delete-icon.svg?react";
import Button from "@/components/_common/Button/Button";
import {theme} from "@/styles/theme";
import CouponList from "./components/CouponList";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {couponListSelector, couponsState, discountCouponPriceState,} from "@/recoil/coupons";
import useDiscountCalculator from "@/hooks/coupon/useDiscountCalculator";
import {finalOrderAmountState, totalItemsPriceSelector,} from "@/recoil/orderInformation";
import {freeShippingCouponState} from "@/recoil/shippingFeeType";
import {COUPON_ORDER_MESSAGE} from "@/constants/couponAndOrder.ts";

const CouponModal = ({
                         isOpen,
                         onCloseModal,
                     }: {
    isOpen: boolean;
    onCloseModal: () => void;
}) => {
    const couponList = useRecoilValue(couponListSelector);
    const coupons = useRecoilValue(couponsState);

    const totalPrice = useRecoilValue(totalItemsPriceSelector);

    const setFinalOrderAmount = useSetRecoilState(finalOrderAmountState);
    const setDiscountCouponPrice = useSetRecoilState(discountCouponPriceState);
    const totalItemsPrice = useRecoilValue(totalItemsPriceSelector);

    const {calculateTotalDiscount} = useDiscountCalculator();
    const isFreeShipping = useRecoilValue(freeShippingCouponState);
    const totalDiscountAmount = calculateTotalDiscount(coupons, totalPrice);

    const onApplyCoupon = () => {
        const finalOrderPrice = totalItemsPrice - totalDiscountAmount;
        setFinalOrderAmount(finalOrderPrice);
        setDiscountCouponPrice(totalDiscountAmount);
        onCloseModal();
    };

    const couponApplyTextArr = [];
    if (totalDiscountAmount) {
        couponApplyTextArr.push(`총${totalDiscountAmount} 원 할인 쿠폰 사용하기`);
    } else {
        couponApplyTextArr.push(`적용한 쿠폰이 없습니다.`);
    }

    if (isFreeShipping) couponApplyTextArr.push(`무료 배송`);

    const couponApplyText = couponApplyTextArr.join(" + ");

    return (
        <Modal
            isOpen={isOpen}
            position="center"
            onClose={onCloseModal}
            size="medium"
            contentPosition="center"
        >
            <TextBox
                type="medium"
                text={COUPON_ORDER_MESSAGE.choiceCoupon}
                style={{paddingBottom: "20px"}}
            />
            <>
                <MoreInfo text={COUPON_ORDER_MESSAGE.couponLimit}/>
                <Modal.CloseIcon onClick={onCloseModal}>
                    <DeleteButton/>
                </Modal.CloseIcon>

                <CouponList couponList={couponList}/>
                <Button
                    onClick={onApplyCoupon}
                    style={{
                        backgroundColor: theme.COLOR["grey-3"],
                        color: "white",
                        opacity: 100,
                        marginTop: "30px",
                    }}
                    width="full"
                    radiusVariant="rounded"
                    color="white"
                >
                    {couponApplyText}
                </Button>
            </>
        </Modal>
    );
};

export default CouponModal;
