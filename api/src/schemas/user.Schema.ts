import { z } from 'zod'

export const GetOrDeleteUserSchema = z.object({
  params: z.object({
    id: z.string({ invalid_type_error: 'Invalid id' })
  })
})

export const UpdateUserSchema = z.object({
  body: z
    .object({
      id_usuario: z
        .string()
        .min(3, { message: 'Debe tener entre 3 a 5 caracteres' })
        .max(5, { message: 'Debe tener entre 3 a 5 caracteres' }),
      password: z.string().min(6, 'Contraseña demasiado corta'),
      nombre: z.string().min(3).max(50).optional(),
      descripcion: z.string().optional(),
      correo: z.string().email('Escribe un correo electrónico correcto').optional(),
      add_user: z.string().min(3).max(5).optional(),
      id_rol: z.number().positive().optional(),
      estado: z.boolean().optional()
    })
    .strict(),
  params: z.object({
    id: z.string({ invalid_type_error: 'Invalid id' })
  })
})

export type GetOrDeleteUserParamsType = z.infer<typeof GetOrDeleteUserSchema>['params']

export type UpdateUserBodyType = z.infer<typeof UpdateUserSchema>['body']
export type UpdateUserParamsType = z.infer<typeof UpdateUserSchema>['params']
