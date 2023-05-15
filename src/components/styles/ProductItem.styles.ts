import styled from 'styled-components';
import { Paragraph } from '../../ui/styles/Typography.styles';

export const Wrapper = styled.div`
  height: 352px;
  margin-bottom: 20px;
`;

export const ProductInfoWrapper = styled.div`
  width: 282px;
  display: flex;
  justify-content: space-between;
  margin-top: 8px;

  > div:nth-child(1) {
    width: 200px;
  }
`;

export const ProductTitle = styled(Paragraph)`
  margin-bottom: 8px;
`;
