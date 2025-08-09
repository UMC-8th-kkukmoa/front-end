import apiClient from './client';

type UploadDirectory = 'store' | 'review' | 'qr';

function guessMimeType(uriOrName: string): string {
  const lower = uriOrName.toLowerCase();
  if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) return 'image/jpeg';
  if (lower.endsWith('.png')) return 'image/png';
  if (lower.endsWith('.gif')) return 'image/gif';
  if (lower.endsWith('.webp')) return 'image/webp';
  if (lower.endsWith('.heic')) return 'image/heic';
  if (lower.endsWith('.heif')) return 'image/heif';
  return 'application/octet-stream';
}

function getExtensionFromMimeType(mimeType: string): string {
  switch (mimeType) {
    case 'image/jpeg':
      return 'jpg';
    case 'image/png':
      return 'png';
    case 'image/gif':
      return 'gif';
    case 'image/webp':
      return 'webp';
    case 'image/heic':
      return 'heic';
    case 'image/heif':
      return 'heif';
    default:
      return '';
  }
}

function buildTimestampString(date: Date): string {
  const pad = (n: number) => `${n}`.padStart(2, '0');
  const yyyy = date.getFullYear();
  const mm = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const hh = pad(date.getHours());
  const mi = pad(date.getMinutes());
  const ss = pad(date.getSeconds());
  return `${yyyy}${mm}${dd}-${hh}${mi}${ss}`;
}

function extractFilenameFromUri(uri: string): string {
  try {
    const withoutQuery = uri.split('?')[0];
    const last = withoutQuery.split('/').pop();
    if (last) return decodeURIComponent(last);
  } catch {
    // intentionally empty
  }

  const ts = buildTimestampString(new Date());
  const mime = guessMimeType(uri);
  const ext = getExtensionFromMimeType(mime);
  return `image-${ts}${ext ? `.${ext}` : ''}`;
}

export async function uploadImage(
  directory: UploadDirectory,
  fileUri: string,
  options?: { filename?: string; mimeType?: string },
): Promise<string> {
  const filename = options?.filename ?? extractFilenameFromUri(fileUri);
  const mimeType = options?.mimeType ?? guessMimeType(fileUri);

  const formData = new FormData();
  formData.append('image', {
    uri: fileUri,
    name: filename,
    type: mimeType,
  } as any);

  const response = await apiClient.post<string>(
    `/api/images/upload/${encodeURIComponent(directory)}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
}

export default {
  uploadImage,
};
