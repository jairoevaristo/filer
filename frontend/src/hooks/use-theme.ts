import { ThemeProviderContext } from "@/contexts/theme-context"
import { useContext } from "react"

export const useTheme = () => {
    return useContext(ThemeProviderContext)
}