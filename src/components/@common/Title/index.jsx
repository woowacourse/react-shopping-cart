import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/@common/Icon';

import * as S from './styles';

function Title({ size, description, children }) {
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

Title.defaultProps = {
  size: 24,
  description: null,
};

Title.propTypes = {
  size: PropTypes.number,
  description: PropTypes.string,
};

export default Title;
