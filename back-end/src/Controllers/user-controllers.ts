import { NextFunction, Request, Response } from "express"
import User from "../Models/User.js"

// Esta funcion define la peticion GET para obtener todos los usuarios
export default async function getAllUsers(req: Request, res: Response, next: NextFunction){
  try {

    const users = await User.find()
    return res.status

  } catch (error) {
    throw new Error('')
  }
}