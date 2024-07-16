import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
// Este es el puerto en el que se va a escuchar el servidor.
const PORT = process.env.PORT || 5000;
// Aqui estan las conexiones de la base datos y el Listenes del respectivo puerto
connectToDatabase().then(() => {
    app.listen(PORT, () => console.log('Servidor abierto y conectado'));
}).catch(err => console.log(err));
//# sourceMappingURL=index.js.map