import React from 'react';
import {Link} from 'react-router-dom';

import Button from 'component/common/Button';

import theme from 'theme/theme';
import {PATH} from 'constant';

import {Font} from 'style/common';
import * as S from 'page/NotFoundPage/style';

function NotFoundPage() {
  return (
    <S.NotFoundPageLayout>
      <Font fontSize="100px">잘못 들어왔어요😢</Font>
      <Link to={PATH.HOME}>
        <Button backgroundColor={theme.GRAY_BROWN} width="200px" height="50px">
          홈으로 돌아가기
        </Button>
      </Link>
    </S.NotFoundPageLayout>
  );
}

export default NotFoundPage;
