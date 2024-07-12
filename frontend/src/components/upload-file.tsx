import { useCallback, useState } from "react";
import { useDropzone } from 'react-dropzone';
import { CircleCheck, CloudUploadIcon, Laptop, Plus, XIcon } from "lucide-react";
import { filesize } from "filesize";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";

import { uploadFile } from "@/services/files/upload-file";
import { FileUpload } from "@/types/file";
import { useToast } from "@/hooks/use-toast";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "./ui/dialog"
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Spinner } from "./spinner";

export const UploadFile = () => {
    const queryClient = useQueryClient()
    const { toastError } = useToast()

    const [imagePreview, setImagePreview] = useState<FileUpload | null>(null);
    const [imageUpload, setImageUpload] = useState<File | null>(null)
    const [loading, setLoding] = useState(false);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];

        setImageUpload(file)
        setImagePreview({
                name: file.name,
                size: file.size,
                image_url: URL.createObjectURL(file),
                progress: 0,
                mimetype: file.type
            });
    }, []);
    
    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({ 
        onDrop,
        maxFiles: 1,
        accept: {
            'image/*': [],
            'application/pdf': ['pdf'],
            'video/*': [],
            'audio/*': [],
            'text/plain': ['plain'],
        }
    })

    const handleUpload = () => {
        if (!imageUpload) return
        setLoding(true)

        uploadFile(imageUpload, setImagePreview)
            .then(() => {
                queryClient.invalidateQueries({ queryKey: ['files'] })
                setLoding(false)
            })
            .catch(() => {
                toastError({
                    description: 'Houve um erro ao fazer upload do arquivo, tente novamente mais tarde.',
                    title: 'Erro ao fazer upload',
                })
                setImagePreview(null)
            })
    }

    return (
        <Dialog onOpenChange={() => setImagePreview(null)}>
            <DialogTrigger>
                <Button variant={'default'} className="h-10">
                    <Plus className="w-4 h-4 mr-1" />
                    <span>Novo arquivo</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="min-w-[36vw]">
                <DialogHeader className="mb-2">
                    <DialogTitle className="text-xl">Upload de um novo arquivo</DialogTitle>
                </DialogHeader>

                <div className="min-h-[42vh] p-4 rounded-md">
                    <div 
                        {...getRootProps()} 
                        className={clsx("p-4 h-52 border-2 border-muted-foreground/20 border-dashed rounded-md flex items-center justify-center", {
                            '!border-rose-400 bg-rose-500/10': isDragReject,
                            '!border-green-400 bg-green-500/10': isDragAccept,
                    })}>
                        <input {...getInputProps()} />
                        <div className="flex flex-col items-center gap-2">
                            <CloudUploadIcon className="w-24 h-24 text-muted-foreground" />
                            {
                                    !isDragActive && (
                                        <p className="text-center text-sm text-muted-foreground">
                                            Arraste o arquivo aqui, ou
                                        </p>
                                    )
                                }
                                {
                                    isDragAccept &&  (
                                        <p className="text-center text-sm text-green-400 font-bold">
                                            Solte o arquivo aqui...
                                        </p>
                                    )
                                }
                                {
                                    isDragReject && (
                                        <p className="text-center text-sm text-rose-400 font-bold">
                                            Arquivo não suportado
                                        </p>
                                    )
                                }
                                {
                                    !isDragActive && (
                                        <Button variant={'outline'} className="h-10">
                                            <Laptop className="w-4 h-4 mr-1" />
                                            Selecionar arquivo do computador
                                        </Button>
                                    )
                                }
                        </div>
                    </div>

                    <span className="text-muted-foreground font-normal text-sm text-center block mt-2">
                        Suportado apenas arquivos de imagens, PDFs, videos, audios e textos.
                    </span>

                    {!!imagePreview && (
                         <div className="mt-8 border border-muted-foreground/20 rounded-md px-4 py-2 flex items-center gap-4 relative">
                            <img src={imagePreview.image_url} className="w-14 h-14 rounded-md" alt="" />
    
                            <div className="flex w-full flex-col justify-center gap-2">
                                <span className="font-semibold w-[24vw] truncate ...">
                                    {imagePreview.name}
                                </span>
                                { imagePreview.progress > 0 &&  (
                                    <div>
                                        <Progress value={imagePreview.progress} className="h-1 w-[24vw]" />
                                        <span className="text-xs text-muted-foreground text-right block">
                                            {imagePreview.progress}%
                                        </span>
                                    </div>
                                )}
                                <div className="flex items-center gap-1 justify-between w-[25vw] mt-1">
                                    <div className="flex items-center gap-3">
                                        <span className="text-muted-foreground text-sm">
                                            {filesize(imagePreview.size)}
                                        </span>
                                        <Badge variant={'outline'} className="text-[10px] roude font-bold text-muted-foreground uppercase">
                                            {imagePreview.mimetype?.split("/")[1]}
                                        </Badge>
                                    </div>
                                    { imagePreview.progress === 100 && (
                                        <div className="flex items-center gap-1">
                                            <CircleCheck className="w-4 h-4 text-green-600" />
                                            <span className="text-green-600 text-xs font-bold">
                                                Concluído
                                            </span>
                                        </div>
                                    ) }
                                </div>
                            </div>
                            
                            {
                                !imagePreview.progress && (
                                    <Button
                                        variant={'ghost'}
                                        className="absolute right-3 top-2 transform p-0 h-5 w-5" 
                                        onClick={() => setImagePreview(null)} 
                                    >
                                        <XIcon className="w-4 h-4 text-muted-foreground" />
                                    </Button>
                                )
                            }
                        </div>
                    )}
                    </div>
                    <div className="flex items-center justify-end">
                        <Button 
                            className="h-10 mr-3"
                            onClick={handleUpload}
                            disabled={loading}
                        >
                            {
                                loading 
                                    ? (
                                        <div className="flex items-center gap-2">
                                            <Spinner className="w-4 h-4" />
                                            <span>Enviando...</span>
                                        </div>
                                    ) 
                                    : (
                                        <span>
                                            Fazer upload
                                        </span>
                                    )
                            }
                        </Button>
                        <DialogClose>
                        <Button variant={'outline'} className="text-text-card h-10 bg-background">
                            Cancelar
                        </Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    )
};
