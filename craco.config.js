const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@public': path.resolve(__dirname, 'public'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/components/pages'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@customTypes': path.resolve(__dirname, 'src/customTypes'),
      '@recoil': path.resolve(__dirname, 'src/recoil'),
    },
  },
};
