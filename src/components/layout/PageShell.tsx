import type { ReactNode } from "react";

interface PageShellProps {
  children: ReactNode;
  className?: string;
}

export default function PageShell({ children, className = "" }: PageShellProps) {
  return (
    <div className={`min-h-screen bg-sand flex flex-col pt-16 ${className}`.trim()}>
      {children}
    </div>
  );
}
