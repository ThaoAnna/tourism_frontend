import type { ElementType, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  wide?: boolean;
}

export default function Container({
  children,
  className = "",
  as: Tag = "div",
  wide = false,
}: ContainerProps) {
  const baseClass = wide ? "container-gallery" : "container-page";

  return <Tag className={`${baseClass} ${className}`.trim()}>{children}</Tag>;
}
