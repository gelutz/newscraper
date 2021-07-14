import { LockClosedIcon } from "@heroicons/react/solid";
import { useForm, FormState, Validate } from "react-hook-form";

import { useAuth } from "../../hooks/auth";

type FormData = {
  login: string;
  password: string;
  remember: boolean;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm<FormData>();
  const { signIn } = useAuth();

  const onSubmit = handleSubmit(async (data) => {
    const values = getValues();
    // TODO implement remember me
    try {
      await signIn({ login: values.login, password: values.password });
    } catch (e) {
      console.log(e);
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                placeholder="Login"
                type="text"
                {...register("login", { required: true })}
              />
              <span hidden={!errors.login} className="text-gray-400 text-xs">
                Login is required
              </span>
            </div>
            <div>
              <input
                type="password"
                autoComplete="current-password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                {...register("password", {
                  required: true,
                  minLength: 8,
                  // validate: (value) => value.length > 2 && value.match(/dasdas/),
                })}
              />
              <span hidden={!errors.password} className="text-gray-400 text-xs">
                8 characters minimum.
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                {...register("remember", { required: false })}
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="/"
                className="font-medium text-yellow-600 hover:text-yellow-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <input
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              placeholder="Teste"
              alt="submit"
              value="Submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
