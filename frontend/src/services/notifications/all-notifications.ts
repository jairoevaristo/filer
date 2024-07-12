import { api } from "@/libs/axios";
import { Notification } from "@/types/notifications";

export const allNotifications = async () => {
    const result = await api.get<Promise<Notification[]>>("/notification/list-notifications");
    return result.data;
}