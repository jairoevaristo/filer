import clsx from 'clsx';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { EyeOff, Eye } from 'lucide-react';

import { useToast } from '@/hooks/use-toast';
import { signUp } from '@/services/users/sign-up';
import { CreateUserSchema, createUserSchema } from '@/validations/create-user-validation';
import { generateAvatar } from '@/utils/generate-avatar';

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Spinner } from './spinner';

export const SignUp = () => {
    const { toastSuccess, toastError } = useToast()
    const [loading, setLoading] = useState(false)
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<CreateUserSchema>({
        resolver: zodResolver(createUserSchema)
    })

    const submit = async (data: CreateUserSchema) => {
        setLoading(true)
        
        try {
            await signUp({
                avatar_url: generateAvatar(),
                email: data.email,
                name: data.name,
                password: data.password
            })

            toastSuccess({
                title: "Tudo certo",
                description: 'Sua conta foi criada com sucesso',
            })
        } catch(error) {
            if (error instanceof AxiosError) {
                toastError({
                    title: "Houve um erro",
                    description: error.response?.data.message,
                });
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <span className="text-gray-500 font-ligth text-center block mt-4">Crie sua conta em nossa plataforma</span>
            <form className="px-6 py-4 mt-3" onSubmit={handleSubmit(submit)}>
                <div className="space-y-1 mb-8 relative">
                    <Label htmlFor="name">Nome</Label>
                    <Input
                        id="name" 
                        {...register('name')} 
                        className="h-10" 
                        placeholder="Seu nome" 
                    />
                    {errors.name &&
                        <span className="text-red-500 font-medium text-xs absolute -bottom-5 left-0">
                            {errors.name.message}
                        </span>
                    }
                </div>

                <div className="space-y-1 mb-8 relative">
                    <Label htmlFor="e-mail">E-mail</Label>
                    <Input 
                        id="e-mail" 
                        {...register('email')}
                        className="h-10" 
                        placeholder="Seu endereço de e-mail" 
                    />
                    {errors.email && 
                        <span className="text-red-500 font-medium text-xs absolute -bottom-5 left-0">
                            {errors.email.message}
                        </span>
                    }
                </div>

                <div className="space-y-1 relative">
                    <Label htmlFor="password">Senha</Label>
                    <div className={clsx("border h-10 rounded-md flex items-center justify-between pr-2", {
                        "ring-1 ring-ring": isFocused
                    })}>
                        <Input 
                            {...register('password')}
                            id="password" 
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            className="border-none focus-visible:ring-0"
                            placeholder="Sua senha" 
                            type={showPassword ? "text" : "password"}
                        />
                        {errors.password && 
                            <span className="text-red-500 font-medium text-xs absolute -bottom-5 left-0">
                                {errors.password.message}
                            </span>
                        }
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
                    <span>Criar conta</span>
                </Button>
            </form>
        </div>
    )
}