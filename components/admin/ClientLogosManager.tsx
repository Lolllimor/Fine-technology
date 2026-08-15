"use client";

import {
  FormEvent,
  useEffect,
  useState,
  useTransition,
  type ChangeEvent,
} from "react";
import { useRouter } from "next/navigation";
import { MarketingImage } from "@/components/landing/MarketingImage";
import { uploadToCloudinary } from "@/lib/cloudinary-upload";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import {
  CloseIcon,
  ImageIcon,
  PlusIcon,
  TrashIcon,
} from "@/components/admin/icons";

type ClientLogo = {
  id: string;
  src: string;
  alt: string;
  sort_order: number;
};

type Props = {
  logos: ClientLogo[];
  saveAction: (src: string, alt: string) => Promise<void>;
  deleteAction: (id: string) => Promise<void>;
};

type SelectedFile = {
  file: File;
  previewUrl: string;
  name: string;
};

export function ClientLogosManager({
  logos,
  saveAction,
  deleteAction,
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<SelectedFile[]>([]);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      selected.forEach((s) => URL.revokeObjectURL(s.previewUrl));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeModal();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen]);

  function closeModal() {
    selected.forEach((s) => URL.revokeObjectURL(s.previewUrl));
    setSelected([]);
    setModalOpen(false);
  }

  function onFilesChange(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []).filter((f) =>
      f.type.startsWith("image/"),
    );
    setSelected((prev) => [
      ...prev,
      ...files.map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
        name: file.name.replace(/\.[^.]+$/, ""),
      })),
    ]);
    e.target.value = "";
  }

  function removeSelected(index: number) {
    setSelected((prev) => {
      const target = prev[index];
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((_, i) => i !== index);
    });
  }

  function updateSelectedName(index: number, name: string) {
    setSelected((prev) =>
      prev.map((item, i) => (i === index ? { ...item, name } : item)),
    );
  }

  function onUpload(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (selected.length === 0) {
      setError("Please choose at least one logo.");
      return;
    }

    const batch = selected;

    setError("");
    setMessage("");
    startTransition(async () => {
      try {
        for (let i = 0; i < batch.length; i++) {
          setUploadProgress(`Uploading ${i + 1} of ${batch.length}…`);
          const src = await uploadToCloudinary(
            batch[i].file,
            "fine-technology/clients",
          );
          await saveAction(src, batch[i].name.trim() || "Client logo");
        }
        setUploadProgress(null);
        setMessage(
          batch.length === 1
            ? "Logo uploaded."
            : `${batch.length} logos uploaded.`,
        );
        closeModal();
        router.refresh();
      } catch (err) {
        setUploadProgress(null);
        setError(err instanceof Error ? err.message : "Upload failed");
      }
    });
  }

  function runDelete(id: string) {
    setError("");
    setMessage("");
    startTransition(async () => {
      try {
        await deleteAction(id);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Action failed");
      }
    });
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-[#64748B]">
          {logos.length} logo{logos.length === 1 ? "" : "s"} on homepage
        </p>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="flex cursor-pointer items-center gap-2 rounded-xl bg-[#023048] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#01253a]"
        >
          <PlusIcon className="h-4 w-4" />
          Upload logos
        </button>
      </div>

      {error ? (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}
      {message ? (
        <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {message}
        </p>
      ) : null}

      {logos.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-[#E2E8F0] bg-white py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F1F5F9] text-[#94A3B8]">
            <ImageIcon className="h-6 w-6" />
          </div>
          <p className="text-sm text-[#64748B]">No client logos yet.</p>
        </div>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {logos.map((logo) => (
            <li
              key={logo.id}
              className="group relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#E2E8F0]"
            >
              <MarketingImage
                src={logo.src}
                alt={logo.alt}
                width={160}
                height={64}
                className="max-h-14 w-auto max-w-full object-contain opacity-80 grayscale"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent px-3 pb-2.5 pt-8">
                <p className="truncate text-xs font-medium text-white">
                  {logo.alt || "Untitled"}
                </p>
              </div>
              <button
                type="button"
                disabled={pending}
                onClick={() => setDeleteId(logo.id)}
                aria-label={`Delete ${logo.alt || "logo"}`}
                className="absolute right-2 top-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/90 text-[#023048] shadow-sm backdrop-blur transition hover:bg-red-600 hover:text-white disabled:opacity-60"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {modalOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center"
          onClick={closeModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="upload-logos-title"
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  id="upload-logos-title"
                  className="text-lg font-bold text-[#023048]"
                >
                  Upload logos
                </h2>
                <p className="mt-1 text-sm text-[#64748B]">
                  Prefer transparent PNG or SVG-style logos. They display in
                  grayscale on the site.
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[#64748B] transition hover:bg-[#F1F5F9]"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={onUpload} className="mt-6 space-y-4">
              <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC] px-4 py-8 text-center transition hover:border-[#0798E7] hover:bg-[#F0F9FF]">
                <ImageIcon className="h-8 w-8 text-[#94A3B8]" />
                <span className="text-sm font-medium text-[#023048]">
                  Choose logo files
                </span>
                <span className="text-xs text-[#64748B]">PNG, JPG, or WebP</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={onFilesChange}
                  className="sr-only"
                />
              </label>

              {selected.length > 0 ? (
                <ul className="max-h-56 space-y-3 overflow-y-auto">
                  {selected.map((item, index) => (
                    <li
                      key={item.previewUrl}
                      className="flex items-center gap-3 rounded-xl bg-[#F8FAFC] p-2"
                    >
                      <MarketingImage
                        src={item.previewUrl}
                        alt=""
                        width={56}
                        height={40}
                        className="h-10 w-14 rounded-lg object-contain bg-white"
                        unoptimized
                      />
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) =>
                          updateSelectedName(index, e.target.value)
                        }
                        placeholder="Client name"
                        className="min-w-0 flex-1 rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#023048] outline-none focus:border-[#0798E7]"
                      />
                      <button
                        type="button"
                        onClick={() => removeSelected(index)}
                        aria-label="Remove"
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[#64748B] transition hover:bg-red-50 hover:text-red-600"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}

              {uploadProgress ? (
                <p className="text-sm text-[#64748B]">{uploadProgress}</p>
              ) : null}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="cursor-pointer rounded-xl px-4 py-2.5 text-sm font-medium text-[#64748B] transition hover:bg-[#F1F5F9]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={pending || selected.length === 0}
                  className="cursor-pointer rounded-xl bg-[#023048] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#01253a] disabled:opacity-60"
                >
                  {pending ? "Uploading…" : "Upload"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      <ConfirmModal
        open={deleteId !== null}
        title="Delete logo?"
        description="This removes the logo from the homepage. The Cloudinary file is not deleted."
        confirmLabel="Delete"
        pending={pending}
        onCancel={() => setDeleteId(null)}
        onConfirm={() => {
          if (!deleteId) return;
          const id = deleteId;
          setDeleteId(null);
          runDelete(id);
        }}
      />
    </div>
  );
}
