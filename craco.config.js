const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@public': path.resolve(__dirname, 'public'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/components/pages'),
      '@commons': path.resolve(__dirname, 'src/components/commons'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@customTypes': path.resolve(__dirname, 'src/customTypes'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@recoil': path.resolve(__dirname, 'src/recoil'),
    },
  },
};
