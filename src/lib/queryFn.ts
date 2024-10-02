export type Meme = {
  name: string
  url: string
}

export type UploadError = {
  statusCode: string
  error: string
  message: string
}

export async function getAllMeme({ folder, offset, limit, search }: { folder?: string; offset?: number; limit?: number, search?: string }) {
  const response = await fetch(`${import.meta.env.PUBLIC_API_URL}/memes?offset=${offset}&limit=${limit}&search=${search}`)
  if (folder) {
    const response = await fetch(`${import.meta.env.PUBLIC_API_URL}/memes?folder=${folder}&offset=${offset}&limit=${limit}&search=${search}`)
    const data = await response.json()

    return data
  }

  const data = await response.json()

  return data
}

export async function AddMeme(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${import.meta.env.PUBLIC_API_URL}/upload`, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMessage = `${data.message}`;
    throw new Error(errorMessage);
  }

  return data;
}