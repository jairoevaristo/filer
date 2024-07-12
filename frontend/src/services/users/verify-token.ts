import { api } from "@/libs/axios"

export const verifyToken = async () => {
    const result = await api.get('/auth/verify-token')   
    return result;
}