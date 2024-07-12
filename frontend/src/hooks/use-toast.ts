import { toast } from "sonner"

type ToastProps = {
    title?: string
    description: string
    onClick?: () => void
}

export const useToast = () => {
    const toastSuccess = ({ onClick, description, title }: ToastProps) => {
        toast.success(title, {
            description,
            action: {
                label: "Fechar",
                onClick: onClick ? onClick : () => {},
            },
        })
    }

    const toastError = ({ onClick, description, title }: ToastProps) => {
        toast.error(title, {
            description,
            action: {
                label: "Fechar",
                onClick: onClick ? onClick : () => {},
            },
        })
    }

    return {
        toastSuccess,
        toastError,
    }
};
