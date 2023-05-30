import { RecoilRoot } from 'recoil';
import Router from './router/Router';

const App = () => {
  return (
    <RecoilRoot>
      <Router />
    </RecoilRoot>
  );
};

export default App;
