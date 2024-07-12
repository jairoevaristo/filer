import { api } from "@/libs/axios";
import { ShareFileWithMe } from "@/types/share";

export async function listShareWithMe() {
    const result = await api.get<Promise<ShareFileWithMe[]>>("/shared/list-share-with-me");
    return result.data;
}
