import styled from '@emotion/styled';
import TextList from '../../common/TextList/TextList';
import Button from '../../common/Button/Button';
import getPriceFormat from '../../../utils/getPriceFormat';

interface TotalPriceBoxProps {
  totalProductPrice: number;
  shippingFee: number;
  isValid?: boolean;
}

const TotalPriceBox = ({ totalProductPrice, shippingFee, isValid = true }: TotalPriceBoxProps) => {
  const totalPrice = getPriceFormat(totalProductPrice + shippingFee);

  return (
    <TotalPriceBoxWrapper>
      <BoxInner>
        <TextList label="총 선택상품금액" text={`${getPriceFormat(totalProductPrice)}원`} />
        <TextList label="배송비" text={`+ ${getPriceFormat(shippingFee)}원`} />
        <TotalPriceWrapper>
          <TextList label="총 주문액" text={`${totalPrice}원`} primary />
        </TotalPriceWrapper>
        <Button
          primary
          size="big"
          isValid={isValid}
          text={isValid ? `${totalPrice}원 주문하기` : '상품을 선택해주세요.'}
          width="100%"
        />
      </BoxInner>
    </TotalPriceBoxWrapper>
  );
};

export default TotalPriceBox;

const TotalPriceBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  height: auto;
  background-color: rgb(243, 245, 247);
  border-radius: 6px;
  @media screen and (max-width: 1320px) {
    width: 100%;
  }
`;

const BoxInner = styled.div`
  padding: 12px 18px 24px 18px;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
`;

const TotalPriceWrapper = styled.div`
  margin: 12px 0 24px 0;
  padding: 12px 0 12px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
