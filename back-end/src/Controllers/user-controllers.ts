import { NextFunction, Request, Response } from "express"
import User from "../Models/User.js"
import { hash, compare } from 'bcrypt'

// Esta funcion define la peticion GET para obtener todos los usuarios
export async function getAllUsers(req: Request, res: Response, next: NextFunction){
  try {
    const users = await User.find()
    return res.status(200).json({ message: 'OK', users})

  } catch (error) {
    return res.status(200).json({message: 'Error', cause: error.message})

  }
}

// Esta funcion define la peticion POST para crear un nuevo usuario
export async function userSignup(req: Request, res: Response, next: NextFunction){
  try {
    // Se define los Request que se necesitan de cada usuario
    const { name, email, password } = req.body

    // Se verifica si el usuario ya existe en la base de datos
    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(401).json({ message: 'Este usuario ya existe' })

    // Por temas de seguridad se encripta la contraseña
    const hashedPassword = await hash(password, 10)
    
    // Se crea un nuevo usuario con los datos recibidos y se guarda en la base de datos
    const user = new User({ name, email, password: hashedPassword })
    await user.save()
    return res.status(200).json({ message: 'OK', id: user._id.toString() })

  } catch (error) {
    return res.status(200).json({ message: 'ERROR', cause: error.message })
  }
}


// Esta funcion define la peticion POST para iniciar sesión de un usuario
export async function userLogin(req: Request, res: Response, next: NextFunction){
  try {

    // Se define los Request que se necesitan de cada usuario
    const { email, password } = req.body
    const user = await User.findOne({ email })

    // Se verifica si el usuario no existe en la base de datos
    if (!user) {
      return res.status(401).send('El usuario no esta registrado')
    }

    // Se verifica si la contraseña del usuario que esta iniciando sesion es correcta
    const isPasswordCorrect = await compare(password, user.password)
    if(!isPasswordCorrect){
      return res.status(403).send('La contraseña no coincide con el usuario registrado')
    }

    await user.save()
    return res.status(200).json({ message: 'OK',  })

  } catch(error) {
    return res.status(200).json({ message: 'ERROR', cause: error.message })
  }
}