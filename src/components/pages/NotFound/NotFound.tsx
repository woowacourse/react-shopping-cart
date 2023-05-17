import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function NotFound() {
  return (
    <Wrapper>
      <Img
        alt="404"
        src="https://cdn.dribbble.com/users/272763/screenshots/4576659/media/79505e6af05fa86bc787a77f781afbb8.gif"
      />
      <Direction>길을 잃으셨나요? 잘못된 URL을 요청하셨네요!😂</Direction>
      <ButtonWrapper>
        <Button>
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            메인 홈으로
          </Link>
        </Button>
        <Button>오류 신고하기</Button>
      </ButtonWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  align-items: center;

  margin-top: 30px;

  @media screen and (max-width: 767px) {
    margin-top: 60px;
  }
`;

const Img = styled.img`
  width: 60%;
`;

const Direction = styled.h2`
  font-size: 16px;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 27px;
`;

const Button = styled.button`
  background: #6400ff;
  border: 2px solid white;
  color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 13px;
  transition: background 0.5s;

  :hover {
    background: #6400ff;
    box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.2);
    color: #fff;
  }
`;
