import CryptoJS from 'crypto-js';

import { ENV } from './env';

type DecryptedFileData = {
  url?: string;
  name?: string;
  mimetype?: string;
};

export const decryptFile = (file: DecryptedFileData | undefined) => {
    if (!file) return {
      url: "",
      name: "",
      mimetype: "",
    }

    try {
        const bytesUrlFile = CryptoJS.AES.decrypt(file.url || '', ENV.ENCRYPT_SECRET_KEY);
        const url_file = bytesUrlFile.toString(CryptoJS.enc.Utf8);

        const bytesMimetype = CryptoJS.AES.decrypt(file.mimetype || '', ENV.ENCRYPT_SECRET_KEY);
        const mimetype = bytesMimetype.toString(CryptoJS.enc.Utf8);
  
        const bytesName = CryptoJS.AES.decrypt(file.name || '', ENV.ENCRYPT_SECRET_KEY);
        const name = bytesName.toString(CryptoJS.enc.Utf8);

        return {
            url: url_file,
            name,
            mimetype,
        };
    } catch (error) {
      console.error('Error during decryption', error);
      return {
        url: "",
        name: "",
        mimetype: "",
      };
    }
  }