const db = require("./database");

db.serialize(() => {
  db.run("DELETE FROM productos");
  db.run("DELETE FROM proveedores");

  db.run(`
    INSERT INTO proveedores (id, nombre, contacto)
    VALUES
    (1, 'Tecnología Santander', 'ventas@tecnologiasantander.com'),
    (2, 'Distribuciones Gamer', 'contacto@distribucionesgamer.com'),
    (3, 'Pantallas Colombia', 'ventas@pantallascolombia.com'),
    (4, 'Audio Digital', 'pedidos@audiodigital.com')
  `);

  db.run(`
    INSERT INTO productos
    (id, nombre, descripcion, precio, existencias, proveedor_id)
    VALUES
    (
      1,
      'Teclado mecánico',
      'Teclado mecánico con iluminación RGB.',
      180000,
      8,
      1
    ),
    (
      2,
      'Mouse inalámbrico',
      'Mouse ergonómico con batería recargable.',
      95000,
      0,
      2
    ),
    (
      3,
      'Monitor de 24 pulgadas',
      'Monitor Full HD con conexión HDMI.',
      620000,
      4,
      3
    ),
    (
      4,
      'Audífonos gamer',
      'Audífonos con micrófono y sonido envolvente.',
      145000,
      0,
      4
    )
  `);

  console.log("Datos creados correctamente");
});

db.close();