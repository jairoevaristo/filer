import { api } from "@/libs/axios"
import { FileDetail } from "@/types/file"

export const findFileById = async (fileId: string | null) => {
    const result = await api.get<Promise<FileDetail>>(`/file/${fileId}`)
    return result.data
}