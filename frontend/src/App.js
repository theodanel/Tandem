import './stylesheets/App.scss';
import Home from './pages/Home';
import CreateProject from './pages/CreateProject'
import ShowProject from './pages/ShowProject'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/create' element={<CreateProject />} />
      <Route path='/project/:id' element={<ShowProject />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
