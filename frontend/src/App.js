import './stylesheets/App.scss';
import Home from './pages/Home';
import CreateProject from './pages/CreateProject'
import ShowProject from './pages/ShowProject'
import ShowUser from './pages/ShowUser'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';
import Form from './components/Form.js';
import Results from './components/Results.js';
// import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <BrowserRouter>
    {/* <AuthProvider> */}
    <Routes>
      <Route path='/' element={<Home />} />

      <Route path='/create' element={<Form content='newProject' />} />


      <Route path='/login' element={<Form content='login' />} />
      <Route path='/logout' element={<Logout />} />
      <Route path='/register' element={<Form content='register' />} />

      <Route path='/project/:id' element={<ShowProject />} />
      <Route path='/user/:id' element={<ShowUser />} />

      <Route path='/login' element={<Login />} />

      <Route path="/results" element={<Results />}/>

      <Route path='*' element={<Form content="notFound" />} />
    </Routes>
    {/* </AuthProvider> */}
    </BrowserRouter>
  );
}

export default App;
