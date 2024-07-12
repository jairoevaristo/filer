import { FormEvent, useEffect, useState } from "react"
import { EyeOff, Eye } from "lucide-react"
import { AxiosError } from "axios"
import clsx from "clsx"

import { ROUTES } from "@/constants/routes"
import { useAuth } from "@/hooks/use-auth"
import { signIn } from "@/services/users/sign-in"
import { useToast } from "@/hooks/use-toast"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Spinner } from "./spinner"

export const SignIn = () => {
    const { toastError, toastSuccess } = useToast()
    const { isAuthenticated, setIsAuthenticated } = useAuth()

    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        try {
            await signIn(email, password)

            toastSuccess({
                title: "Tudo certo",
                description: 'Bem vindo a plataforma',
            })

            setIsAuthenticated(true)

        } catch (error) {
            if (error instanceof AxiosError) {
                toastError({
                    title: "Houve um erro",
                    description: error.response?.data.message || 'Houve um erro ao tentar logar',
                });
                setLoading(false)
            }
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            window.location.replace(ROUTES.home)
        }
    }, [isAuthenticated])

    return (
        <div>
            <span className="text-gray-500 font-ligth text-center block mt-4">Faça o login em nossa plataforma</span>
            <form className="px-6 py-4 mt-3" onSubmit={handleSubmit}>
                <div className="space-y-1 mb-5">
                    <Label htmlFor="e-mail">E-mail</Label>
                    <Input 
                        onChange={e => setEmail(e.target.value)} 
                        id="e-mail" 
                        className="h-10" 
                        placeholder="Seu endereço de e-mail" 
                    />
                </div>

                <div className="space-y-1">
                    <Label htmlFor="password">Senha</Label>
                    <div className={clsx("border h-10 rounded-md flex items-center justify-between pr-2", {
                        "ring-1 ring-ring": isFocused
                    })}>
                        <Input 
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            id="password" 
                            className="border-none focus-visible:ring-0"
                            placeholder="Sua senha"
                            onChange={e => setPassword(e.target.value)}
                            type={showPassword ? "text" : "password"}
                        />
                        <button type="button" onClick={() => setShowPassword(prev => !prev)}>
                            {
                                showPassword 
                                    ? <EyeOff className="h-5 w-5 text-gray-400" />
                                    : <Eye  className="h-5 w-5 text-gray-400" />
                            }
                        </button>
                    </div>
                </div>

                <Button className="mt-10 h-12 w-full">
                    {loading && <Spinner className='w-4 h-4 mr-2' />}
                    <span>Login</span>
                </Button>
            </form>
        </div>
    )
}