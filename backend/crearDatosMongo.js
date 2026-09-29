const conectarMongoDB = require("./mongo");

async function crearDatos() {
  const db = await conectarMongoDB();

  const productos = db.collection("productos");

  await productos.deleteMany({});

  await productos.insertMany([
    {
      id: 1,
      nombre: "Teclado mecánico",
      descripcion: "Teclado mecánico con iluminación RGB.",
      precio: 180000,
      existencias: 20,
      proveedor: {
        nombre: "Tecnología Santander",
        contacto: "ventas@tecnologiasantander.com",
      },
    },
    {
      id: 2,
      nombre: "Mouse inalámbrico",
      descripcion: "Mouse ergonómico con batería recargable.",
      precio: 95000,
      existencias: 0,
      proveedor: {
        nombre: "Distribuciones Gamer",
        contacto: "contacto@distribucionesgamer.com",
      },
    },
    {
      id: 3,
      nombre: "Monitor de 24 pulgadas",
      descripcion: "Monitor Full HD con conexión HDMI.",
      precio: 620000,
      existencias: 4,
      proveedor: {
        nombre: "Pantallas Colombia",
        contacto: "ventas@pantallascolombia.com",
      },
    },
    {
      id: 4,
      nombre: "Audífonos gamer",
      descripcion: "Audífonos con micrófono y sonido envolvente.",
      precio: 145000,
      existencias: 0,
      proveedor: {
        nombre: "Audio Digital",
        contacto: "pedidos@audiodigital.com",
      },
    },
  ]);

  console.log("Productos guardados correctamente en MongoDB Atlas");

  process.exit();
}

crearDatos();