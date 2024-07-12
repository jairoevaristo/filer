import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TrashIcon } from "lucide-react";

import { deleteFile } from "@/services/files/delete-file";
import { useToast } from "@/hooks/use-toast";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "./ui/dialog";
import { Separator } from "./ui/separator";
import { DialogHeader } from "./ui/dialog";
import { Button } from "./ui/button";
import { Spinner } from "./spinner";

type DeleteFileProps = {
    fileId: string | null;
    fileName: string  | null;
    open: boolean;
    handleClose: () => void;
}

export const DeleteFile = ({ fileId, fileName, handleClose, open }: DeleteFileProps) => {
    const queryClient = useQueryClient()
    const { toastError, toastSuccess } = useToast()

    const { isPending, mutate } = useMutation({
        mutationKey: ['delete-file', fileId],
        mutationFn: deleteFile,
        onSuccess: () => {
            handleClose()
            toastSuccess({
                title: 'Arquivo apagado com sucesso',
                description: 'Seu arquivo foi apagado com sucesso'
            })

            queryClient.invalidateQueries({ queryKey: ['files'] })
        },
        onError: () => {
            toastError({
                title: 'Erro ao apagar arquivo',
                description: 'Não foi possível apagar o arquivo, tente novamente mais tarde'
            })
        }
    })

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="px-4">
                <DialogHeader className="space-y-0">
                    <DialogTitle>
                        <h1 className="font-bold text-2xl">Deseja realmente apagar?</h1>
                            <span className="block mt-2 text-muted-foreground font-light text-sm truncate ... w-[30rem]">
                                {fileName}
                            </span>
                        <Separator className="mt-4" />
                    </DialogTitle>
                </DialogHeader>

                <DialogDescription className="flex justify-center flex-col gap-5">
                    <span className="text-md font-medium">
                        Ao remover esse arquivo ele será apagado permanentemente.
                    </span>

                    <span className="text-md font-medium">
                        Caso esse arquivo tenha sido compartilhado com outras pessoas elas não terão mais acesso a ele.
                    </span>

                    <span className="text-md font-medium">
                        E o seu compartilhamento também será apagado.
                    </span>
                </DialogDescription>

                <DialogFooter className="flex items-center mt-4">
                    <Button 
                        className="hover:bg-rose-600 hover:text-white disabled:bg-rose-600"
                        onClick={() => mutate(fileId || '')}
                        disabled={isPending}
                        variant={'outline'}
                    >
                       {
                            isPending ? (
                                <>
                                    <Spinner className="w-4 h-4 mr-2" />
                                    <span>Apagar arquivo</span>
                                </>
                            ) 
                            :   <>
                                    <TrashIcon className="w-4 h-4 mr-2" />
                                    <span>Apagar arquivo</span>
                                </>
                       }
                    </Button>

                    <DialogClose>
                        <Button>
                            Cancelar
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}