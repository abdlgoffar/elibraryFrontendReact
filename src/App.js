import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EditBook from './components/EditBook';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import CreateBook from './pages/CreateBook';
import Main from './pages/Main';
import ManageBook from './pages/ManageBook';
import Secure from './services/Secure';

function App() {

  return (
    <div className="App mx-2">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/books/create" element={<Secure><CreateBook/></Secure>}/>
          <Route path="/books/manage" element={<Secure><ManageBook/></Secure>}/>
          <Route path="/books/update/:id" element={<Secure><EditBook/></Secure>}/>
          <Route path="/login" element={<SignIn/>} />
          <Route path="/register" element={<SignUp/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
