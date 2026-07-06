import type { ReactNode } from "react";
import { AuroraCanvas } from "../ui/aurora-canvas";
import Header from "../Header";

interface AuthLayoutProps {
  children: ReactNode;
  footer?: ReactNode;
}

export default function AuthLayout({ children, footer }: AuthLayoutProps) {
  return (
    <div className="min-h-screen relative flex flex-col pt-16">
      <AuroraCanvas
        className="absolute inset-0 -z-10 h-full w-full opacity-60"
        colors={["#00ff87", "#60efff", "#0061ff", "#ff0099"]}
        speed={0.2}
        layers={2}
        interactive
      />
      <Header />

      <main className="flex-1 flex items-center justify-center px-5 py-8 sm:px-6">
        <div className="w-full max-w-[420px]">
          {children}
          {footer && (
            <div className="mt-4 text-center text-sm text-gray-600">{footer}</div>
          )}
        </div>
      </main>
    </div>
  );
}

export const authLabelClass =
  "block text-sm font-medium text-gray-700 mb-1.5";

export const authInputClass =
  "w-full min-h-11 px-3 text-sm text-gray-900 placeholder:text-gray-400 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 transition-colors";

export const authButtonClass =
  "w-full min-h-11 px-4 text-sm font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors";

export const authFieldGroupClass = "space-y-4";
