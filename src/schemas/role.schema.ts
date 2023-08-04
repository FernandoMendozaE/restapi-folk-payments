import { z } from 'zod'

export const CreateRoleSchema = z.object({
  body: z
    .object({
      nombre_rol: z.string()
    })
    .strict()
})

export const GetOrDeleteRoleSchema = z.object({
  params: z.object({
    id: z.string({ invalid_type_error: 'Invalid id' })
  })
})

export const UpdateRoleSchema = z.object({
  body: z
    .object({
      nombre_rol: z.string().optional(),
      estado: z.boolean().optional()
    })
    .strict(),
  params: z.object({
    id: z.string({ invalid_type_error: 'Invalid id' })
  })
})

export type CreateRoleSchemaType = z.infer<typeof CreateRoleSchema>['body']
export type GetOrDeleteRoleParamsType = z.infer<typeof GetOrDeleteRoleSchema>['params']

export type UpdateRoleBodyType = z.infer<typeof UpdateRoleSchema>['body']
export type UpdateRoleParamsType = z.infer<typeof UpdateRoleSchema>['params']
