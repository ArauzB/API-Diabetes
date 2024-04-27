const sql = require('mssql');
const pool = require("../services/bd");
 // Importa el pool de conexión
 const crearCita = async (req, res) => {
    const { id_expediente, fecha, estado } = req.body;

    try {
        // Validar si la fecha es válida
        if (!fecha || isNaN(Date.parse(fecha))) {
            return res.status(400).json({
                message: "La fecha de la cita es inválida"
            });
        }

        // Convertir la fecha de entrada a un objeto de fecha en UTC
        const fechaCita = new Date(fecha);

        // Calcular las fechas de inicio y fin del intervalo de 30 minutos
        const fechaInicio = new Date(fechaCita.getTime() - 1440 * 60000); // Restar 30 minutos (30 * 60000 milisegundos)
        const fechaFin = new Date(fechaCita.getTime() + 1440 * 60000); // Sumar 30 minutos (30 * 60000 milisegundos)


        console.log(fecha)
        console.log(fechaCita)
        console.log(fechaInicio)
        console.log(fechaFin)


        // Verificar si existe otra cita para este expediente en el mismo intervalo de tiempo
        const citaExistente = await verificarCitaExistente(id_expediente, fechaInicio, fechaFin);

        console.log(citaExistente)

        if (citaExistente) {
            return res.status(400).json({
                message: "Ya existe otra cita para este expediente en el mismo intervalo de tiempo"
            });
        }

        // Verificar si hay otras citas para este paciente en el mismo intervalo de tiempo
        const paciente = await obtenerPacientePorExpediente(id_expediente);
        if (!paciente) {
            return res.status(404).json({
                message: "El expediente no corresponde a un paciente válido"
            });
        }

        const citasPaciente = await verificarCitasPacienteEnIntervalo(paciente.ID_PACIENTE, fechaInicio, fechaFin);

        if (citasPaciente.length > 0) {
            return res.status(400).json({
                message: "Ya existe otra cita para este paciente en el mismo intervalo de tiempo"
            });
        }

        // Insertar la nueva cita en la base de datos
        await insertarNuevaCita(id_expediente, fechaCita, estado);

        res.json({
            message: "Cita creada correctamente"
        });
    } catch (error) {
        console.error('Error al crear la cita:', error);
        res.status(500).json({
            message: "Error al crear la cita"
        });
    }
};

async function verificarCitaExistente(id_expediente, fechaInicio, fechaFin) {
    try {
        // Convertir las fechas a formato ISO 8601 sin milisegundos para evitar problemas de redondeo
        const fechaInicioISO = fechaInicio.toISOString().slice(0, 19).replace('T', ' '); // Eliminar milisegundos y cambiar 'T' por espacio
        const fechaFinISO = fechaFin.toISOString().slice(0, 19).replace('T', ' '); // Eliminar milisegundos y cambiar 'T' por espacio

        const request = pool.request()
            .input('id_expediente', sql.Int, id_expediente)
            .input('fechaInicio', sql.DateTime, fechaInicioISO)
            .input('fechaFin', sql.DateTime, fechaFinISO);

        const query = `
            SELECT TOP 1 1
            FROM CARGO_CITAS
            WHERE ID_EXPEDIENTE = @id_expediente
            AND FECHA >= @fechaInicio
            AND FECHA <= @fechaFin
        `;

        const result = await request.query(query);
        return result.recordset.length > 0;
    } catch (error) {
        console.error('Error al verificar cita existente:', error);
        throw error;
    }
}



async function obtenerPacientePorExpediente(id_expediente) {
    const request = pool.request().input('id_expediente', sql.Int, id_expediente);
    const query = `SELECT ID_PACIENTE FROM EXPEDIENTE WHERE ID_EXPEDIENTE = @id_expediente`;
    const result = await request.query(query);
    return result.recordset[0];
}

async function verificarCitasPacienteEnIntervalo(id_paciente, fechaInicio, fechaFin) {
    const request = pool.request()
        .input('id_paciente', sql.Int, id_paciente)
        .input('fechaInicio', sql.DateTime, fechaInicio.toISOString())
        .input('fechaFin', sql.DateTime, fechaFin.toISOString());

    const query = `
        SELECT TOP 1 1
        FROM CARGO_CITAS cc
        INNER JOIN EXPEDIENTE e ON cc.ID_EXPEDIENTE = e.ID_EXPEDIENTE
        WHERE e.ID_PACIENTE = @id_paciente
        AND cc.FECHA >= @fechaInicio
        AND cc.FECHA <= @fechaFin
    `;

    const result = await request.query(query);
    return result.recordset;
}

async function insertarNuevaCita(id_expediente, fechaCita, estado) {
    const request = pool.request()
        .input('id_expediente', sql.Int, id_expediente)
        .input('fechaCita', sql.DateTime, fechaCita.toISOString())
        .input('estado', sql.Int, estado);

    const query = `
        INSERT INTO CARGO_CITAS (ID_EXPEDIENTE, FECHA, ESTADO)
        VALUES (@id_expediente, @fechaCita, @estado)
    `;

    await request.query(query);
}


const getCitas = async (req, res) => {
    try {
        const request = pool.request();
        const result = await request.query(`
            SELECT cc.*, p.NOMBRES AS NombrePaciente, p.APELLIDOS AS ApellidosPaciente,
                   u.NOMBRES AS NombreUsuario, u.APELLIDOS AS ApellidosUsuario
            FROM CARGO_CITAS cc
            INNER JOIN EXPEDIENTE e ON cc.ID_EXPEDIENTE = e.ID_EXPEDIENTE
            INNER JOIN USUARIO u ON e.ID_USUARIO = u.ID_USUARIO
            INNER JOIN PACIENTE p ON e.ID_PACIENTE = p.ID_PACIENTE
        `);

        res.json(result.recordset);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al obtener las citas"
        });
    }
};

const getCita = async (req, res) => {
    const { id } = req.body;

    try {
        const request = pool.request();
        const result = await request.input('id', sql.Int, id)
            .query('SELECT * FROM CARGO_CITAS WHERE ID_EXPEDIENTE= @id');

        if (result.recordset.length === 0) {
            return res.status(404).json({
                message: "Cita no encontrada"
            });
        }

        res.json({
            message: "Cita obtenida correctamente",
            citas: result.recordset
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