const deviceSize = {
  mobile: '600px',
  tablet: '992px',
  laptop: '1200px',
};

const DEVICE = {
  EXTRA_SMALL: `screen and (max-width:${deviceSize.mobile})`,
  MOBILE: `screen and (min-width:${deviceSize.mobile})`,
  TABLET: `screen and (min-width:${deviceSize.tablet})`,
  LAPTOP: `screen and (min-width:${deviceSize.laptop})`,
};

const ThemeStyle = {
  lightTheme: {
    textColor: '#111',
    backgroundColor: '#fff',
    DEVICE: DEVICE,
  },

  darkTheme: {
    textColor: '#fff',
    backgroundColor: '#111',
    DEVICE: DEVICE,
  },
};

export default ThemeStyle;
