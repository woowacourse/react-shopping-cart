import Error from './Error.component';

export default {
  title: 'Shared/Error',
  component: Error,
};

export const SeverError = args => <Error {...args}>서버을 연결할 수 없습니다.</Error>;
SeverError.args = {};
