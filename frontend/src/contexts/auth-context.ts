import { createContext } from "react"

export type AuthContextType = {
    isAuthenticated: boolean
    setIsAuthenticated: (value: boolean) => void
    loading: boolean
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)