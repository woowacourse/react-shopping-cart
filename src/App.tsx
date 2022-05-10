import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ItemDetail from './pages/ItemDetail';
import ItemList from './pages/ItemList';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ItemList />} />
          <Route path='/items/*' element={<ItemDetail />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
