import { api } from "@/libs/axios";

export const deleteFile = async (id: string) => {
    const result = await api.delete<Promise<void>>(`/file/${id}`)   
    return result.data;
}