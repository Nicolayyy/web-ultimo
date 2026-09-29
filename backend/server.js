const express = require("express");
const cors = require("cors");
const conectarMongoDB = require("./mongo");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let db;

async function iniciarServidor() {
  db = await conectarMongoDB();

  app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
  });
}

/* =========================
   READ - LISTAR PRODUCTOS
========================= */

app.get("/api/productos", async (req, res) => {
  try {
    const productos = await db
      .collection("productos")
      .find({})
      .toArray();

    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener los productos",
    });
  }
});


/* =========================
   READ - PRODUCTO POR ID
========================= */

app.get("/api/productos/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const producto = await db
      .collection("productos")
      .findOne({ id: id });

    if (!producto) {
      return res.status(404).json({
        error: "Producto no encontrado",
      });
    }

    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener el producto",
    });
  }
});


/* =========================
   CREATE - CREAR PRODUCTO
========================= */

app.post("/api/productos", async (req, res) => {
  try {
    const ultimoProducto = await db
      .collection("productos")
      .find({})
      .sort({ id: -1 })
      .limit(1)
      .toArray();

    const nuevoId =
      ultimoProducto.length > 0
        ? ultimoProducto[0].id + 1
        : 1;

    const nuevoProducto = {
      id: nuevoId,
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      existencias: req.body.existencias,
      proveedor: req.body.proveedor,
    };

    await db
      .collection("productos")
      .insertOne(nuevoProducto);

    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({
      error: "Error al crear el producto",
    });
  }
});


/* =========================
   UPDATE - ACTUALIZAR
========================= */

app.put("/api/productos/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const resultado = await db
      .collection("productos")
      .findOneAndUpdate(
        { id: id },
        {
          $set: {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            existencias: req.body.existencias,
            proveedor: req.body.proveedor,
          },
        },
        {
          returnDocument: "after",
        }
      );

    if (!resultado) {
      return res.status(404).json({
        error: "Producto no encontrado",
      });
    }

    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({
      error: "Error al actualizar el producto",
    });
  }
});


/* =========================
   DELETE - ELIMINAR
========================= */

app.delete("/api/productos/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const resultado = await db
      .collection("productos")
      .deleteOne({ id: id });

    if (resultado.deletedCount === 0) {
      return res.status(404).json({
        error: "Producto no encontrado",
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      error: "Error al eliminar el producto",
    });
  }
});


iniciarServidor();