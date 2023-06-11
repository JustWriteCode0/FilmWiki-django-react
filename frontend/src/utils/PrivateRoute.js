import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
  console.log('CUSTOM PATH')
  return (
    <Route
      {...rest}
      element={element}
    />
  );
};


export default PrivateRoute