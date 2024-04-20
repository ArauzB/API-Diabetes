const sql = require('mssql');
const pool = require("../services/bd");

// Función para crear un nuevo registro de insulina
const crearInsulina = async (req, res) => {
    const { id_expediente, niveles, fecha, hora, observaciones, estado } = req.body;

    try {
        const request = pool.request();

        const query = `
            INSERT INTO CARGO_INSULINA (ID_EXPEDIENTE, NIVELES, FECHA, HORA, OBSERVACIONES, ESTADO)
            VALUES (@id_expediente, @niveles, @fecha, @hora, @observaciones, @estado)
        `;

        await request.input('id_expediente', sql.Int, id_expediente)
            .input('niveles', sql.Int, niveles)
            .input('fecha', sql.Date, fecha)
            .input('hora', sql.Time, hora)
            .input('observaciones', sql.NVarChar(100), observaciones)
            .input('estado', sql.Int, estado)
            .query(query);

        res.json({
            message: "Registro de insulina creado correctamente"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al crear el registro de insulina"
        });
    }
};

// Función para obtener todos los registros de insulina
const obtenerInsulinas = async (req, res) => {
    try {
        const request = pool.request();
        const result = await request.query('SELECT * FROM CARGO_INSULINA');

        res.json(result.recordset);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al obtener los registros de insulina"
        });
    }
};

// Función para obtener un registro de insulina por su ID
const obtenerInsulinaPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const request = pool.request();
        const result = await request
            .input('id', sql.Int, id)
            .query('SELECT * FROM CARGO_INSULINA WHERE ID_CARGOINSULINA = @id');

        if (result.recordset.length === 0) {
            return res.status(404).json({
                message: "Registro de insulina no encontrado"
            });
        }

        res.json({
            message: "Registro de insulina obtenido correctamente",
            insulina: result.recordset[0]
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al obtener el registro de insulina"
        });
    }
};

// Función para actualizar un registro de insulina por su ID
const actualizarInsulina = async (req, res) => {
    const { id } = req.params;
    const { id_expediente, niveles, fecha, hora, observaciones, estado } = req.body;

    try {
        const request = pool.request();

        const query = `
            UPDATE CARGO_INSULINA
            SET ID_EXPEDIENTE = @id_expediente,
                NIVELES = @niveles,
                FECHA = @fecha,
                HORA = @hora,
                OBSERVACIONES = @observaciones,
                ESTADO = @estado
            WHERE ID_CARGOINSULINA = @id
        `;

        await request.input('id_expediente', sql.Int, id_expediente)
            .input('niveles', sql.Int, niveles)
            .input('fecha', sql.Date, fecha)
            .input('hora', sql.Time, hora)
            .input('observaciones', sql.NVarChar(100), observaciones)
            .input('estado', sql.Int, estado)
            .input('id', sql.Int, id)
            .query(query);

        res.json({
            message: "Registro de insulina actualizado correctamente"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al actualizar el registro de insulina"
        });
    }
};

// Función para eliminar un registro de insulina por su ID
const eliminarInsulina = async (req, res) => {
    const { id } = req.params;

    try {
        const request = pool.request();

        const query = `
            DELETE FROM CARGO_INSULINA
            WHERE ID_CARGOINSULINA = @id
        `;

        await request.input('id', sql.Int, id).query(query);

        res.json({
            message: "Registro de insulina eliminado correctamente"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al eliminar el registro de insulina"
        });
    }
};

module.exports = {
    crearInsulina,
    obtenerInsulinas,
    obtenerInsulinaPorId,
    actualizarInsulina,
    eliminarInsulina
};
