const { connection } = require("../services/bd");

const createCategoria = async (req, res) => {
    const { nombre } = req.body;


    if (!nombre.trim().length) {

        res.json({
            message: "Faltan datos",
        });

    } else {
        connection.query(
            "SELECT * FROM CATEGORIAS WHERE NOMBRE = ?",
            [nombre],
            async (error, results) => {
              if (error) {
                console.log(error);
              } else {
                if (results.length > 0) {
                  res.json({
                    message: "Esta categoria ya esta registrada",
                  });
                }  else {
                  connection.query(
                    "INSERT INTO CATEGORIAS SET ?",
                    {
                      NOMBRE: nombre,
                    },
                    async (error, results) => {
                        if (error) {
                            console.log(error);
                        } else {
                            res.json({
                            message: "Categoria creada correctamente",
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

const editCategoria = async (req, res) => {
    const { id, nombre } = req.body;

    if (!nombre.trim().length) {

        res.json({
            message: "Faltan datos",
        });

    } else {
        connection.query(
            "SELECT * FROM CATEGORIAS WHERE NOMBRE = ?",
            [nombre],
            async (error, results) => {
              if (error) {
                console.log(error);
              } else {
                if (results.length > 0) {
                  res.json({
                    message: "Esta categoria ya esta registrada",
                  });
                }  else {
                  connection.query(
                    "UPDATE CATEGORIAS SET ? WHERE ID = ?",
                    [{
                        NOMBRE: nombre,
                    }, id],
                    async (error, results) => {
                        if (error) {
                            console.log(error);
                        } else {
                            res.json({
                            message: "Categoria editada correctamente",
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

const getAllCategorias = async (req, res) => {

    connection.query(
        "SELECT * FROM CATEGORIAS",
        async (error, results) => {
            if (error) {
                console.log(error);
            } else {
                res.json(results);
            }
            }
        );
}

module.exports = {
    createCategoria,
    editCategoria,
    getAllCategorias,
};