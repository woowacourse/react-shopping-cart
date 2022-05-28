import PropTypes from 'prop-types';

import { Icon } from 'components/@common';

import * as S from './styles';

function Title({ type, size, description, children }) {
  return (
    <S.Container type={type} size={size}>
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
  type: 'page',
  size: 24,
  description: '',
};

Title.propTypes = {
  type: PropTypes.oneOf(['page', 'content']),
  size: PropTypes.number,
  description: PropTypes.string,
};

export default Title;
