import { verifyToken } from '../middlewares/authJwt'
import { Router } from 'express'
const router = Router()

import { deleteUser, getUser, getUsers, updateUser } from '../controllers/user.controller'
import { schemaValition } from '../middlewares/schemaValidator.middleware'
import { GetOrDeleteUserSchema, UpdateUserSchema } from '../schemas/user.Schema'

router.get('/', [verifyToken], getUsers)

router.get('/:id', schemaValition(GetOrDeleteUserSchema), [verifyToken], getUser)

router.put('/:id', schemaValition(UpdateUserSchema), [verifyToken], updateUser)

router.delete('/:id', schemaValition(UpdateUserSchema), [verifyToken], deleteUser)

export default router
