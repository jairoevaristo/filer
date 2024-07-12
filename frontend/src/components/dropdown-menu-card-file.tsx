import { ListCollapse, MoreVertical, Share2, Trash2 } from "lucide-react"

import { useDropdownMenuCardFile } from "@/hooks/use-dropdown-menu-card-file"

import { Button } from "./ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { ShareFile } from "./share-file"
import { DeleteFile } from "./delete-file"
import { DetailFile } from "./detail-file"

type DropdownMenuCardFileProps = {
    className: string;
    filename: string | null;
    fileId: string | null;
}

export const DropdownMenuCardFile = ({ className, filename, fileId }: DropdownMenuCardFileProps) => {
    const {
        handleOpenShareFile,
        openShareFile,
        handleOpenDeleteFile,
        openDeleteFile,
        handleOpenViewDetails,
        openViewDetails
    } = useDropdownMenuCardFile()

    return (
        <div className={className}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={'ghost'} className="p-0 h-6 w-6">
                        <MoreVertical className="w-5 h-5 text-muted-foreground" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem className="cursor-pointer" onClick={handleOpenViewDetails}>
                        <ListCollapse className="w-4 h-4 mr-2" />
                        <span>Ver detalhes</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={handleOpenShareFile}>
                        <Share2 className="w-4 h-4 mr-2" />
                        <span>Compartilhar arquivo</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer" onClick={handleOpenDeleteFile}>
                        <Trash2 className="w-4 h-4 mr-2 text-red-700" />
                        <span className="text-red-700">Deletar arquivo</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <ShareFile
                onOpenChange={handleOpenShareFile}
                open={openShareFile}
                filename={filename}
                fileId={fileId}
            />

            <DeleteFile 
                fileId={fileId}
                fileName={filename}
                handleClose={handleOpenDeleteFile}
                open={openDeleteFile}
            />

            <DetailFile 
                fileId={fileId}
                fileName={filename}
                handleClose={handleOpenViewDetails}
                open={openViewDetails}
            />
        </div>
    )
}