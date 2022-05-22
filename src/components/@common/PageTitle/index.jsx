import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/@common/Icon';

import * as S from './styles';

function PageTitle({ description, children }) {
  return (
    <S.Container>
      <S.PageTitle>{children}</S.PageTitle>
      {description && (
        <S.PageDescription>
          <Icon icon="f105" /> {description}
        </S.PageDescription>
      )}
    </S.Container>
  );
}

PageTitle.defaultProps = {
  description: null,
};

PageTitle.propTypes = {
  description: PropTypes.string,
};

export default PageTitle;
