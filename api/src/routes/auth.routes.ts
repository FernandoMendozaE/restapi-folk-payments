import { Router } from 'express'
import { schemaValition } from '../middlewares/schemaValidator.middleware'
import { signIn, signUp } from '../controllers/auth.controller'
import { AuthSingInSchema, AuthSingUpSchema } from '../schemas/auth.schema'
import { verifyToken } from '../middlewares/authJwt'

const router = Router()

router.post('/signup', schemaValition(AuthSingUpSchema), [verifyToken], signUp)
// router.post('/signup', schemaValition(AuthSingUpSchema), signUp)

router.post('/signin', schemaValition(AuthSingInSchema), signIn)

export default router
