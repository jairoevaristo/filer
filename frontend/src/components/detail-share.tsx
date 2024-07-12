import { ReactNode, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CheckIcon, ClipboardIcon, FileIcon } from "lucide-react";
import { format } from "date-fns";

import { decryptFile } from "@/utils/decrypt-file";
import { findShareById } from "@/services/shares/find-by-id";
import { SharedFileList } from "@/types/share";
import { ENV } from "@/utils/env";

import { Separator } from "./ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { Spinner } from "./spinner";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

type DetailFileProps = {
    shareId: string | null;
    children: ReactNode;
}

export const DetailShare = ({ shareId, children }: DetailFileProps) => {
  const [copied, setCopied] = useState(false);

  const { data, isLoading } = useQuery<SharedFileList>({
    queryKey: ['share-by-id', shareId],
    queryFn: () => findShareById(shareId)
  })

  const { url, name } = decryptFile({ name: data?.file.name, url: data?.file.url })

  return (
    <Sheet onOpenChange={() => setCopied(false)}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="!max-w-[26vw] flex flex-col !px-6">
        <SheetHeader>
          <SheetTitle>
            Detalhes do compartilhamento
          </SheetTitle>
          <Separator />
        </SheetHeader>

        <div className="flex justify-center mt-10">
          {!data && isLoading && <Spinner className="h-8 w-8" />}

         {
          data && !isLoading && (
            <div className="flex flex-col">
              <span className="text-sm break-words w-80 -mt-5">
                {name}
              </span>
              <Avatar className="w-full flex items-center justify-center h-52 object-cover rounded mt-4">
                <AvatarImage src={url} className="h-52 object-cover rounded mb-4" alt="file_image" />
                <AvatarFallback className="flex items-center justify-center bg-secondary rounded-none">
                    <FileIcon className="w-80 h-44" />
                </AvatarFallback>
              </Avatar>

              <Separator className="my-4" />

                <div className="flex flex-col w-full justify-center mt-2">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold">
                      Data de criação
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {format(data?.createdAt, 'dd/MM/yyyy HH:mm')}
                    </span>
                  </div>

                  <div className="flex flex-col mt-3">
                    <span className="text-sm font-bold mb-1">
                      Compartilhado com
                    </span>

                    {data?.sharedToUsersIds.length === 0 && 
                      <Badge 
                        variant={'outline'} 
                        className="rounded py-1 px-3 w-[13.6rem] mt-1 uppercase mb-2"
                      >
                        Compartilhamento público
                      </Badge>
                    }

                    <div className="flex items-center gap-2 flex-wrap">
                      {data?.sharedToUsersIds.map(user => (
                        <div className="flex items-center bg-secondary p-2 rounded-full w-52 relative z-10 mb-2" key={user.id}>
                            <img
                                className="w-6 h-6 rounded-full"
                                src={user.avatar}
                                alt={user.name}
                            />
                            <div className="ml-2">
                                <p className="font-medium text-xs">{user.name}</p>
                                <p className="text-[10px] text-muted-foreground">{user.email}</p>
                            </div>
                        </div>
                      ))}
                    </div>
                </div>
                <div className="flex flex-col w-full justify-between mt-2">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold mb-1">
                      Permissão de visualização
                    </span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="rounded py-1 px-3 w-[4.5rem]">
                        {data?.permission}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {
                          data?.permission === 'EDITOR' 
                            ? ' - Poderá visualizar e também fazer o download do arquivo'
                            : ' - Poderá apenas visualizar o arquivo'
                        }
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col w-full justify-between mt-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold mb-1">
                     Link de compartilhamento
                    </span>
                    <div className="border border-input h-10 rounded-md flex items-center justify-between px-2">
                      <span className="text-muted-foreground text-sm">
                        {`${ENV.DOMAIN_URL}/shared/${data?.id}`}
                      </span>
                      <Button 
                        variant="secondary" 
                        className="h-7 w-7 p-0 ml-2"
                        onClick={async () => {
                          await navigator.clipboard.writeText(`${ENV.DOMAIN_URL}/shared/${data?.id}`)
                          setCopied(true)
                        }} 
                      >
                        { !copied 
                          ? <ClipboardIcon className="w-4 h-4 text-muted-foreground" /> 
                          : <CheckIcon className="w-4 h-4 text-green-600" />
                        }
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
