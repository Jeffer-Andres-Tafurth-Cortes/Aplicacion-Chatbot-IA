import User from "../Models/User.js";
import { hash, compare } from 'bcrypt';
import { createToken } from "../Utils/token-manager.js";
import { COOKIE_NAME } from "../Utils/constants.js";
// Esta funcion define la peticion GET para obtener todos los usuarios
export async function getAllUsers(req, res, next) {
    try {
        const users = await User.find();
        return res.status(200).json({ message: 'OK', users });
    }
    catch (error) {
        return res.status(200).json({ message: 'Error', cause: error.message });
    }
}
// Esta funcion define la peticion POST para crear un nuevo usuario
export async function userSignup(req, res, next) {
    try {
        // Se define los Request que se necesitan de cada usuario
        const { name, email, password } = req.body;
        // Se verifica si el usuario ya existe en la base de datos
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(401).json({ message: 'Este usuario ya existe' });
        // Por temas de seguridad se encripta la contraseña
        const hashedPassword = await hash(password, 10);
        // Se crea un nuevo usuario con los datos recibidos y se guarda en la base de datos
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        // Posterior a crear el usuario, se crea uun token y se guarda la cookie
        const token = createToken(user.id.toString(), user.email, '7d');
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: '/',
            domain: 'localhost',
            expires,
            httpOnly: true,
            signed: true,
        });
        return res.status(200).json({ message: 'OK', id: user._id.toString() });
    }
    catch (error) {
        return res.status(200).json({ message: 'ERROR', cause: error.message });
    }
}
// Esta funcion define la peticion POST para iniciar sesión de un usuario
export async function userLogin(req, res, next) {
    try {
        // Se define los Request que se necesitan de cada usuario
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        // Se verifica si el usuario no existe en la base de datos
        if (!user) {
            return res.status(401).send('El usuario no esta registrado');
        }
        // Se verifica si la contraseña del usuario que esta iniciando sesion es correcta
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).send('La contraseña no coincide con el usuario registrado');
        }
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: 'localhost',
            signed: true,
            path: '/'
        });
        // Se crea un token de acceso para el usuario
        const token = createToken(user.id.toString(), user.email, '7d');
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: '/',
            domain: 'localhost',
            expires,
            httpOnly: true,
            signed: true,
        });
        return res.status(200).json({ message: 'OK', });
    }
    catch (error) {
        return res.status(200).json({ message: 'ERROR', cause: error.message });
    }
}
//# sourceMappingURL=user-controllers.js.map