"use client";

import {
  FormEvent,
  useEffect,
  useRef,
  useState,
  useTransition,
  type ChangeEvent,
} from "react";
import { useRouter } from "next/navigation";
import { MarketingImage } from "@/components/landing/MarketingImage";
import { uploadToCloudinary } from "@/lib/cloudinary-upload";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  ImageIcon,
  PlusIcon,
  TrashIcon,
} from "@/components/admin/icons";

type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  sort_order: number;
};

type Props = {
  images: GalleryImage[];
  saveAction: (src: string, alt: string) => Promise<void>;
  deleteAction: (id: string) => Promise<void>;
};

type SelectedFile = {
  file: File;
  previewUrl: string;
};

export function GalleryManager({ images, saveAction, deleteAction }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<SelectedFile[]>([]);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [viewingIndex, setViewingIndex] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const touchStartX = useRef(0);

  const activeIndex =
    viewingIndex !== null && images.length > 0
      ? Math.min(viewingIndex, images.length - 1)
      : null;

  useEffect(() => {
    if (viewingIndex === null) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setViewingIndex(null);
      if (e.key === "ArrowLeft") {
        setViewingIndex((i) =>
          i === null ? null : (i - 1 + images.length) % images.length,
        );
      }
      if (e.key === "ArrowRight") {
        setViewingIndex((i) => (i === null ? null : (i + 1) % images.length));
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [viewingIndex, images.length]);

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

  function onUpload(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (selected.length === 0) {
      setError("Please choose at least one image.");
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    const alt = String(formData.get("alt") ?? "").trim();
    const batch = selected;

    setError("");
    setMessage("");
    startTransition(async () => {
      try {
        for (let i = 0; i < batch.length; i++) {
          setUploadProgress(`Uploading ${i + 1} of ${batch.length}…`);
          const src = await uploadToCloudinary(
            batch[i].file,
            "fine-technology/gallery",
          );
          await saveAction(src, alt);
        }
        setUploadProgress(null);
        setMessage(
          batch.length === 1
            ? "Image uploaded."
            : `${batch.length} images uploaded.`,
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
          {images.length} image{images.length === 1 ? "" : "s"} on /projects
        </p>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="flex cursor-pointer items-center gap-2 rounded-xl bg-[#023048] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#01253a]"
        >
          <PlusIcon className="h-4 w-4" />
          Upload images
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

      {images.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-[#E2E8F0] bg-white py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F1F5F9] text-[#94A3B8]">
            <ImageIcon className="h-6 w-6" />
          </div>
          <p className="text-sm text-[#64748B]">No gallery images yet.</p>
        </div>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {images.map((img, index) => (
            <li
              key={img.id}
              onClick={() => setViewingIndex(index)}
              className="group relative aspect-4/3 cursor-pointer overflow-hidden rounded-2xl bg-[#F1F5F9] shadow-sm ring-1 ring-[#E2E8F0] transition hover:shadow-md"
            >
              <MarketingImage
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
                sizes="(max-width:640px) 50vw, 25vw"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent px-3 pb-2.5 pt-8">
                <p className="truncate text-xs font-medium text-white">
                  {img.alt || "Untitled"}
                </p>
              </div>
              <button
                type="button"
                disabled={pending}
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteId(img.id);
                }}
                aria-label={`Delete ${img.alt || "image"}`}
                className="absolute right-2 top-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/90 text-[#023048] shadow-sm backdrop-blur transition hover:bg-red-600 hover:text-white disabled:opacity-60"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {activeIndex !== null && images[activeIndex] ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setViewingIndex(null)}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            const delta = e.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(delta) < 40) return;
            setViewingIndex((i) => {
              if (i === null) return null;
              return delta > 0
                ? (i - 1 + images.length) % images.length
                : (i + 1) % images.length;
            });
          }}
        >
          <button
            type="button"
            onClick={() => setViewingIndex(null)}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <CloseIcon className="h-5 w-5" />
          </button>

          {images.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setViewingIndex((i) =>
                    i === null
                      ? null
                      : (i - 1 + images.length) % images.length,
                  );
                }}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-4"
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setViewingIndex((i) =>
                    i === null ? null : (i + 1) % images.length,
                  );
                }}
                aria-label="Next image"
                className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-4"
              >
                <ChevronRightIcon className="h-6 w-6" />
              </button>
            </>
          ) : null}

          <div
            className="flex max-h-full max-w-4xl flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[75vh] w-full">
              {/* Full-resolution view; intrinsic sizing via next/image */}
              <MarketingImage
                src={images[activeIndex].src}
                alt={images[activeIndex].alt}
                width={1200}
                height={900}
                className="max-h-[75vh] w-auto max-w-full rounded-xl object-contain"
                style={{ height: "auto" }}
              />
            </div>
            <div className="flex w-full items-center justify-between gap-4 text-white">
              <p className="truncate text-sm">
                {images[activeIndex].alt || "Untitled"}
              </p>
              <div className="flex shrink-0 items-center gap-3">
                <span className="text-xs text-white/60">
                  {activeIndex + 1} / {images.length}
                </span>
                <button
                  type="button"
                  disabled={pending}
                  onClick={() => setDeleteId(images[activeIndex].id)}
                  aria-label="Delete image"
                  className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-white/20 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-600 hover:border-red-600 disabled:opacity-60"
                >
                  <TrashIcon className="h-3.5 w-3.5" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {modalOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#001428]/60 p-4"
          onClick={() => {
            if (!pending) closeModal();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-[#023048]">
                  Upload images
                </h2>
                <p className="mt-1 text-xs text-[#64748B]">
                  Uploads go to Cloudinary; the CDN URL is saved in Supabase.
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                disabled={pending}
                aria-label="Close"
                className="cursor-pointer rounded-lg p-1.5 text-[#94A3B8] transition hover:bg-[#F1F5F9] hover:text-[#023048] disabled:opacity-60"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={onUpload} className="mt-5">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wide text-[#64748B]">
                  Files
                </span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  disabled={pending}
                  onChange={onFilesChange}
                  className="text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-[#023048] file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white"
                />
              </label>

              {selected.length > 0 ? (
                <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {selected.map((s, index) => (
                    <li key={s.previewUrl} className="relative">
                      <div className="relative aspect-square overflow-hidden rounded-xl bg-[#F1F5F9] ring-1 ring-[#E2E8F0]">
                        {/* Local blob URL — not a remote asset */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={s.previewUrl}
                          alt={s.file.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        disabled={pending}
                        onClick={() => removeSelected(index)}
                        aria-label={`Remove ${s.file.name}`}
                        className="absolute -right-1.5 -top-1.5 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-[#023048] text-white shadow-sm transition hover:bg-[#01253a] disabled:opacity-60"
                      >
                        <CloseIcon className="h-3.5 w-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}

              <label className="mt-4 flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wide text-[#64748B]">
                  Alt text{" "}
                  {selected.length > 1 ? "(applied to all)" : "(optional)"}
                </span>
                <input
                  name="alt"
                  disabled={pending}
                  placeholder="Describe the photo"
                  className="rounded-xl border border-[#E2E8F0] px-3 py-2.5 text-sm text-[#023048] outline-none focus:ring-2 focus:ring-[#0798E7]/30"
                />
              </label>

              {uploadProgress ? (
                <p className="mt-3 text-xs font-medium text-[#0798E7]">
                  {uploadProgress}
                </p>
              ) : null}

              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  type="submit"
                  disabled={pending || selected.length === 0}
                  className="flex cursor-pointer items-center gap-2 rounded-xl bg-[#023048] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#01253a] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <PlusIcon className="h-4 w-4" />
                  {pending
                    ? "Uploading…"
                    : `Upload ${selected.length || ""} image${
                        selected.length === 1 ? "" : "s"
                      }`}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={pending}
                  className="cursor-pointer rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm font-semibold text-[#023048] transition hover:bg-[#F1F5F9] disabled:opacity-60"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      <ConfirmModal
        open={deleteId !== null}
        title="Delete this image?"
        description="This can't be undone."
        pending={pending}
        onConfirm={() => {
          if (deleteId) runDelete(deleteId);
          setDeleteId(null);
        }}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
