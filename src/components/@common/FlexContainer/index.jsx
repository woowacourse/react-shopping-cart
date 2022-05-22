import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const FlexContainer = styled.div`
  display: flex;

  ${({ direction }) =>
    css`
      flex-direction: ${direction};
    `};

  ${({ justify }) =>
    css`
      justify-content: ${justify};
    `};

  ${({ align }) =>
    css`
      align-items: ${align};
    `};

  ${({ width }) =>
    css`
      width: ${width};
    `}
`;

FlexContainer.defaultProps = {
  direction: 'column',
  justify: '',
  align: '',
  width: '100%',
};

FlexContainer.propTypes = {
  direction: PropTypes.oneOf(['column', 'row']),
  justify: PropTypes.string,
  align: PropTypes.string,
  width: PropTypes.string,
};

export default FlexContainer;
