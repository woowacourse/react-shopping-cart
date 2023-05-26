import styled from 'styled-components';
import Colors from '../../../constants/Colors';

export const ErrorPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ErrorSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 40px;
  padding: 20px;

  border-radius: 8px;

  & > h1 {
    font-size: xx-large;
  }

  & > p {
    font-size: larger;
  }
`;

export const HomeEntryButton = styled.button`
  padding: 20px;

  color: white;
  background-color: ${Colors.PRIMARY_COLOR_HIGHLIGHT};

  border-radius: 8px;

  font-size: larger;

  cursor: pointer;
`;
