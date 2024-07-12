import { Permission } from "./share";

export type CreateShare = {
    fileId: string;
    permission: Permission;
    public_share?: boolean;
    sharedToUsersId: string[]
}