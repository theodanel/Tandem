import './stylesheets/App.scss';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
    </Routes>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
