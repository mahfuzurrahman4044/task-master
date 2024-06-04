import { Navigate, useLocation } from 'react-router-dom';
import Loading from './Loading';
import { useDispatch, useSelector } from 'react-redux';
import userSlice, { setUser, toggleLoading } from '../../redux/features/user/userSlice';
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const PrivateRoute = ({ children }) => {
  const auth = getAuth();
  const { pathname } = useLocation();
  const { isLoading, email } = useSelector((state) => state.userSlice)
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // console.log(currentUser)
        dispatch(setUser({
          name: currentUser.displayName,
          email: currentUser.email,
        }))
        dispatch(toggleLoading(false))
      } else {
        dispatch(toggleLoading(false))
      }

    });
  }, [])

  if (isLoading) {
    return <Loading />;
  }

  if (email) {
    return children;
  }

  return <Navigate to="/login" state={{ path: pathname }} />;
};

export default PrivateRoute;
