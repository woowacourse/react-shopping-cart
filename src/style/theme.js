import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';

const deviceSize = {
  mobile: '600px',
  tablet: '992px',
  laptop: '1200px',
};

const theme = {
  WHITE: '#ffffff',
  BLACK: '#000000',
  RED_300: '#fca5a5',
  GREY_500: '#78716c',
  DEVICE: {
    EXTRA_SMALL: `screen and (max-width:${deviceSize.mobile})`,
    MOBILE: `screen and (min-width:${deviceSize.mobile})`,
    TABLET: `screen and (min-width:${deviceSize.tablet})`,
    LAPTOP: `screen and (min-width:${deviceSize.laptop})`,
  },

  FONT: {
    PRIMARY: 'Do Hyeon',
    SECONDARY: 'Yeon Sung',
  },
};

const StyleTheme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

StyleTheme.propTypes = {
  children: PropTypes.node,
};

export default StyleTheme;
