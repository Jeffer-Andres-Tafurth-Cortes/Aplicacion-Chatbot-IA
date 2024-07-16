// Importamos los parametros para poder usar 'express-validator' 
import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

// Definimos una función para validar las peticiones
export function validate (validations: ValidationChain[]) {
  return async (req: Request, res: Response, next: NextFunction) => {

    // Lanzamos las validaciones con un loop
    for (let validation of validations) {
      const result = await validation.run(req)
      if (result.isEmpty()) {
        break
      }
    }

    const errors = validationResult(req)
    if (errors.isEmpty) {
      return next()
    }
    res.status(422).json({errors: errors.array()})
  }
} 

// Definimos el validador para el login de los usuarios
export const loginValidator = [
  body('email').trim().isEmail().withMessage('El correo electronico es requerido'),
  body('password').trim().isLength({ min: 6 }).withMessage('La contraseña debe de tener al menos 6 caracteres')
]

// Definimos el validador para el signup de los usuarios
export const signupValidator = [
  body('name').notEmpty().withMessage('El nombre es requerido'),
  ...loginValidator
]