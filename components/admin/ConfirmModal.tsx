"use client";

import { useEffect } from "react";

type Props = {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  pending?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmModal({
  open,
  title,
  description,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  pending = false,
  onConfirm,
  onCancel,
}: Props) {
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onCancel();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#001428]/60 p-4"
      onClick={() => {
        if (!pending) onCancel();
      }}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
      >
        <h2 className="text-lg font-bold text-[#023048]">{title}</h2>
        {description ? (
          <p className="mt-2 text-sm text-[#64748B]">{description}</p>
        ) : null}
        <div className="mt-6 flex flex-wrap justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={pending}
            className="cursor-pointer rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm font-semibold text-[#023048] transition hover:bg-[#F1F5F9] disabled:opacity-60"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={pending}
            className="cursor-pointer rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
          >
            {pending ? "Deleting…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
