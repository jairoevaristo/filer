import { api } from "@/libs/axios";
import { User } from "@/types/user";

export const allUsers = async (emails: string[], value: string) => {
    const queryParams = new URLSearchParams();
    queryParams.append('search', value)
    
    emails.length === 0 
        ? queryParams.append('emails', "") 
        : emails.forEach((email) => queryParams.append('emails', email));

    const result = await api.get<Promise<User[]>>(`/users/all-users?${queryParams}`)   
    return result.data;
}