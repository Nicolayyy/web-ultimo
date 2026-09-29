const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://baqueronicolay_db_user:gFOWCmWTYaboBhIz@web.hoxr0z1.mongodb.net/?appName=web";

const client = new MongoClient(uri);

async function conectarMongoDB() {
  try {
    await client.connect();
    console.log("Conectado correctamente a MongoDB Atlas");

    return client.db("techstore");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
  }
}

module.exports = conectarMongoDB;