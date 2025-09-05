import * as z from "zod";
import { loginSchema } from "../../schema/user/Login.Schema";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "../../slices/userApi";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../slices/auth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import type { RootState } from "../../store";
import { Mail, Lock } from "lucide-react";

type FormInputs = z.infer<typeof loginSchema>;

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const submit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const res = await login(data).unwrap();
      dispatch(setUserInfo(res));
      reset();
      navigate("/");
    } catch (err: any) {
      toast.error(err?.data?.message || err.message);
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-200 via-white to-pink-200 overflow-hidden">
     
      {/* <div className="absolute top-[-8rem] left-[-8rem] w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute bottom-[-8rem] right-[-8rem] w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div> */}

      
      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/30 relative z-10">
        
        <h2 className="text-3xl font-extrabold text-center text-gray-900">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-600 mt-2">
          Login to continue your journey
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(submit)} className="mt-6 space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              <input
                type="email"
                {...register("email")}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                           transition"
                placeholder="you@example.com"
              />
            </div>
            {errors.email && (
              <span className="text-red-600 text-sm font-medium">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              <input
                type="password"
                {...register("password")}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                           transition"
                placeholder="••••••••"
              />
            </div>
            {errors.password && (
              <span className="text-red-600 text-sm font-medium">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading || isSubmitting}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold 
                       shadow-md hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {isLoading || isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-700 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
