import { format } from "date-fns";
import { filesize } from "filesize";
import { File as FileIcon } from "lucide-react";

import { File } from "@/types/file";
import { decryptFile } from "@/utils/decrypt-file";

import { Card } from "./ui/card";
import { DropdownMenuCardFile } from "./dropdown-menu-card-file";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type CardFileItemProps = {
    file: File
}

export const CardFileItem = ({ file }: CardFileItemProps) => {
    const { url, name } = decryptFile({ mimetype: file.mimetype, url: file.url, name: file.name })

    if (!file) return <h1>Loading...</h1>

    return(
        <Card className="bg-muted/40 rounded-lg p-4 h-52 shadow-none">
            <div className="flex flex-col justify-center gap-6 relative">
                <DropdownMenuCardFile  
                    className="absolute -top-1 -right-1 z-50" 
                    filename={name} 
                    fileId={file.id}
                />
                <Avatar className="w-20 h-20 object-cover rounded">
                        <AvatarImage src={url} className="w-20 h-20 object-cover rounded" alt="file_image" />
                        <AvatarFallback>
                            <FileIcon className="w-20 h-20 text-muted-foreground" />
                        </AvatarFallback>
                    </Avatar>

                <div className="flex flex-col justify-center">
                    <span className="text-sm font-semibold break-words overflow-hidden w-80">{name}</span>
                    <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-muted-foreground">
                            {filesize(file.size)}
                        </span>
                        <span className="text-sm text-muted-foreground">
                            {format(file.createdAt, "dd/MM/yyyy")}
                        </span>
                    </div>
                </div>
            </div>
        </Card>
    );
};
