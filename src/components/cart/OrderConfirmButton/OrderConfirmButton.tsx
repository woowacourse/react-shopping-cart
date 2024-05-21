import {CART_PAGE_TITLES} from "@/constants/cart.ts";
import Button from "../../_common/Button/Button.tsx";
import * as S from "./OrderConfirmButton.style.ts";
import {useNavigate} from "react-router-dom";
import {PAGE_URL} from "@/constants/url.ts";

const OrderConfirmButton = ({disabled}: { disabled: boolean }) => {
    const navigate = useNavigate();
    const onMoveOrderConfirmPage = () => {
        navigate(PAGE_URL.orderConfirm);
    };

    return (
        <S.OrderConfirmButton onClick={onMoveOrderConfirmPage}>
            <Button width="full" size="xLarge" theme="dark" disabled={disabled}>
                <S.ButtonText>{CART_PAGE_TITLES.orderConfirm}</S.ButtonText>
            </Button>
        </S.OrderConfirmButton>
    );
};

export default OrderConfirmButton;
