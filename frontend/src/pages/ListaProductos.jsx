import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ListaProductos() {
  const [productos, setProductos] = useState([]);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [existencias, setExistencias] = useState("");

  const [productoEditando, setProductoEditando] = useState(null);

  const cargarProductos = () => {
    fetch("http://localhost:3000/api/productos")
      .then((respuesta) => respuesta.json())
      .then((datos) => setProductos(datos))
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  async function guardarProducto(e) {
    e.preventDefault();

    const producto = {
      nombre,
      descripcion,
      precio: Number(precio),
      existencias: Number(existencias),
      proveedor: {
        nombre: "Proveedor general",
        contacto: "contacto@proveedor.com",
      },
    };

    if (productoEditando) {
      await fetch(
        `http://localhost:3000/api/productos/${productoEditando.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(producto),
        }
      );
    } else {
      await fetch("http://localhost:3000/api/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
      });
    }

    limpiarFormulario();
    cargarProductos();
  }

  function editarProducto(producto) {
    setProductoEditando(producto);

    setNombre(producto.nombre);
    setDescripcion(producto.descripcion);
    setPrecio(producto.precio);
    setExistencias(producto.existencias);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function eliminarProducto(id) {
    const confirmar = window.confirm(
      "¿Seguro que deseas eliminar este producto?"
    );

    if (!confirmar) {
      return;
    }

    await fetch(`http://localhost:3000/api/productos/${id}`, {
      method: "DELETE",
    });

    cargarProductos();
  }

  function limpiarFormulario() {
    setNombre("");
    setDescripcion("");
    setPrecio("");
    setExistencias("");
    setProductoEditando(null);
  }

  return (
    <section>
      <h2>
        {productoEditando
          ? "Editar producto"
          : "Crear producto"}
      </h2>

      <form onSubmit={guardarProducto}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Existencias"
          value={existencias}
          onChange={(e) => setExistencias(e.target.value)}
          required
        />

        <button type="submit">
          {productoEditando
            ? "Guardar cambios"
            : "Crear producto"}
        </button>

        {productoEditando && (
          <button
            type="button"
            onClick={limpiarFormulario}
          >
            Cancelar
          </button>
        )}
      </form>

      <h2>Productos</h2>

      <div className="lista-productos">
        {productos.map((producto) => (
          <article className="tarjeta" key={producto.id}>
            <h3>{producto.nombre}</h3>

            <p>{producto.descripcion}</p>

            <p>
              <strong>Precio:</strong>{" "}
              ${producto.precio.toLocaleString("es-CO")}
            </p>

            {producto.existencias > 0 ? (
              <p className="disponible">
                Disponible: {producto.existencias} unidades
              </p>
            ) : (
              <p className="agotado">Producto agotado</p>
            )}

            <div className="acciones-producto">
              <Link
                className="boton-detalle"
                to={`/producto/${producto.id}`}
              >
                Ver detalle
              </Link>

              <button
                type="button"
                onClick={() => editarProducto(producto)}
              >
                Editar
              </button>

              <button
                type="button"
                onClick={() => eliminarProducto(producto.id)}
              >
                Eliminar
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ListaProductos;