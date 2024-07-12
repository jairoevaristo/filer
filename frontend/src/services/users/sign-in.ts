import { api } from "@/libs/axios"

export const signIn = async (email: string, password: string) => {
    const result = await api.post('/auth', { email, password })   
    return result;
}