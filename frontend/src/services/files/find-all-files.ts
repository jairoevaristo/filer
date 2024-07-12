import { api } from "@/libs/axios";
import { File } from "@/types/file";

export const findAllFiles = async () => {
    const result = await api.get<Promise<File[]>>('/file/')   
    return result.data;
}