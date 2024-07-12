import { api } from "@/libs/axios";
import { SharedFileList } from "@/types/share";

export const listMyShare = async () => {
    const result = await api.get<Promise<SharedFileList[]>>("/shared/list-my-shared")
    return result.data
};
