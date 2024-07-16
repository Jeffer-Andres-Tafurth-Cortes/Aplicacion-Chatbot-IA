// Importamos Router de express para el tema de rutas frente a los usuarios
import { Router } from 'express';
import getAllUsers from '../Controllers/user-controllers.js';
// Definimos las rutas para los usuarios
const userRoutes = Router();
userRoutes.get('/', getAllUsers);
export default userRoutes;
//# sourceMappingURL=user-routes.js.map