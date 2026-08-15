/** Browser unsigned upload to Cloudinary. No npm package required. */

export async function uploadToCloudinary(
  file: File,
  folder?: string,
): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !preset) {
    throw new Error(
      "Cloudinary is not configured (NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME / NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET).",
    );
  }

  const body = new FormData();
  body.append("file", file);
  body.append("upload_preset", preset);
  if (folder) body.append("folder", folder);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body },
  );

  const payload = (await res.json()) as {
    secure_url?: string;
    error?: { message?: string };
  };

  if (!res.ok || !payload.secure_url) {
    throw new Error(
      payload.error?.message ?? "Could not upload image to Cloudinary.",
    );
  }

  return payload.secure_url;
}

export function isCloudinaryUrl(url: string): boolean {
  try {
    const host = new URL(url).hostname;
    return host === "res.cloudinary.com";
  } catch {
    return false;
  }
}
