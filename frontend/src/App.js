import './App.css';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Films from "./containers/Films";
import ResetPassword from "./containers/ResetPassword";
import ResetPasswordConfirm from "./containers/ResetPasswordConfirm";
import Home from "./containers/Home";
import PrivateRoutes from './utils/PrivateRoutes';

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
        <Route element={<PrivateRoutes />}>
          <Route path="/films" element={<Films />}/>
        </Route>          
      </Routes>
    </>
  );
}

export default App;