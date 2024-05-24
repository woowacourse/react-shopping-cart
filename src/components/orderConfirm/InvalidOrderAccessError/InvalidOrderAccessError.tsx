import { SadIcon } from '@assets/index';
import { BasicButton } from '@components/common';
import { ROUTE_PATHS } from '@routes/route.constant';
import { useNavigate } from 'react-router-dom';

import * as Styled from './InvalidOrderAccessError.styled';

const InvalidOrderAccessError = () => {
  const navigate = useNavigate();

  const handleClickButton = () => {
    navigate(ROUTE_PATHS.root);
  };

  return (
    <Styled.InvalidOrderAccessError>
      <SadIcon />
      <Styled.Message>유효하지 않은 접근이에요.</Styled.Message>
      <BasicButton onClick={handleClickButton}>
        <Styled.ButtonText>장바구니 페이지 가기</Styled.ButtonText>
      </BasicButton>
    </Styled.InvalidOrderAccessError>
  );
};

export default InvalidOrderAccessError;
