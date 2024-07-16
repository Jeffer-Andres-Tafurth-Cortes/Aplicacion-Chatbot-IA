// Importar Router de Express para el tema de rutas
import { Router } from 'express'
import userRoutes from './user-routes.js'
import chatRoutes from './chat-routes.js'

// Definimos las rutas para la aplicacion
const appRouter = Router()

// Esta primera ruta es para los usuarios
appRouter.use('/user', userRoutes) // Este dominio tiene la ruta /api/v1/user

// Esta segunda ruta es para los chats
appRouter.use('/chats', chatRoutes) // Este dominio tiene la ruta /api/v1/chats

export default appRouter