import styled from '@emotion/styled';
import { Container as Button } from '../../components/Button/Button.styles';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 45px;
  place-items: center;
  place-content: center;

  @media screen and (max-width: 1259px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 929px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 604px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const ModalText = styled.span`
  font-size: 1.6rem;
  margin-bottom: 40px;
`;

const ModalButton = styled(Button)`
  width: 100%;
`;

const RecommendedContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  margin-top: 60px;
`;

const RecommendedTitle = styled.span`
  font-size: 1.2rem;
  margin-bottom: 30px;
`;

const RecommendedList = styled.div`
  display: flex;
  align-items: center;
  max-height: 200px;

  & > *:not(:last-child) {
    margin-right: 15px;
  }
`;

export { Container, ModalText, ModalButton, RecommendedContainer, RecommendedTitle, RecommendedList };
