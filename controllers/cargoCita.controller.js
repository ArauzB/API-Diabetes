const sql = require('mssql');
const pool = require("../services/bd"); // Importa el pool de conexión

const crearCita = async (req, res) => {
    const { id_expediente, fecha, estado } = req.body;

    try {
        const request = pool.request();

        // Ejecutar la consulta de inserción
        const query = `
            INSERT INTO CARGO_CITAS (ID_EXPEDIENTE, FECHA, ESTADO)
            VALUES (@id_expediente, @fecha, @estado)
        `;

        await request.input('id_expediente', sql.Int, id_expediente)
            .input('fecha', sql.DateTime, new Date(fecha))
            .input('estado', sql.VarChar, estado)
            .query(query);

        res.json({
            message: "Cita creada correctamente"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al crear la cita"
        });
    }
};

const getCitas = async (req, res) => {
    try {
        const request = pool.request();
        const result = await request.query('SELECT * FROM CARGO_CITAS');

        res.json(result.recordset);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al obtener las citas"
        });
    }
};

const getCita = async (req, res) => {
    const { id } = req.params;

    try {
        const request = pool.request();
        const result = await request.input('id', sql.Int, id)
            .query('SELECT * FROM CARGO_CITAS WHERE ID_CARGOCITA = @id');

        if (result.recordset.length === 0) {
            return res.status(404).json({
                message: "Cita no encontrada"
            });
        }

        res.json({
            message: "Cita obtenida correctamente",
            results: result.recordset
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al obtener la cita"
        });
    }
};

module.exports = {
    crearCita,
    getCitas,
    getCita
};