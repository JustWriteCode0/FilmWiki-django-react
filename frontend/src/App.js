import './App.css';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import FilmsCatalog from "./containers/FilmsCatalog";
import Film from "./containers/Film"
import ResetPassword from "./containers/ResetPassword";
import ResetPasswordConfirm from "./containers/ResetPasswordConfirm";
import UserProfile from './containers/UserProfile';
import Home from "./containers/Home";
import PrivateRoutes from './utils/PrivateRoutes';
import Activate from './containers/Activate';


function App() {
  return (
    <>
      <div className="App">
         <Header />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
        <Route path="/activate/:uid/:token" element={<Activate />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/films-catalog" element={<FilmsCatalog />}/>
        </Route>  
        <Route path="/film/:slug" element={<Film />} />
        <Route path="/profile/:id/" element={<UserProfile/>}/>
      </Routes>
    </>
  );
}

export default App;