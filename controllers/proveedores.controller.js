const { connection } = require("../services/bd");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const crearProveedor = async (req, res) => {
    const { nombre, email, telefono } = req.body;
    const emailregex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    estado = 1;

    if (!nombre.trim().length || !email.trim().length ) {

        res.json({
            message: "Faltan datos",
        });

    } else if (!emailregex.test(email)) {
        res.json({
            message: "El correo electronico no es valido",
        });

    } else {
        connection.query(
            "SELECT * FROM PROVEEDORES WHERE CONTACTO = ?",
            [email],
            async (error, results) => {
              if (error) {
                console.log(error);
              } else {
                if (results.length > 0) {
                  res.json({
                    message: "Este usuario ya esta registrado",
                  });
                }  else {
                  connection.query(
                    "INSERT INTO PROVEEDORES SET ?",
                    {
                      NOMBRE: nombre,
                      CONTACTO: email,
                      TELEFONO: telefono,
                        ESTADO: estado,
                    },
                    async (error, results) => {
                        if (error) {
                            console.log(error);
                        } else {
                            res.json({
                            message: "Cliente creado correctamente",
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

const editProveedor = async (req, res) => {
    const { nombre, email, telefono} = req.body;
    const emailregex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    
    if (!nombre.trim().length || !email.trim().length ) {

        res.json({
            message: "Faltan datos",
        });

    } else if (!emailregex.test(email)) {
        res.json({
            message: "El correo electronico no es valido",
        });

    } else {
        
        connection.query(
            "UPDATE PROVEEDORES SET ? WHERE CONTACTO = ?",
            [
                {
                    NOMBRE: nombre,
                    CONTACTO: email,
                    TELEFONO: telefono,
                },
                email
            ],
            async (error, results) => {
                if (error) {
                    console.log(error);
                } else {
                    res.json({
                    message: "Cliente editado correctamente",
                    });
                }
                }
            );
    }
}

const getAllProveedores = async (req, res) => {

    connection.query(
        "SELECT * FROM PROVEEDORES",
        async (error, results) => {
            if (error) {
                console.log(error);
            } else {
                res.json(results);
            }
            }
        );
}

const changeEstado = async (req, res) => {
    const { id, estado } = req.body;
    connection.query(
        "UPDATE PROVEEDORES SET ? WHERE ID = ?",
        [
            {
                ESTADO: estado,
            },
            id
        ],
        async (error, results) => {
            if (error) {
                console.log(error);
            } else {
                res.json({
                message: "Estado cambiado correctamente",
                });
            }
            }
        );
}

module.exports = {
    crearProveedor,
    editProveedor,
    getAllProveedores,
    changeEstado
  };
  