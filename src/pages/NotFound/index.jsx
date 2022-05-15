import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import HomeButtonImage from 'assets/image/home_button.png';
import NotFoundImage from 'assets/image/not_found.png';
import { FlexColumnCenter } from 'components/common/Styled';

const NotFound = () => {
  return (
    <Styled.Wrapper>
      <img src={NotFoundImage} alt="결과 없음 이미지" />
      <Styled.TextBox>
        이용에 불편을 드려 죄송합니다.
        <br /> 홈페이지로 이동하시어 서비스를 다시 이용해주세요.
      </Styled.TextBox>
      <Link to="/react-shopping-cart">
        <img src={HomeButtonImage} alt="홈으로 가는 이미지" />
      </Link>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled(FlexColumnCenter)`
    height: calc(100vh - 200px);
    gap: 40px;
  `,
  TextBox: styled.div`
    text-align: center;
    font-weight: 500;
    font-size: 20px;
    line-height: 1.4;
  `,
};

export default NotFound;
