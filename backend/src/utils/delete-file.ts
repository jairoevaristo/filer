import { unlink } from 'fs';

export async function deleteLocalFile(filePath: string) {
  new Promise((resolve, reject) => {
    unlink(filePath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(null);
      }
    });
  });
}
