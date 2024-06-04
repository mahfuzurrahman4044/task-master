import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import loginImage from '../assets/image/login.svg';
import { useDispatch, useSelector } from 'react-redux';
import { loggedInUser } from '../redux/features/user/userSlice';
import { useEffect } from 'react';
import userSlice from '../redux/features/user/userSlice';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { isLoading, email } = useSelector((state) => state.userSlice)
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"

  useEffect(() => {
    if (!isLoading && email) {
      navigate(from, { replace: true })
    }
  }, [isLoading, email])

  const onSubmit = ({ email, password }) => {
    // console.log(email, password);

    dispatch(loggedInUser({ email, password }))
  };

  const handleGoogleLogin = () => {
    //  Google Login
  };

  return (
    <div className="flex max-w-7xl h-screen items-center mx-auto">
      <div className="w-1/2">
        <img src={loginImage} className="h-full w-full" alt="" />
      </div>
      <div className="w-1/2 grid place-items-center">
        <div className="bg-primary/5 w-full max-w-sm rounded-lg grid place-items-center px-10 py-5">
          <h1 className="mb-10 font-medium text-2xl">Log in</h1>
          <form className="space-y-3 w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-start">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="w-full rounded-md"
                {...register('email')}
                placeholder='email'
              />
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="w-full rounded-md"
                {...register('password')}
                placeholder='password'
              />
            </div>
            <div className="relative !mt-8">
              <button type="submit" className="btn btn-primary w-full">
                Log in
              </button>
            </div>
            <div>
              <a href='#' className=''>
                New here? Please{' '}
                <span
                  className="text-primary hover:underline cursor-pointer"
                  onClick={() => navigate('/signup')}
                >
                  Sign up
                </span>
              </a>
            </div>
            <button
              type="button"
              className="btn btn-primary w-full"
              onClick={handleGoogleLogin}
            >
              Log in with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
