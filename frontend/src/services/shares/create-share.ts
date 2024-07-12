import { api } from "@/libs/axios";
import { CreateShare } from "@/types/create-share";
import { Shared } from "@/types/share";

export const createShare = async (share: CreateShare) => {
    const result = await api.post<Promise<Shared>>("/shared/create", share);
    return result.data;
}