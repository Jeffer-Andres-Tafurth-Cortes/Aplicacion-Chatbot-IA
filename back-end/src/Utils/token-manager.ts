import jwt from "jsonwebtoken"

// Esta funcion define el token
export function createToken( id: string, email: string, expiresIn: string){
  const payload = { id, email }
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  })
  return token
}