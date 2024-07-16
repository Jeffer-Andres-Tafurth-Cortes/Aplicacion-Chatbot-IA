// Importamos express
import express from "express";

// Importamos la configuracion para poder conectar la bases de datos de MongoDB
import { config } from 'dotenv'
import morgan from 'morgan'
config()

// Importamos el router de rutas del 'index.ts' de la carpeta 'Routes'
import appRouter from "./Routes/index.js";

// Definimos la app para implementar express()
const app = express()

// Implementamos el Middleware
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v1/', appRouter)

export default app