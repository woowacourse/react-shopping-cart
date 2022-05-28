import PropTypes from 'prop-types';

import * as S from './styles';

function ToolTip({ text, align, isDisabled, children }) {
  return (
    <S.Container text={text} isDisabled={isDisabled}>
      <S.Text align={align}>{text}</S.Text>
      {children}
    </S.Container>
  );
}

ToolTip.defaultProps = {
  text: '팁 내용이 비어있습니다.',
  isDisabled: false,
  align: 'top',
};

ToolTip.propTypes = {
  text: PropTypes.string,
  isDisabled: PropTypes.bool,
  align: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
};

export default ToolTip;
