import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../components/context/AuthContext';

const PrivateRoutes = () => {
  const {user} = useContext(AuthContext)
  
  const auth = {'token': true}
  
  return(
    auth.token ? <Outlet /> : <Navigate to="/login" />
  )
}


export default PrivateRoutes