import React from 'react';
import { Link } from 'react-router-dom';

import Wrapper from './style';

const NotFoundPage = () => {
  return (
    <Wrapper>
      <div>
        <p>페이지가 없다구욧~!~!~!~!~! ㅠㅠㅠㅠ</p>
        <Link to="/">
          <button>홈으로 돌아가기</button>
        </Link>
      </div>
    </Wrapper>
  );
};

export default NotFoundPage;
