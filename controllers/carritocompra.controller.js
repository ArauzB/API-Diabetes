const { connection } = require("../services/bd");

const createCarritoCompra = async (req, res) => {
    const {id_proveedor,id_material, cantidad, precio, fecha} = req.body;

    estado = 1;

    if (!id_proveedor.trim().length || !id_material.trim().length || !cantidad.trim().length || !precio.trim().length || !fecha.trim().length) {
            
            res.json({
                message: "Faltan datos",
            });
    
        } else {
            connection.query(
                "INSERT INTO CARRITO_COMPRA SET ?",
                {
                    ID_PROVEEDOR: id_proveedor,
                    ID_MATERIAL: id_material,
                    CANTIDAD: cantidad,
                    PRECIO: precio,
                    FECHA: fecha,
                    ESTADO: estado
                },
                async (error, results) => {
                    if (error) {
                        console.log(error);
                    } else {
                        res.json({
                        message: "Carrito de compra creado correctamente",
                        });
                    }
                    }
                );
        }
}

const getAllCarritoCompra = async (req, res) => {
    connection.query("SELECT * FROM CARRITO_COMPRA", async (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.json({
                results,
            });
        }
    });
}

const deleteCarritoCompra = async (req, res) => {
    const { id } = req.body;

    connection.query(
        "DELETE FROM CARRITO_COMPRA WHERE ID = ?",
        [id],
        async (error, results) => {
          if (error) {
            console.log(error);
          } else {
            res.json({
              message: "Carrito de compra eliminado correctamente",
            });
          }
        }
      );
}

