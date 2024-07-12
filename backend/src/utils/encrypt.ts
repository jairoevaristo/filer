import * as CryptoJS from 'crypto-js';

import { FileCipher } from 'src/types/file';
import { env } from 'src/constants/env';

export function encryptFile(data: FileCipher) {
  const { mimetype, name, url } = data;

  if (!env.ENCRYPT_SECRET_KEY) {
    throw new Error('Private key is not defined');
  }

  const privateKey = env.ENCRYPT_SECRET_KEY;

  try {
    const encryptedName = CryptoJS.AES.encrypt(
      name?.toLocaleLowerCase(),
      privateKey,
    ).toString();
    const encryptedUrl = CryptoJS.AES.encrypt(
      url?.toLocaleLowerCase(),
      privateKey,
    ).toString();
    const encryptedMimeType = CryptoJS.AES.encrypt(
      mimetype?.toLocaleLowerCase(),
      privateKey,
    ).toString();

    return {
      encryptedMimeType,
      encryptedName,
      encryptedUrl,
    };
  } catch (error) {
    throw new Error(error);
  }
}
