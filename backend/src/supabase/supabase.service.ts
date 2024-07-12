import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as crypto from 'crypto';

import { supabase } from 'src/libs/supabase';

@Injectable()
export class SupabaseService {
  constructor() {}

  async upload(
    file: Express.Multer.File,
    userId: string,
  ): Promise<{ publicUrl: string; fullPath: string }> {
    try {
      const fileBuffer = fs.readFileSync(file.path);
      const randomBytes = crypto.randomBytes(8).toString('hex');
      const fileName = `${userId}/${randomBytes}-${file.filename}`;

      const { error, data } = await supabase.storage
        .from('filer')
        .upload(fileName, fileBuffer, {
          contentType: file.mimetype,
        });

      if (error) throw error;

      const {
        data: { publicUrl },
      } = supabase.storage.from('filer').getPublicUrl(fileName);

      return { publicUrl, fullPath: data.fullPath };
    } catch (error) {
      console.error('Erro ao fazer upload do arquivo:', error);
      throw new Error(error);
    }
  }

  async delete(fullPath: string): Promise<void> {
    try {
      const { error } = await supabase.storage.from('filer').remove([fullPath]);
      if (error) throw error;
    } catch (error) {
      console.error('Erro ao deletar arquivo:', error);
      throw new Error(error);
    }
  }
}
