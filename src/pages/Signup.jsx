import { useEffect, useState } from 'react';
import loginImage from '../assets/image/login.svg';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../redux/features/user/userSlice';
import userSlice from '../redux/features/user/userSlice';

const Signup = () => {
  const { handleSubmit, register, control } = useForm();
  const password = useWatch({ control, name: 'password' });
  const confirmPassword = useWatch({ control, name: 'confirmPassword' });
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();
  const { email, isLoading } = useSelector((state) => state.userSlice)

  useEffect(() => {
    if (
      password !== undefined &&
      password !== '' &&
      confirmPassword !== undefined &&
      confirmPassword !== '' &&
      password === confirmPassword
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    if (!isLoading && email) {
      navigate("/")
    }
  }, [isLoading, email])

  const onSubmit = ({ name, email, password }) => {
    // console.log(name, email, password);

    dispatch(createUser({ name, email, password, }))
  };

  const handleGoogleLogin = () => {
    // Google Login
  };

  return (
    <div className="flex max-w-7xl mx-auto py-10 min-h-screen items-center">
      <div className="w-1/2">
        <img src={loginImage} className="h-full w-full" alt="" />
      </div>
      <div className="w-1/2 grid place-items-center">
        <div className="bg-primary/5 w-full max-w-sm rounded-lg grid place-items-center px-10 py-5">
          <h1 className="mb-10 font-medium text-2xl">Sign up</h1>
          <form className="space-y-5 w-full" onSubmit={handleSubmit(onSubmit)}>
            <span className="flex flex-col items-start">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="w-full rounded-md"
                {...register('name')}
                placeholder='name'
              />
            </span>
            <span className="flex flex-col items-start">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="w-full rounded-md"
                {...register('email')}
                placeholder='email'
              />
            </span>
            <span className="flex flex-col items-start">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="w-full rounded-md"
                {...register('password')}
                placeholder='password'
              />
            </span>
            <span className="flex flex-col items-start">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                className="w-full rounded-md"
                {...register('confirmPassword')}
                placeholder='confirm password'
              />
            </span>
            <a href='#' className="">
              Already have an account? Please{' '}
              <span
                className="text-primary hover:underline cursor-pointer"
                onClick={() => navigate('/login')}
              >
                Log in
              </span>
            </a>
            <div className="mt-8">
              <button
                type="submit"
                className="btn btn-primary w-full disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={disabled}
              >
                Sign up
              </button>
            </div>
            <div className="my-4 flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
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

export default Signup;
