import { api } from "@/libs/axios";
import { FileView } from "@/types/file-view";

export const viewFileShared = async (id: string) => {
    const result = await api.get<Promise<FileView>>(`/shared/permission/${id}`)
    return result.data
};
