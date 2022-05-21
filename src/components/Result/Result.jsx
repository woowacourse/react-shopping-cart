import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button } from 'components/@common';
import { addThousandUnitComma } from 'utils';

const ResultBox = styled.div`
  position: relative;
  width: 448px;
  height: 318px;
  margin: 52px 0 0 86px;
  border: 1px solid #dddddd;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 30px;
  font-size: 24px;
`;

const DivisionLine = styled.hr`
  height: 3px;
  border: 0;
  background: #dddddd;
`;

const HighlightTextBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 34px 30px 0;
`;

const HighlightText = styled.span`
  position: relative;
  display: inline-block;
  padding: 0 2px;
  text-align: center;
  font-weight: 700;
  font-size: 20px;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 8px;
    background-color: #2ac1bc;
    opacity: 0.5;
    z-index: -1;
  }
`;

const ButtonBox = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  padding: 0 35px 30px;
`;

const OrderButton = styled.div`
  width: 388px;
  height: 73px;
  padding: 20px;
  background: #2ac1bc;
  font-size: 24px;
  color: white;
`;

function Result({ title, price, button }) {
  return (
    <ResultBox>
      <Title>{title}</Title>
      <DivisionLine />
      <HighlightTextBox>
        <HighlightText>{title}</HighlightText>
        <HighlightText>{addThousandUnitComma(price)}원</HighlightText>
      </HighlightTextBox>
      <ButtonBox>
        <Button>
          <OrderButton>{button}</OrderButton>
        </Button>
      </ButtonBox>
    </ResultBox>
  );
}

Result.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  button: PropTypes.string.isRequired,
};

export default Result;
