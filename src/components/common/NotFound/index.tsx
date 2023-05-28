import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import patrick from '@assets/patrick.jpg';
import Button from '../Button';

const NotFound = () => {
  const navigate = useNavigate();
  const goToMainPage = () => {
    navigate('/');
  };
  return (
    <NotFoundWrapper>
      <span>아뇨 뚱인데요?~ 404 뚱이라구요!</span>
      <ImgWrapper />
      <Button
        text="홈으로..~"
        onClick={goToMainPage}
        width="250px"
        height="130px"
        fontSize="30px"
      />
    </NotFoundWrapper>
  );
};

const NotFoundWrapper = styled.div`
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImgWrapper = styled.img.attrs({
  src: patrick,
  alt: '404페이지', // 대체 텍스트
})`
  width: 245px;
  height: 430px;

  margin-bottom: 30px;
`;

export default NotFound;
