import React from "react";
import Button from "../../@shared/Button/Button";
import * as S from "./Resultbox.styled";

const ResultBox = () => (
  <S.ResultBox>
    <S.Title>
      <h3>결제예상금액</h3>
    </S.Title>
    <S.Main>
      <S.Info>
        <span>결제예상금액</span>
        <span>21,700원</span>
      </S.Info>
      <S.Button>
        <Button>주문하기(2개)</Button>
      </S.Button>
    </S.Main>
  </S.ResultBox>
);

export default ResultBox;
