import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import * as S from 'page/NotFoundPage/style';

import theme from 'theme/theme';
import {PATH} from 'constant';

import {Font} from 'style/common';

export default function NotFoundPage({children}) {
  return (
    <S.NotFoundPageLayout>
      <Font fontSize="100px">{children}</Font>
      <Link to={PATH.HOME}>
        <S.HomeButton backgroundColor={theme.GRAY_BROWN} width="200px" height="50px">
          홈으로 돌아가기
        </S.HomeButton>
      </Link>
    </S.NotFoundPageLayout>
  );
}

NotFoundPage.propTypes = {
  children: PropTypes.string,
};
