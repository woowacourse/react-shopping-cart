import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/@common/Icon';

import * as S from './styles';

function PageTitle({ size, description, children }) {
  return (
    <S.Container size={size}>
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
  size: 24,
  description: null,
};

PageTitle.propTypes = {
  size: PropTypes.number,
  description: PropTypes.string,
};

export default PageTitle;
