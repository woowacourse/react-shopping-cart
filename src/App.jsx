import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { PAGES } from 'pages';

function App() {
  return (
    <BrowserRouter basename="/react-shopping-cart">
      <Routes>
        {Object.keys(PAGES).map((path) => (
          <Route key={path} path={path} element={PAGES[path]} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
