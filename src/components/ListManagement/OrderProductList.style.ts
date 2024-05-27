import styled from 'styled-components';
import { ButtonStyle } from '../Button/Button.style';

export const CouponButton = styled(ButtonStyle)`
  width: 100%;
  border-color: rgba(51, 51, 51, 0.25);
  padding: 15px 0;
  color: rgba(51, 51, 51, 0.75);
  font-weight: 700;
  font-size: 15px;
`;

export const DeliveryInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 26px;
  color: rgba(10, 13, 19, 1);

  .delivery-info_title {
    font-weight: 700;
    font-size: 16px;
  }

  .delivery-info_checkbox {
    display: flex;
    align-items: center;
    gap: 8px;

    .delivery-info_explanation {
      font-weight: 500;
      font-size: 12px;
    }
  }
`;
