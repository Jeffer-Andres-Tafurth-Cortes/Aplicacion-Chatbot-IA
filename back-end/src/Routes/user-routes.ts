// Importamos Router de express para el tema de rutas frente a los usuarios
import { Router } from 'express'
import{ getAllUsers, userLogin, userSignup } from '../Controllers/user-controllers.js'
import { loginValidator, signupValidator, validate } from '../Utils/validators.js'

// Definimos las rutas para los usuarios
const userRoutes = Router()

userRoutes.get('/', getAllUsers)
userRoutes.post('/signup', validate(signupValidator), userSignup)
userRoutes.post('/login', validate(loginValidator), userLogin)

export default userRoutes