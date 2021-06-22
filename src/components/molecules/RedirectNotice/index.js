import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as S from './style.js';

export const RedirectNotice = (props) => {
  const { interjection, notice, buttonText, redirectRoute, ...rest } = props;

  return (
    <S.Container {...rest}>
      {interjection && <S.Interjection>{interjection}</S.Interjection>}
      <S.Notice>{notice}</S.Notice>
      <Link to={redirectRoute}>
        <S.RedirectButton>{buttonText}</S.RedirectButton>
      </Link>
    </S.Container>
  );
};

RedirectNotice.propTypes = {
  interjection: PropTypes.string,
  notice: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  redirectRoute: PropTypes.string.isRequired,
};
