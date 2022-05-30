import fs from 'fs';

export const deleteFile = async (path: string) => {
  try {
    await fs.promises.stat(path);
  } catch {
    return null;
  }

  await fs.promises.unlink(path);
  return null;
};
