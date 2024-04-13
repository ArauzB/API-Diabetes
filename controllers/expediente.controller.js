const { connection } = require("../services/bd");

const createProducto = async (req, res) => {
    const {id_paciente, id_usuario, id_diabetes } = req.body;
    estado = 1;
    fecha = new  Date();  
            connection.query(
                "INSERT INTO EXPEDIENTE SET ?",
                {
                    ID_PACIENTE: id_paciente,
                    ID_USUARIO: id_usuario,
                    ID_DAIBETES: id_diabetes,
                    FECHA:fecha,
                    ESTADO: estado,
                   
                },
                async (error, results) => {
                    if (error) {
                        console.log(error);
                    } else {
                        res.json({
                        message: "Producto creado correctamente",
                        });
                    }
                }
            )
};


const editProducto = async (req, res) => {
    const { id, nombre, precio, id_categoria,id_material } = req.body;

    if (!nombre.trim().length || !precio.trim().length || !id_categoria.trim().length || !id_material.trim().length) {
            
            res.json({
                message: "Faltan datos",
            });
    
        } else {    
            connection.query(
                "UPDATE PRODUCTOS SET ? WHERE ID = ?",
                [
                    {
                        NOMBRE: nombre,
                        PRECIO: precio,
                        ID_CATEGORIA: id_categoria,
                        ID_MATERIAL: id_material
                    },
                    id
                ],
                async (error, results) => {
                    if (error) {
                        console.log(error);
                    } else {
                        res.json({
                        message: "Producto editado correctamente",
                        });
                    }
                    }
                );
        }
}

const getAllProducto = async (req, res) => {
    connection.query("SELECT * FROM PRODUCTOS", async (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.json(results);
        }
        });
}


module.exports = {
    createProducto,
    editProducto,
    getAllProducto
}