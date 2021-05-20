import styled from '@emotion/styled';
import Button from '../../Button/Button';

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
  font-weight: bold;
`;

const RecommendedList = styled.div`
  display: flex;
  align-items: center;
  max-height: 200px;

  & > *:not(:last-child) {
    margin-right: 15px;
  }
`;

export { ModalText, ModalButton, RecommendedContainer, RecommendedTitle, RecommendedList };
