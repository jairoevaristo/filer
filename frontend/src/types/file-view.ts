import { Permission } from "./share";

export type FileView = {
    id: string;
    permission: Permission;
    createdAt: Date;
    file: {
        id: string;
        createdAt: Date;
        name: string;
        url: string;
        mimetype: string;
        size: number;
    };
    response: {
        statusCode: number | undefined
    }
}