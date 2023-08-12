import './App.css';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import FilmsCatalog from "./containers/FilmsCatalog";
import Film from "./containers/Film"
import Profile from './containers/Profile';
import OwnProfile from './containers/OwnProfile';
import Home from "./containers/Home";
import Activate from './containers/Activate';
import AvatarUpload from './components/AvatarUpload';


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
        <Route path="/activate/:uid/:token" element={<Activate />} />
        <Route path="/films-catalog" element={<FilmsCatalog />} />
        <Route path="/film/:slug" element={<Film />} />
        <Route path="/my-profile/" element={<OwnProfile />} />
        <Route path="/profile/:id/" element={<Profile/>} />
        <Route path="/crop" element={<AvatarUpload />}/>
      </Routes>
    </>
  );
}

export default App;