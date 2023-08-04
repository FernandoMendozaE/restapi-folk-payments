import { verifyToken } from '../middlewares/authJwt'
import { Router } from 'express'
const router = Router()

import { createRole, deleteRole, getRole, getRoles, updateRole } from '../controllers/roles.controller'
import { schemaValition } from '../middlewares/schemaValidator.middleware'
import { CreateRoleSchema, GetOrDeleteRoleSchema, UpdateRoleSchema } from '../schemas/role.schema'

router.post('/', schemaValition(CreateRoleSchema), createRole)

router.get('/', getRoles)

router.get('/:id', schemaValition(GetOrDeleteRoleSchema), getRole)

router.put('/:id', schemaValition(UpdateRoleSchema), [verifyToken], updateRole)

router.delete('/:id', schemaValition(UpdateRoleSchema), [verifyToken], deleteRole)

export default router
