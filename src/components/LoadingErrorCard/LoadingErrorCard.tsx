import styled from 'styled-components';
import FlexBox from 'components/@common/FlexBox';
import errorImg from 'assets/error.png';

type LoadingErrorCardProps = {
  onClickRetryButton: () => void;
};

const LoadingErrorCard = ({ onClickRetryButton }: LoadingErrorCardProps) => {
  return (
    <ErrorImgBackground flexDirection="column" gap="20px">
      <ErrorImg src={errorImg} alt="예상하지 못한 에러 발생" />
      <ErrorMessage>관리자에게 문의하세요</ErrorMessage>
      <RetryButton onClick={onClickRetryButton}>새로고침</RetryButton>
    </ErrorImgBackground>
  );
};

export default LoadingErrorCard;

const ErrorImgBackground = styled(FlexBox)`
  padding: 30px 0;
  background-color: #f2f2f2;
`;

const ErrorImg = styled.img`
  width: 150px;
  height: 150px;
`;

const ErrorMessage = styled.p`
  font-size: 20px;
  font-weight: 700;
`;

const RetryButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 50px;
  border: none;
  border-radius: 4px;
  background-color: #63cbff;
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  cursor: pointer;
`;
