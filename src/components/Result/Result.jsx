import * as S from './Result.styles';
import PropTypes from 'prop-types';
import { Button } from 'components/@common';
import { addThousandUnitComma } from 'utils';

function Result({ title, price, button }) {
  return (
    <S.Result>
      <S.Title>{title}</S.Title>
      <S.DivisionLine />
      <S.HighlightTextBox>
        <S.HighlightText>{title}</S.HighlightText>
        <S.HighlightText>{addThousandUnitComma(price)}원</S.HighlightText>
      </S.HighlightTextBox>
      <S.ButtonBox>
        <Button>
          <S.OrderButton>{button}</S.OrderButton>
        </Button>
      </S.ButtonBox>
    </S.Result>
  );
}

Result.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  button: PropTypes.string.isRequired,
};

export default Result;
