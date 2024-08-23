import { Navigate } from 'react-router-dom';
import Cookie from 'js-cookie';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const token = Cookie.get('jwt_token');
  
  if (token === undefined) {
    // If there's no token, redirect to login
    return <Navigate to="/login" />;
  }
  
  // If there's a token, render the protected component
  return <Element {...rest} />;
};

export default ProtectedRoute;
