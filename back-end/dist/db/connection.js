// Importamos los modulos de mongoose para poder conectar y desconectar la base de datos
import { connect, disconnect } from "mongoose";
// Se define una funcion para conectar la base de datos con la aplicacion
async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL);
    }
    catch (error) {
        throw new Error('No se pudo conectar la base de datos');
    }
}
// Se define una funcion para desconectar la base de datos con la aplicacion
async function disconnectFromDatabase() {
    try {
        await disconnect();
    }
    catch (error) {
        throw new Error('No se pudo desconectar la base de datos');
    }
}
export { connectToDatabase, disconnectFromDatabase };
//# sourceMappingURL=connection.js.map