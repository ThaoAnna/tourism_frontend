import { Link } from "react-router-dom";
import AuthLayout, {
  authButtonClass,
  authFieldGroupClass,
  authInputClass,
  authLabelClass,
} from "../components/auth/AuthLayout";

export default function RegisterForm() {
  return (
    <AuthLayout
      footer={
        <p>
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-700 focus:outline-none focus:underline"
          >
            Sign in
          </Link>
        </p>
      }
    >
      <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200/90 shadow-sm p-6 sm:p-7">
        <header className="mb-5">
          <h1 className="text-lg font-semibold text-gray-900 tracking-tight">
            Create account
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Get started with your Wanderluster account.
          </p>
        </header>

        <form className={authFieldGroupClass} noValidate>
          <div>
            <label htmlFor="register-name" className={authLabelClass}>
              Name
            </label>
            <input
              id="register-name"
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Your full name"
              className={authInputClass}
            />
          </div>

          <div>
            <label htmlFor="register-phone" className={authLabelClass}>
              Phone number
            </label>
            <input
              id="register-phone"
              type="tel"
              name="phone"
              autoComplete="tel"
              placeholder="+1 234 567 8900"
              className={authInputClass}
            />
          </div>

          <div>
            <label htmlFor="register-email" className={authLabelClass}>
              Email
            </label>
            <input
              id="register-email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@example.com"
              className={authInputClass}
            />
          </div>

          <div>
            <label htmlFor="register-password" className={authLabelClass}>
              Password
            </label>
            <input
              id="register-password"
              type="password"
              name="password"
              autoComplete="new-password"
              placeholder="Create a password"
              className={authInputClass}
            />
          </div>

          <button type="submit" className={`${authButtonClass} mt-1`}>
            Create account
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}
