const { connection } = require("../services/bd");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");


const crearMaterial = async (req, res) => {
    const {nombre, precio,stock, proveedor} = req.body;

    if (!nombre.trim().length ) {

        res.json({
            message: "Faltan datos",
        });

    } else {
        connection.query(
            "SELECT * FROM MATERIAL WHERE NOMBRE = ?",
            [nombre],
            async (error, results) => {
              if (error) {
                console.log(error);
              } else {
                if (results.length > 0) {
                  res.json({
                    message: "Este material ya esta registrado",
                  });
                }  else {
                  connection.query(
                    "INSERT INTO MATERIAL SET ?",
                    {
                      NOMBRE: nombre,
                      PRECIO: precio,
                      STOCK: stock,
                      PROVEEDOR_ID: proveedor
                    },
                    async (error, results) => {
                        if (error) {
                            console.log(error);
                        } else {
                            res.json({
                            message: "Material creado correctamente",
                            });
                        }
                        }
                    );
                }
                }
            }
        );
    }


}

const getMateriales = async (req, res) => {
    connection.query('SELECT * FROM MATERIAL', async (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.json(results);
        }
    });
}

const getMaterial = async (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM MATERIAL WHERE ID = ?', [id], async (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.json({
                message: "Material obtenido correctamente",
                results
            });
        }
    });
}

const editMaterial = async (req, res) => {
    const { id } = req.params;
    const { nombre, precio, stock, proveedor } = req.body;
    connection.query('UPDATE MATERIAL SET ? WHERE ID = ?', [{
        NOMBRE: nombre,
        PRECIO: precio,
        STOCK: stock,
        PROVEEDOR_ID: proveedor
    }, id], async (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.json({
                message: "Material editado correctamente",
            });
        }
    });
}

module.exports = {
    crearMaterial,
    getMateriales,
    getMaterial,
    editMaterial
  };
  