import User from "../Models/User.js";
// Esta funcion define la peticion GET para obtener todos los usuarios
export default async function getAllUsers(req, res, next) {
    try {
        const users = await User.find();
        return res.status;
    }
    catch (error) {
        throw new Error('');
    }
}
//# sourceMappingURL=user-controllers.js.map