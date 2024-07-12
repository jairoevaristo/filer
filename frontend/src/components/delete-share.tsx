import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";
import { TrashIcon } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { deleteShare } from "@/services/shares/delete-share";

import { Separator } from "./ui/separator";
import { DialogHeader } from "./ui/dialog";
import { Button } from "./ui/button";
import { Spinner } from "./spinner";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "./ui/dialog";

type DeleteShareProps = {
    shareId: string | null;
    children: ReactNode
}

export const DeleteShare = ({ shareId, children }: DeleteShareProps) => {
    const queryClient = useQueryClient()
    const { toastError, toastSuccess } = useToast()

    const { isPending, mutate } = useMutation({
        mutationKey: ['delete-share', shareId],
        mutationFn: deleteShare,
        onSuccess: () => {
            toastSuccess({
                title: 'Compartilhamento apagado com sucesso',
                description: 'Seu Compartilhamento foi apagado com sucesso'
            })

            queryClient.invalidateQueries({ queryKey: ['shares'] })
        },
        onError: () => {
            toastError({
                title: 'Erro ao apagar compartilhamento',
                description: 'Não foi possível apagar o compartilhamento, tente novamente mais tarde'
            })
        }
    })

    return (
        <Dialog modal>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="px-4 w-full">
                <DialogHeader className="space-y-0">
                    <DialogTitle>
                        <h1 className="font-bold text-2xl">Deseja realmente apagar?</h1>
                        <Separator className="mt-4" />
                    </DialogTitle>
                </DialogHeader>

                <DialogDescription className="flex justify-center flex-col gap-5">
                    <span className="text-md font-medium leading-6">
                        Este compartilhamento será apagado permanentemente, e os usuários que possuem acesso a ele não poderão mais acessá-lo.
                    </span>

                </DialogDescription>

                <DialogFooter className="flex items-center mt-4">
                    <Button 
                        className="hover:bg-rose-600 hover:text-white disabled:bg-rose-600"
                        onClick={() => mutate(shareId || '')}
                        disabled={isPending}
                        variant={'outline'}
                    >
                       {
                            isPending ? (
                                <>
                                    <Spinner className="w-4 h-4 mr-2" />
                                    <span>Apagar campartilhamento</span>
                                </>
                            ) 
                            :   <>
                                    <TrashIcon className="w-4 h-4 mr-2" />
                                    <span>Apagar campartilhamento</span>
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