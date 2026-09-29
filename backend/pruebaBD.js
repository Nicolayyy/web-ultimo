const db = require("./database");

db.run(
  "UPDATE productos SET existencias = 20 WHERE id = 1",
  function (error) {
    if (error) {
      console.error("Error:", error.message);
      return;
    }

    console.log("Producto actualizado correctamente");

    db.get(
      "SELECT * FROM productos WHERE id = 1",
      [],
      (error, producto) => {
        if (error) {
          console.error("Error:", error.message);
          return;
        }

        console.log(producto);
        db.close();
      }
    );
  }
);