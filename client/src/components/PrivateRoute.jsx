import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

function PrivateRoute() {
   const { userInfo } = useSelector((state) => state.auth);

   return userInfo === null ? <Navigate to='/login' /> : <Outlet />;
}

export default PrivateRoute;
