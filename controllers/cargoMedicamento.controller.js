const { connection } = require("../services/bd");

const createCompraWithDetalle = async (req, res) => {
  const { id_proveedor, fecha, notas, detalle} = req.body;
  estado = 1;

  console.log(req.body);

  if (
    !notas.trim().length 
  ) {
    res.json({
      message: "Faltan datos",
    });
  } else {
    connection.query(
      "INSERT INTO COMPRA_ORDEN SET ?",
      {
        PROVEEDOR_ID: id_proveedor,
        FECHA: fecha,
        NOTAS: notas,
        ESTADO: estado,
      },
      async (error, results) => {
        if (error) {
          console.log(error);
        } else {
          const id_compra = results.insertId;

          const detalleCompra = detalle.map((element) => [
            id_compra,
            element.nombre,
            element.cantidad,
            element.categoria,
            element.precio
          ]);

          const material = detalle.map((element) => [
           
            element.nombre,
            element.cantidad,
            element.categoria,
            element.precio
          ]);
          
          console.log(detalleCompra);
          
          connection.query(
            "INSERT INTO DETALLE_COMPRA (COMPRA_ORDEN, NOMBRE, CANTIDAD, CATEGORIA_ID, PRECIO) VALUES ?",
            [detalleCompra],
            async (error, results) => {
              if (error) {
                console.log(error);
              } else {
              
                connection.query(
                  "INSERT INTO MATERIAL (NOMBRE, CANTIDAD, CATEGORIA_ID, PRECIO) VALUES ?",
                  [material],
                  async (error, results) => {
                    if (error) {
                      console.log(error);
                    } else {
                      res.json({
                        message: "Compra registrada",
                      });
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  }
}

const getCompras = async (req, res) => {
  connection.query("SELECT * FROM COMPRA_ORDEN ", async (error, results) => {
    if (error) {
      console.log(error);
    } else {
      res.json(results);
    }
  });
};

const getCompra = async (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT * FROM COMPRA_ORDEN WHERE ID = ?",
    [id],
    async (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.json(results);
      }
    }
  );
};

module.exports = {
  createCompraWithDetalle,
  getCompras,
  getCompra,
};
