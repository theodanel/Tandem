import './stylesheets/App.scss';
import Home from './pages/Home';
import CreateProject from './pages/CreateProject'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserPage from './components/UserPage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/create' element={<CreateProject />} />
      <Route path='/user/:id' element={<UserPage />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
