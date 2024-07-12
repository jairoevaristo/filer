import { api } from "@/libs/axios";

export const deleteShare = async (id: string) => {
    const result = await api.delete<Promise<void>>(`/shared/${id}`)   
    return result.data;
}