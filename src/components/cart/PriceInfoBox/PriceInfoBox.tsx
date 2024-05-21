import {formatToWon} from "@/utils/stringHelper.ts";
import * as S from "./PriceInfoBox.style.ts";

interface PriceInfoBoxProps {
    priceLabel: string;
    price: number;
}

const PriceInfoBox = ({priceLabel, price}: PriceInfoBoxProps) => {
    return (
        <S.Wrapper>
            <S.PriceLabel>{priceLabel}</S.PriceLabel>
            <S.Price>{formatToWon(price)}</S.Price>
        </S.Wrapper>
    );
};

export default PriceInfoBox;
