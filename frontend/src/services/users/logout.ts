import { api } from "@/libs/axios";

export const logout = async () => {
    const result = await api.post('/auth/logout')   
    return result;
}