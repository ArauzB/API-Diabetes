const pool  = require("../services/bd");

const createExpediente = async (req, res) => {
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


const editExpediente = async (req, res) => {
    const { id_diabetes, estado} = req.body;

   
            connection.query(
                "UPDATE PRODUCTOS SET ? WHERE ID = ?",
                [
                    {
                        ID_DIABETES: id_diabetes,
                        ESTADO: estado,
                        
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

const getAllExpedientes = async (req, res) => {
    try {
      const request = pool.request(); // Obtén una nueva solicitud del pool
      const result = await request.query('SELECT * FROM EXPEDIENTE');
      res.json(result.recordset); // Enviar el resultado como JSON
    } catch (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };


module.exports = {
    createExpediente,
    editExpediente,
    getAllExpedientes
}