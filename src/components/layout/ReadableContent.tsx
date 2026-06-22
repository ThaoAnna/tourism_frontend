import type { ReactNode } from "react";

interface ReadableContentProps {
  children: ReactNode;
  className?: string;
}

export default function ReadableContent({
  children,
  className = "",
}: ReadableContentProps) {
  return (
    <div className={`readable-content ${className}`.trim()}>{children}</div>
  );
}
