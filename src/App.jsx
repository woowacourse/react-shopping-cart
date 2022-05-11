import './App.css';
import './store/index';

import Header from './components/Header';
import { useRoutes } from 'react-router-dom';
import routes from './Routes';

function App() {
  const content = useRoutes(routes);

  return (
    <div className="App">
      <Header />
      {content}
    </div>
  );
}

export default App;
