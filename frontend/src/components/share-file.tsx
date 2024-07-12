import { useCallback, useState } from "react"
import { ClipboardIcon, XIcon, } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import clsx from "clsx";

import { allUsers } from "@/services/users/all-users";
import { User } from "@/types/user";
import { Permission, Shared } from "@/types/share";
import { CreateShare } from "@/types/create-share";
import { createShare } from "@/services/shares/create-share";
import { useToast } from "@/hooks/use-toast";
import { ENV } from "@/utils/env";

import { Button } from "./ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog"
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { Checkbox } from "./ui/checkbox";
import { ShareFileUser, UserShare } from "./share-file-user";
import { Spinner } from "./spinner";

type ShareFileProps = {
    open: boolean;
    onOpenChange: () => void;
    filename: string | null;
    fileId: string | null
};

export const ShareFile = ({ onOpenChange, open, filename, fileId }: ShareFileProps) => {
    const [userSelected, setUserSelected] = useState<UserShare[]>([]);
    const [permission, setPermission] = useState<Permission>('VIEWER');
    const [value, setValue] = useState("")
    const [copied, setCopied] = useState(false);
    const [anyOne, setAnyOne] = useState(false);
    const [specific, setSpecific] = useState(true);
    const [generateLink, setGenerateLink] = useState("");

    const { toastSuccess, toastError } = useToast()

    const { data, isLoading } = useQuery<User[]>({ 
        queryKey: ["all-users", userSelected, value], 
        queryFn: () => allUsers(filterUsersByEmail(), value),
    })

    const { mutate, data: dataShare, isPending } = useMutation<Shared, Error, CreateShare>({
        mutationFn: createShare,
        onSuccess: (data) => {
            toastSuccess({
                title: 'Feito com sucesso',
                description: 'Arquivo compartilhado com sucesso',
            })

            setGenerateLink(`${ENV.DOMAIN_URL}/shared/${data?.id}`)
        },
        onError: () => {
            handleClose();
            toastError({
                title: 'Ocorreu um erro',
                description: 'Erro ao tentar compartilhar o arquivo, tente novamente',
            })
        }
    })

    const filterUsersByEmail = useCallback(() => {
        return userSelected?.filter(user => user.email).map(user => user.email)
    },[userSelected])

    const filterUsersById = useCallback(() => {
        return userSelected?.filter(user => user.email).map(user => user.id)
    },[userSelected])

    const handleAnyOne = () => {
        setAnyOne(true);
        setSpecific(false);
        setGenerateLink("");
        setCopied(false);
    };

    const handleSpecific = () => {
        setSpecific(true);
        setAnyOne(false);
        setGenerateLink("");
        setCopied(false);
    };

    const handleClose = useCallback(() => {
        onOpenChange();
        setCopied(false);
        setGenerateLink("");
        setSpecific(true);
        setAnyOne(false);
        setValue("");
        setUserSelected([]);
    }, [onOpenChange])

    const handleCopyLinkShare = async() => {
        await navigator.clipboard.writeText(`${ENV.DOMAIN_URL}/shared/${dataShare?.id}`);
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="min-h-[40vh] px-6 min-w-[32vw]">
                <DialogHeader className="space-y-0">
                    <DialogTitle>
                        <h1 className="font-bold text-2xl">Compartilhe com outras pessoas</h1>
                            <span className="block mt-2 text-muted-foreground font-light text-sm overflow-hidden break-words">
                                {filename}
                            </span>
                        <Separator className="mt-4" />
                    </DialogTitle>
                </DialogHeader>

                <div className="relative">
                    { specific && (
                        <>
                            <span className="font-normal text-lg">Adicione pessoas para ver esse arquivo</span>
                            <div className="flex items-center gap-2 mt-3">
                                <Input 
                                    className="h-10 flex-1" 
                                    placeholder="Adicionar pessoa, pelo nome ou e-mail"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                />
                                <ShareFileUser 
                                    value={value}
                                    users={data}
                                    loading={isLoading}
                                    onSelectedUser={(user) => {
                                        setUserSelected((prevState) => [...prevState, user])
                                        setValue("")
                                    }} 
                                />
                                <Select 
                                    defaultValue={permission}
                                    onValueChange={(value: Permission) => setPermission(value)}
                                >
                                    <SelectTrigger className="w-24 h-10 bg-secondary">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="VIEWER">Viewer</SelectItem>
                                        <SelectItem value="EDITOR">Editor</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            
                            <div className="flex items-center gap-2 flex-wrap mt-3 overflow-auto">
                                {userSelected.map(user => (
                                    <div className="flex items-center bg-secondary p-2 rounded-full w-52 relative z-10" key={user.id}>
                                        <img
                                            className="w-6 h-6 rounded-full"
                                            src={user.avatar}
                                            alt={user.name}
                                        />
                                        <div className="ml-2">
                                            <p className="font-medium text-xs">{user.name}</p>
                                            <p className="text-[10px] text-muted-foreground">{user.email}</p>
                                        </div>

                                        <Button 
                                            variant={'ghost'} 
                                            className="p-0 right-4 top-1 absolute"
                                            onClick={() => setUserSelected((prevState) => prevState.filter(u => u.id !== user.id))}
                                        >
                                            <XIcon className="w-3 h-3 text-muted-foreground" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {anyOne && (
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col gap-1 mb-1">
                                <span className="font-normal text-lg">Permissão</span>
                                <span className="font-medium text-xs text-muted-foreground">
                                    VIEW - Poderá apenas visualizar do arquivo
                                </span>
                                <span className="font-medium text-xs text-muted-foreground">
                                    EDITOR - Poderá visualizar e também fazer o download do arquivo
                                </span>
                            </div>

                            <Select 
                                defaultValue={permission}
                                onValueChange={(value: Permission) => setPermission(value)}
                            >
                                <SelectTrigger className="w-24 h-10 bg-secondary">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="VIEWER">Viewer</SelectItem>
                                    <SelectItem value="EDITOR">Editor</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    <div className={clsx("mt-20", { '!mt-10 mb-6' : anyOne })}>
                        <span className="font-normal text-lg">Link de compartilhamento</span>

                        <div className="border border-input h-10 rounded-md flex items-center justify-between pl-3 pr-2 mt-3">
                            <span className="text-muted-foreground text-sm">
                                {
                                    !generateLink 
                                            ? <span className="text-muted-foreground/30 font-light">O link de compartilhamento aparecerá aqui</span>
                                            : generateLink
                                }
                            </span>
                            
                            <Button 
                                variant="secondary" 
                                onClick={() => setCopied(true)}
                                disabled={!generateLink}
                                className={clsx("h-7 w-7 p-0", {
                                    "rounded-2xl w-[5.2rem] h-6 !cursor-default hover:bg-none": copied,
                                })} 
                            >
                                { !copied 
                                    ? <ClipboardIcon className="w-4 h-4 text-muted-foreground" onClick={handleCopyLinkShare} /> 
                                    : <span className="text-[12px] font-normal text-muted-foreground">link copiado</span> 
                                }
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mt-8">
                        <div className="flex items-center gap-1">
                            <Checkbox id="anyone" checked={anyOne} onCheckedChange={handleAnyOne} />
                            <label
                                htmlFor="anyone"
                                className="text-sm font-light cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Qualquer pessoa com esse link
                            </label>
                        </div>

                        <div className="flex items-center gap-1">
                            <Checkbox id="specific" checked={specific} onCheckedChange={handleSpecific} />
                            <label
                                htmlFor="specific"
                                className="text-sm font-light cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Apenas pessoas específicas
                            </label>
                        </div>
                    </div>
                </div>

                <DialogFooter className="flex items-center justify-end mt-4">
                    <Button 
                        className="ml-4" 
                        disabled={specific && userSelected.length === 0 || !!generateLink}
                        onClick={() => {
                            mutate({
                                fileId: fileId || '',
                                permission,
                                public_share: anyOne,
                                sharedToUsersId: filterUsersById()
                            })
                        }}
                    >
                        {isPending && <Spinner className="w-4 h-4 mr-2" />}
                        Compartilhar
                    </Button>
                    <DialogClose>
                        <Button variant="secondary">Cancelar</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
};
