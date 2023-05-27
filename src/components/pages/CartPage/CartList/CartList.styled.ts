import styled from 'styled-components';
import Colors from '../../../../constants/Colors';

export const CartListSection = styled.section`
  max-width: 750px;
  width: 100%;
`;

export const SelectionDiv = styled.div`
  display: flex;
  align-items: center;

  column-gap: 15px;
  margin-top: 15px;
`;

export const TotalCountParagraph = styled.p`
  padding: 16px;
  border-bottom: 4px solid ${Colors.CART_LIST_COUNT_BORDER};

  font-weight: 400;
  font-size: 20px;
  line-height: 33px;
  letter-spacing: 0.5px;
`;

export const SelectedCountParagraph = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.5px;
`;
