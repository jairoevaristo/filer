import { api } from "@/libs/axios"
import { User } from "@/types/user";

export const userProfile = async () => {
    const result = await api.get<Promise<User>>('/users/profile')   
    return result.data;
}