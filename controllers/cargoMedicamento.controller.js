const sql = require('mssql');
const pool = require("../services/bd");


// Función para crear un nuevo registro de medicamento
const crearMedicamento = async (req, res) => {
    const { id_expediente, nombre_medicamento, no_dias, cada_hora, recomendaciones, fecha, inicio, estado } = req.body;

    try {
        const request = pool.request();

        const query = `
            INSERT INTO CARGO_MEDICAMENTO (ID_EXPEDIENTE, NOMBRE_MEDICAMENTO, NO_DIAS, CADA_HORA, RECOMENDACIONES, FECHA, INICIO, ESTADO)
            VALUES (@id_expediente, @nombre_medicamento, @no_dias, @cada_hora, @recomendaciones, @fecha, @inicio, @estado)
        `;

        await request.input('id_expediente', sql.Int, id_expediente)
            .input('nombre_medicamento', sql.NVarChar(100), nombre_medicamento)
            .input('no_dias', sql.Int, no_dias)
            .input('cada_hora', sql.Int, cada_hora)
            .input('recomendaciones', sql.NVarChar(100), recomendaciones)
            .input('fecha', sql.Date, fecha)
            .input('inicio', sql.Date, inicio)
            .input('estado', sql.Int, estado)
            .query(query);

        res.json({
            message: "Medicamento creado correctamente"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al crear el medicamento"
        });
    }
};

// Función para obtener todos los registros de medicamentos
const obtenerMedicamentos = async (req, res) => {
    try {
        const request = pool.request();
        const result = await request.query('SELECT * FROM CARGO_MEDICAMENTO');

        res.json(result.recordset);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al obtener los medicamentos"
        });
    }
};

// Función para obtener un medicamento por su ID
const obtenerMedicamentoPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const request = pool.request();
        const result = await request
            .input('id', sql.Int, id)
            .query('SELECT * FROM CARGO_MEDICAMENTO WHERE ID_CARGOMEDICAMENTO = @id');

        if (result.recordset.length === 0) {
            return res.status(404).json({
                message: "Medicamento no encontrado"
            });
        }

        res.json({
            message: "Medicamento obtenido correctamente",
            medicamento: result.recordset[0]
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al obtener el medicamento"
        });
    }
};

// Función para actualizar un medicamento por su ID
const actualizarMedicamento = async (req, res) => {
    const { id } = req.params;
    const { id_expediente, nombre_medicamento, no_dias, cada_hora, recomendaciones, fecha, inicio, estado } = req.body;

    try {
        const request = pool.request();

        const query = `
            UPDATE CARGO_MEDICAMENTO
            SET ID_EXPEDIENTE = @id_expediente,
                NOMBRE_MEDICAMENTO = @nombre_medicamento,
                NO_DIAS = @no_dias,
                CADA_HORA = @cada_hora,
                RECOMENDACIONES = @recomendaciones,
                FECHA = @fecha,
                INICIO = @inicio,
                ESTADO = @estado
            WHERE ID_CARGOMEDICAMENTO = @id
        `;

        await request.input('id_expediente', sql.Int, id_expediente)
            .input('nombre_medicamento', sql.NVarChar(100), nombre_medicamento)
            .input('no_dias', sql.Int, no_dias)
            .input('cada_hora', sql.Int, cada_hora)
            .input('recomendaciones', sql.NVarChar(100), recomendaciones)
            .input('fecha', sql.Date, fecha)
            .input('inicio', sql.Date, inicio)
            .input('estado', sql.Int, estado)
            .input('id', sql.Int, id)
            .query(query);

        res.json({
            message: "Medicamento actualizado correctamente"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al actualizar el medicamento"
        });
    }
};

// Función para eliminar un medicamento por su ID
const eliminarMedicamento = async (req, res) => {
    const { id } = req.params;

    try {
        const request = pool.request();

        const query = `
            DELETE FROM CARGO_MEDICAMENTO
            WHERE ID_CARGOMEDICAMENTO = @id
        `;

        await request.input('id', sql.Int, id).query(query);

        res.json({
            message: "Medicamento eliminado correctamente"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al eliminar el medicamento"
        });
    }
};

module.exports = {
    crearMedicamento,
    obtenerMedicamentos,
    obtenerMedicamentoPorId,
    actualizarMedicamento,
    eliminarMedicamento
};
