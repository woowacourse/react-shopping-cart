import PropTypes from 'prop-types';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { getPixelToRem } from 'lib/formatterUtils';

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

  ${({ gap }) => css`
    gap: ${getPixelToRem(gap)}rem;
  `}
`;

FlexContainer.defaultProps = {
  direction: 'column',
  justify: '',
  align: '',
  width: '100%',
  gap: 0,
};

FlexContainer.propTypes = {
  direction: PropTypes.oneOf(['column', 'row']),
  justify: PropTypes.string,
  align: PropTypes.string,
  width: PropTypes.string,
  gap: PropTypes.number,
};

export default FlexContainer;
