import { api } from "@/libs/axios"

type SignUpData = {
    name: string
    email: string
    password: string
    avatar_url: string
}

export const signUp = async (data: SignUpData) => {
    const result = await api.post('/users/create', { ...data })   
    return result;
}