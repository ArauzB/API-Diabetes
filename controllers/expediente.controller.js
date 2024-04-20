const sql = require('mssql');
const pool = require("../services/bd");

// Función para crear un nuevo expediente
const crearExpediente = async (req, res) => {
    const { id_paciente, id_usuario, id_diabetes, fecha, estado } = req.body;

    try {
        const request = pool.request();

        const query = `
            INSERT INTO EXPEDIENTE (ID_PACIENTE, ID_USUARIO, ID_DIABETES, FECHA, ESTADO)
            VALUES (@id_paciente, @id_usuario, @id_diabetes, @fecha, @estado)
        `;

        await request.input('id_paciente', sql.Int, id_paciente)
            .input('id_usuario', sql.Int, id_usuario)
            .input('id_diabetes', sql.Int, id_diabetes)
            .input('fecha', sql.Date, fecha)
            .input('estado', sql.Int, estado)
            .query(query);

        res.json({
            message: "Expediente creado correctamente"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al crear el expediente"
        });
    }
};

// Función para obtener todos los expedientes
const obtenerExpedientes = async (req, res) => {
    try {
        const request = pool.request();
        const result = await request.query('SELECT * FROM EXPEDIENTE');

        res.json(result.recordset);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al obtener los expedientes"
        });
    }
};

// Función para obtener un expediente por su ID
const obtenerExpedientePorId = async (req, res) => {
    const { id } = req.params;

    try {
        const request = pool.request();
        const result = await request
            .input('id', sql.Int, id)
            .query('SELECT * FROM EXPEDIENTE WHERE ID_EXPEDIENTE = @id');

        if (result.recordset.length === 0) {
            return res.status(404).json({
                message: "Expediente no encontrado"
            });
        }

        res.json({
            message: "Expediente obtenido correctamente",
            expediente: result.recordset[0]
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al obtener el expediente"
        });
    }
};

// Función para actualizar un expediente por su ID
const actualizarExpediente = async (req, res) => {
    const { id } = req.params;
    const { id_paciente, id_usuario, id_diabetes, fecha, estado } = req.body;

    try {
        const request = pool.request();

        const query = `
            UPDATE EXPEDIENTE
            SET ID_PACIENTE = @id_paciente,
                ID_USUARIO = @id_usuario,
                ID_DIABETES = @id_diabetes,
                FECHA = @fecha,
                ESTADO = @estado
            WHERE ID_EXPEDIENTE = @id
        `;

        await request.input('id_paciente', sql.Int, id_paciente)
            .input('id_usuario', sql.Int, id_usuario)
            .input('id_diabetes', sql.Int, id_diabetes)
            .input('fecha', sql.Date, fecha)
            .input('estado', sql.Int, estado)
            .input('id', sql.Int, id)
            .query(query);

        res.json({
            message: "Expediente actualizado correctamente"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al actualizar el expediente"
        });
    }
};

// Función para eliminar un expediente por su ID
const eliminarExpediente = async (req, res) => {
    const { id } = req.params;

    try {
        const request = pool.request();

        const query = `
            DELETE FROM EXPEDIENTE
            WHERE ID_EXPEDIENTE = @id
        `;

        await request.input('id', sql.Int, id).query(query);

        res.json({
            message: "Expediente eliminado correctamente"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al eliminar el expediente"
        });
    }
};

module.exports = {
    crearExpediente,
    obtenerExpedientes,
    obtenerExpedientePorId,
    actualizarExpediente,
    eliminarExpediente
};
