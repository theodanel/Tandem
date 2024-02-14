import './stylesheets/App.scss';
import Home from './pages/Home';
import CreateProject from './pages/CreateProject'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
// import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <BrowserRouter>
    {/* <AuthProvider> */}
    <Routes>
      <Route path='/' element={<Home />} />

      <Route path='/create' element={<CreateProject />} />

      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

    </Routes>
    {/* </AuthProvider> */}
    </BrowserRouter>
  );
}

export default App;
