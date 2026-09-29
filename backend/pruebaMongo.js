const conectarMongoDB = require("./mongo");

async function probarConexion() {
  const db = await conectarMongoDB();

  if (db) {
    console.log("Base de datos seleccionada:", db.databaseName);
  }
}

probarConexion();