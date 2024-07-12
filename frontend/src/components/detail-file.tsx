import { useQuery } from "@tanstack/react-query";
import { FileIcon } from "lucide-react";
import { format } from "date-fns";
import { filesize } from "filesize";

import { findFileById } from "@/services/files/find-file-by-id";
import { decryptFile } from "@/utils/decrypt-file";
import { FileDetail } from "@/types/file";

import { Separator } from "./ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet"
import { Spinner } from "./spinner";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

type DetailFileProps = {
    fileId: string | null;
    fileName: string  | null;
    open: boolean;
    handleClose: () => void;
}

export const DetailFile = ({ fileId, fileName, handleClose, open }: DetailFileProps) => {
  const { data, isLoading } = useQuery<FileDetail>({
    queryKey: ['file-by-id', fileId],
    queryFn: () => findFileById(fileId)
  })

  const { url, mimetype } = decryptFile({ url: data?.url, mimetype: data?.mimetype })

  return (
    <Sheet
        open={open}
        onOpenChange={handleClose}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            Detalhes do arquivo
          </SheetTitle>
          <Separator />
        </SheetHeader>

        <div className="flex justify-center mt-10">
          {!data && isLoading && <Spinner className="h-8 w-8" />}

         {
          data && !isLoading && (
            <div className="flex flex-col">
              <span className="text-sm break-words w-80 -mt-5">
                {fileName}
              </span>
              <Avatar className="w-full h-52 object-cover rounded mt-4">
                    <AvatarImage src={url} className="w-80 h-52 object-cover rounded" alt="file_image" />
                    <AvatarFallback className="flex items-center justify-center bg-secondary rounded-none">
                        <FileIcon className="w-80 h-44" />
                    </AvatarFallback>
                </Avatar>

                <div className="flex w-full items-center justify-between mt-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold">
                      Data de criação
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {format(data?.createdAt, 'dd/MM/yyyy HH:mm')}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm font-bold">
                      Tamanho do arquivo
                    </span>
                    <span className="text-sm text-muted-foreground text-right">
                      {filesize(data?.size)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col mt-2">
                    <span className="text-sm font-bold">
                      Compartilhamentos
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {data?._count.share}
                    </span>
                  </div>

                  <div className="flex flex-col mt-2">
                    <span className="text-sm font-bold">
                      Tipo de arquivo
                    </span>
                    <div className="flex items-center justify-end">
                      <Badge 
                        variant={'outline'} 
                        className="text-xs font-bold text-muted-foreground uppercase w-14 mt-2"
                      >
                        {mimetype?.split("/")[1]}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
          )
         }
        </div>
      </SheetContent>
    </Sheet>
  )
}
