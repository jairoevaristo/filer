import * as CryptoJS from 'crypto-js';

import { FileCipher } from 'src/types/file';
import { env } from 'src/constants/env';

export function decryptFile(encryptedData: FileCipher) {
  const { mimetype, name, url } = encryptedData;

  if (!env.ENCRYPT_SECRET_KEY) {
    throw new Error('Private key is not defined');
  }

  const privateKey = env.ENCRYPT_SECRET_KEY;

  const decryptedNameBytes = CryptoJS.AES.decrypt(name, privateKey);
  const decryptedName = decryptedNameBytes.toString(CryptoJS.enc.Utf8);

  const decryptedUrlBytes = CryptoJS.AES.decrypt(url, privateKey);
  const decryptedUrl = decryptedUrlBytes.toString(CryptoJS.enc.Utf8);

  const decryptedMimeTypeBytes = CryptoJS.AES.decrypt(mimetype, privateKey);
  const decryptedMimeType = decryptedMimeTypeBytes.toString(CryptoJS.enc.Utf8);

  return {
    name: decryptedName,
    url: decryptedUrl,
    mimetype: decryptedMimeType,
  };
}
