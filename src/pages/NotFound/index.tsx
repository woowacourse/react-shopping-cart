import { useNavigate } from 'react-router-dom';

import Button from '@Components/Button';

import NotFoundImage from '@Asset/notFound.png';

import * as S from './style';

function NotFound() {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.Layout>
        <S.Image src={NotFoundImage} />
        <S.MainGuideMessage>페이지를 찾을 수 없습니다.</S.MainGuideMessage>
        <S.SubGuideMessage> 페이지가 존재하지 않거나 삭제되어 찾을 수 없어요.</S.SubGuideMessage>
        <Button text="홈으로 가기" onClick={() => navigate('/')} backgroundColor="#06C09E" width="180px" />
      </S.Layout>
    </S.Container>
  );
}

export default NotFound;
