import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const ProtectedRoutes = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  if (!user) {
    console.log(user);
    return <Navigate to='/login' />;
  }
  return children;
};

export default ProtectedRoutes;