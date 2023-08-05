import { z } from 'zod'

export const AuthSingUpSchema = z.object({
  body: z
    .object({
      username: z
        .string()
        .min(3, { message: 'Debe tener entre 5 a 12 caracteres' })
        .max(5, { message: 'Debe tener entre 5 a 12 caracteres' }),
      password: z.string().min(6, 'Contraseña demasiado corta'),
      nombres: z.string().min(3).max(50),
      ap_paterno: z.string(),
      ap_materno: z.string(),
      descripcion: z.string(),
      correo: z.string().email('Escribe un correo electrónico correcto'),
      id_rol: z.string(),
      estado: z.boolean().optional()
    })
    .strict()
})

export const AuthSingInSchema = z.object({
  body: z
    .object({
      username: z
        .string()
        .min(3, { message: 'Debe tener entre 5 a 12 caracteres' })
        .max(5, { message: 'Debe tener entre 5 a 12 caracteres' }),
      password: z.string().min(5, { message: 'Debe tener 5 o más caracteres' })
    })
    .strict()
})

export type SingUpBodySchema = z.infer<typeof AuthSingUpSchema>['body']

export type SingInBodySchema = z.infer<typeof AuthSingInSchema>['body']
