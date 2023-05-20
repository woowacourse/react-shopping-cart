import styled from 'styled-components';
import Colors from '../../../../constants/Colors';

export const PriceSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 440px;
  height: 410px;

  padding: 0;
  padding-bottom: 38px;
  border: 1px solid ${Colors.STEPPER_BORDER};
`;

export const TitleParagraph = styled.p`
  padding: 20px 30px;
  width: 100%;

  border-bottom: 3px solid ${Colors.STEPPER_BORDER};

  font-weight: 400;
  font-size: 24px;
  line-height: 33px;
  letter-spacing: 0.5px;
`;

export const PriceDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 20px;
`;

export const PriceParagraph = styled.p`
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  text-align: center;
  letter-spacing: 0.5px;
`;

export const OrderButton = styled.button`
  align-self: center;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 388px;
  height: 73px;

  background-color: ${Colors.PRIMARY_COLOR_DARK};
  color: ${Colors.FONT_WHITE};
  font-weight: 400;
  font-size: 24px;
  text-align: center;
  cursor: pointer;
`;
