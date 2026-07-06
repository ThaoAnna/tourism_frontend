import { Link } from "react-router-dom";
import AuthLayout, {
  authButtonClass,
  authFieldGroupClass,
  authInputClass,
  authLabelClass,
} from "../components/auth/AuthLayout";

export default function LoginForm() {
  return (
    <AuthLayout
      footer={
        <p>
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:text-blue-700 focus:outline-none focus:underline"
          >
            Sign up
          </Link>
        </p>
      }
    >
      <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200/90 shadow-sm p-6 sm:p-7">
        <header className="mb-5">
          <h1 className="text-lg font-semibold text-gray-900 tracking-tight">
            Sign in
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back. Enter your credentials to continue.
          </p>
        </header>

        <form className={authFieldGroupClass} noValidate>
          <div>
            <label htmlFor="login-email" className={authLabelClass}>
              Email
            </label>
            <input
              id="login-email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@example.com"
              className={authInputClass}
            />
          </div>

          <div>
            <label htmlFor="login-password" className={authLabelClass}>
              Password
            </label>
            <input
              id="login-password"
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              className={authInputClass}
            />
          </div>

          <button type="submit" className={`${authButtonClass} mt-1`}>
            Sign in
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}
