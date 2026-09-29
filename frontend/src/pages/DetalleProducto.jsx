import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function DetalleProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/api/productos/${id}`)
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("Producto no encontrado");
        }

        return respuesta.json();
      })
      .then((datos) => setProducto(datos))
      .catch((error) => setError(error.message));
  }, [id]);

  if (error) {
    return (
      <section className="detalle-producto">
        <h2>{error}</h2>

        <Link className="boton-volver" to="/">
          Volver al catálogo
        </Link>
      </section>
    );
  }

  if (!producto) {
    return <p>Cargando producto...</p>;
  }

  return (
    <section className="detalle-producto">
      <article>
        <h2>{producto.nombre}</h2>

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

        <section className="informacion-proveedor">
          <h3>Proveedor</h3>

          <p>
            <strong>Nombre:</strong> {producto.proveedor.nombre}
          </p>

          <p>
            <strong>Contacto:</strong> {producto.proveedor.contacto}
          </p>
        </section>

        <Link className="boton-volver" to="/">
          Volver al catálogo
        </Link>
      </article>
    </section>
  );
}

export default DetalleProducto;