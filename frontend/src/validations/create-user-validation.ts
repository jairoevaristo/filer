import  { z } from "zod"

export const createUserSchema = z.object({
    name: z.string().nonempty('nome é obrigatório'),
    password: z.string().min(8, 'sua senha deve ter 8 caracteres no minimo'),
    email: z.string().nonempty('e-mail é obrigatório').email('esse e-mail é inválido')
})

export type CreateUserSchema = z.infer<typeof createUserSchema>