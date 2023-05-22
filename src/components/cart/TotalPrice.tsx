import styled from "styled-components";

interface TotalPriceProps {
  price: number;
}

export const TotalPrice = ({ price }: TotalPriceProps) => {
  return (
    <Style.TotalPriceContainer>
      <Style.Title>결제예상금액</Style.Title>
      <Style.Description>
        <Style.Price>
          <div>총 상품 가격</div>
          <div>{price}원</div>
        </Style.Price>
        <Style.Price>
          <div>총 배송비</div>
          <div>3000원</div>
        </Style.Price>
        <Style.Price $margin="25px 0">
          <div>총 주문금액</div>
          <div>{price + 3000}원</div>
        </Style.Price>
        <Style.SubmitButton>
          <div>주문하기</div>
        </Style.SubmitButton>
      </Style.Description>
    </Style.TotalPriceContainer>
  );
};

const Style = {
  TotalPriceContainer: styled.div`
    width: 448px;
    height: 410px;
    margin: 77px 100px;

    border: solid 1px #dddddd;

    @media screen and (max-width: 1320px) {
      width: 100%;
    }
  `,

  Title: styled.div`
    width: 100%;
    height: 81px;

    font-size: 30px;
    line-height: 80px;

    padding: 0 30px;
    color: #7a7a7a;

    border-bottom: solid 3px #dddddd;
  `,

  Description: styled.div`
    display: flex;
    flex-direction: column;

    padding: 35px 30px;
    gap: 20px;
  `,

  Price: styled.div<{ $margin?: string }>`
    display: flex;
    justify-content: space-between;

    margin: ${(props) => props.$margin};
  `,

  SubmitButton: styled.button`
    display: flex;
    align-items: center;
    justify-content: center;

    color: white;
    font-size: 25px;
    font-family: baemin;
    background-color: #333333;

    width: 388px;
    height: 73px;

    @media screen and (max-width: 1320px) {
      width: 100%;
    }
    :hover {
      background-color: #04c09e;
    }
  `,
};
