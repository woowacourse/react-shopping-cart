import PropTypes from 'prop-types';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { ICON_CODE } from 'constants/';
import { getPixelToRem } from 'lib/formatterUtils';

const Icon = styled.i`
  &::before {
    content: '\\${({ icon }) => icon}';

    font-family: 'Font Awesome 6 Free';
    font-style: normal;
    font-weight: 900;

    ${({ size }) =>
      size &&
      css`
        font-size: ${getPixelToRem(size)}rem;
      `}
  }
`;

Icon.defaultProps = { icon: ICON_CODE.CARROT };

Icon.propTypes = { icon: PropTypes.string };

export default Icon;
