import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../../../utils/utils";
import Button from "../../@shared/Button/Button";
import * as S from "./Resultbox.styled";

const ResultBox = ({ title, text, price, buttonContent, disabled }) => (
  <S.ResultBox>
    <S.Title>
      <h3>{title}</h3>
    </S.Title>
    <S.Main>
      <S.Info>
        <span>{text}</span>
        <span>{formatPrice(price)}원</span>
      </S.Info>
      <S.Button>
        <Button disabled={disabled}>{buttonContent}</Button>
      </S.Button>
    </S.Main>
  </S.ResultBox>
);

ResultBox.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  buttonContent: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
};

ResultBox.defaultProps = {
  disabled: false,
};

export default ResultBox;
