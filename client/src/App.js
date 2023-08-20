import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import JobListings from './pages/JobListings';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import Register from './pages/Register';
import { useCookies } from 'react-cookie';
import SavedJobs from './pages/SavedJobs';
import Footer from './components/Footer';

function App() {

  const [cookies, setCookies] = useCookies(["access_token"])

  return (
    <>
      <NavBar />
      <Routes>
        {!cookies.access_token ? (
          <>
            {/* Routes available when not logged in. */}
            <Route path='/' element={<Home />} ></Route>
            <Route path='/listings' element={<JobListings />}></Route>
            <Route path='/register' element={<Register />} ></Route>
            <Route path='/login' element={<Login />} ></Route>

          </>
        ) : (
          <>
            {/* Routes available when logged in. ie, when cookie is active*/}
            <Route path='/' element={<Home />} ></Route>
            <Route path='/listings' element={<JobListings />}></Route>
            <Route path='/savedjobs' element={<SavedJobs />}></Route>
          </>
        )}
      </Routes>
      <Footer />
    </>
  );
}

export default App;


