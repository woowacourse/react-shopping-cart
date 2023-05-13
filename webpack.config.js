const path = require('path'); // 절대 경로를 참조하기 위해

// 웹팩에서 HTML을 다루기 위한 플러그인
// 플러그인은 script 태그를 사용하여 body에 모든 webpack 번들을 포함하는 HTML5파일을 생성합니다.
// 적용은 webpack에 플러그인을 추가하기만 하면 됩니다.

// 자세한 설명 링크: https://webpack.kr/plugins/html-webpack-plugin/
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Bundle(하나로 합치기)을 만들기 위한 시작 파일
  entry: ['./src/index.jsx'],

  // 생성된 번들 파일은 /dist폴더에 생성됩니다.
  // publicPath를 지정함으로써 HTML 등
  // 다른 파일에서 생성된 번들을 참조할 때, '/'를 기준으로 참조합니다.
  // ex) <script type="text/javascript" src="/js/app.js"></script>
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/',
  },

  // 확장자를 순서대로 해석합니다. 여러 파일에서 이름이 동일하지만 다른 확장자를 가진 경우,
  // webpack은 배열의 앞에서부터 파일을 해석하고 남은 것은 해석하지 않습니다.
  // webpack resolve에 대한 자세한 내용: https://webpack.kr/configuration/resolve/
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },

  // React파일인 jsx, js는 babel을 이용하여 빌드합니다.
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
    ],
  },

  // .src/index.html파일을 dist 경로에 index.html 파일을 생성합니다.
  // Webpack이 만든 번들 파일을 HTML에 추가하여 생성합니다.
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
  ],
};
