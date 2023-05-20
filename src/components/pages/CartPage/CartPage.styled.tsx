import styled from 'styled-components';
import Colors from '../../../constants/Colors';

export const PageDiv = styled.div`
  align-self: center;

  display: flex;
  flex-direction: column;

  margin-bottom: 60px;
  width: 90%;
`;

export const ContentDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap-reverse;

  column-gap: 5%;
  width: 100%;

  & > * {
    align-self: center;
  }
`;

export const PageHeaing = styled.h2`
  padding-bottom: 30px;
  margin-bottom: 30px;
  border-bottom: 4px solid ${Colors.PRIMARY_COLOR_DARK};

  font-weight: 700;
  font-size: 32px;
  text-align: center;
  letter-spacing: 0.5px;
`;
