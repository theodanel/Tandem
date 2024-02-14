import './stylesheets/App.scss';
import Home from './pages/Home';
import CreateProject from './pages/CreateProject'
import ShowProject from './pages/ShowProject'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
    <Routes>
      <Route path='/' element={<Home />} />

      <Route path='/create' element={<CreateProject />} />

      <Route path='/project/:id' element={<ShowProject />} />

      <Route path='/login' element={<Login />} />
    </Routes>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
