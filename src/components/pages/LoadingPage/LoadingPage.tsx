import Colors from '../../../constants/Colors';
import LoadingSpinner from '../../commons/LoadingSpinner/LoadingSpinner';
import * as Styled from './LoadingPage.styled';

const LoadingPage = () => {
  return (
    <Styled.LoadingSection>
      <LoadingSpinner color={Colors.PRIMARY_COLOR_HIGHLIGHT} spinnerWidth="15px" />
      <Styled.MessageParagraph>로딩 중</Styled.MessageParagraph>
    </Styled.LoadingSection>
  );
};

export default LoadingPage;
