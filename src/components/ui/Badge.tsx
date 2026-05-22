import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
};

export function Badge({ children }: BadgeProps) {
  return <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">{children}</span>;
}