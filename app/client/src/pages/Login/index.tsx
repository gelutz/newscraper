import { useForm } from "react-hook-form";

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
    <div>
      <div>
        <div>
          <h2>Sign in to your account</h2>
        </div>
        <form onSubmit={onSubmit}>
          <div>
            <div>
              <input
                placeholder="Login"
                type="text"
                {...register("login", { required: true })}
              />
              <span hidden={!errors.login}>Login is required</span>
            </div>
            <div>
              <input
                type="password"
                autoComplete="current-password"
                placeholder="Password"
                {...register("password", {
                  required: true,
                  minLength: 4,
                  // validate: (value) => value.length > 2 && value.match(/dasdas/),
                })}
              />
              <span hidden={!errors.password}>8 characters minimum.</span>
            </div>
          </div>

          <div>
            <div>
              <input
                type="checkbox"
                {...register("remember", { required: false })}
              />
              <label htmlFor="remember_me">Remember me</label>
            </div>

            <div>
              <a href="/">Forgot your password?</a>
            </div>
          </div>

          <div>
            <input
              type="submit"
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
