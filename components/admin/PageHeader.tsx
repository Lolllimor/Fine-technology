import type { ReactNode } from "react";

type Props = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function PageHeader({ title, description, action }: Props) {
  return (
    <div className="flex flex-col gap-4 border-b border-[#E2E8F0] pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#023048] sm:text-[28px]">
          {title}
        </h1>
        {description ? (
          <p className="mt-1.5 text-sm text-[#64748B]">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
