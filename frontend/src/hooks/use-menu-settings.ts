import { useQueryClient } from "@tanstack/react-query"

import { logout } from "@/services/users/logout"
import { Theme } from "@/contexts/theme-context"

import { useAuth } from "./use-auth"
import { useToast } from "./use-toast"
import { useTheme } from "./use-theme"

export const useMenuSettings = () => {
    const queryClient = useQueryClient();
    const { setIsAuthenticated } = useAuth()
    const { toastError } = useToast()
    const { setTheme } = useTheme()
    
    const handleTheme = (theme: Theme) => {
        setTheme(theme)
    }

    const logOut = async () => {
        try {
            await logout()
            queryClient.clear()
            setIsAuthenticated(false)
        } catch (error) {
            toastError({
                title: 'Houve um erro',
                description: 'Erro ao fazer logout',
                onClick: () => {}
            })
        }
    }

    return {
        logOut,
        handleTheme
    }
}