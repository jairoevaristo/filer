import { api } from "@/libs/axios";
import { SharedFileList } from "@/types/share";

export const findShareById = async (id: string | null) => {
    const result = await api.get<Promise<SharedFileList>>(`/shared/${id}`)   
    return result.data;
}