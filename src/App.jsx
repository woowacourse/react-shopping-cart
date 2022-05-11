import './App.css';
import './store/index';

import { useRoutes } from 'react-router-dom';
import routes from './Routes';
import Header from './components/Header';

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
