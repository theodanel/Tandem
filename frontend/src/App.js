import './stylesheets/App.scss';
import Home from './pages/Home';
import CreateProject from './pages/CreateProject'
import ShowProject from './pages/ShowProject'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';
import Form from './components/Form.js';
// import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <BrowserRouter>
    {/* <AuthProvider> */}
    <Routes>
      <Route path='/' element={<Home />} />

      <Route path='/create' element={<Form content='newProject' />} />


      <Route path='/login' element={<Login />} />
      <Route path='/logout' element={<Logout />} />
      <Route path='/register' element={<Register />} />

      <Route path='/project/:id' element={<ShowProject />} />

      <Route path='/login' element={<Login />} />
    </Routes>
    {/* </AuthProvider> */}
    </BrowserRouter>
  );
}

export default App;
