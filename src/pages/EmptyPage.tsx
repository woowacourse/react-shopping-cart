import { Link } from 'react-router-dom';
import styled from 'styled-components';

type EmptyPageProps = {
  message: string;
};

const EmptyPage: React.FC<EmptyPageProps> = ({ message }) => {
  return (
    <Wrapper>
      <StyledTitle>텅</StyledTitle>
      <StyledMessage>{message}</StyledMessage>
      <Link to="/">
        <StyledHomeButton>홈으로 가기</StyledHomeButton>
      </Link>
    </Wrapper>
  );
};

export default EmptyPage;

const Wrapper = styled.div`
  width: 100%;
  height: 500px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const StyledTitle = styled.h2`
  font-size: 50px;
`;

const StyledMessage = styled.p``;

const StyledHomeButton = styled.button`
  width: 100px;
  height: 50px;
  border-radius: 5px;
  background-color: #2bc1bc;
  color: white;
  font-size: 16px;
`;
