import fs from 'fs';
import path from 'path';

export default async function deleteFile(file: string): Promise<void> {
  const filePath = path.resolve(__dirname, '..','..', 'uploads', file);

  try {
    await fs.promises.stat(filePath);
  } catch {
    return;
  }

  await fs.promises.unlink(filePath);
}