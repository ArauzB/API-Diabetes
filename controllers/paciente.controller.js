const pool = require("../services/bd");
const bcryptjs = require("bcryptjs");

const crearCliente = async (req, res) => {
  try {
    const { cui, nombres, apellidos, email, direccion } = req.body;
    const status = 1;

    // Generar una contraseña aleatoria
    const password = generateRandomPassword();
    const passwordHash = await bcryptjs.hash(password, 10);

    // Validar formato de email
    const emailregex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!nombres.trim() || !email.trim() || !direccion.trim()) {
      return res.json({ message: "Faltan datos" });
    } else if (!emailregex.test(email)) {
      return res.json({ message: "El correo electrónico no es válido" });
    }

    // Verificar si el usuario ya existe
    const user = await getUserByEmail(email);
    if (user) {
      return res.json({ message: "Este usuario ya está registrado" });
    }

    // Insertar nuevo cliente en la base de datos
    await pool
      .request()
      .input("CUI", cui)
      .input("NOMBRES", nombres)
      .input("APELLIDOS", apellidos)
      .input("CORREO", email)
      .input("DIRECCION", direccion)
      .input("CONTRASENA", passwordHash)
      .input("ESTADO", status)
      .query(
        "INSERT INTO PACIENTE (CUI, NOMBRES, APELLIDOS, CORREO, DIRECCION, CONTRASENA, ESTADO) VALUES (@CUI, @NOMBRES, @APELLIDOS, @CORREO, @DIRECCION, @CONTRASENA, @ESTADO)"
      );

    res.json({ message: "Cliente creado correctamente", password });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const editCliente = async (req, res) => {
  try {
    const { cui, nombres, apellidos, email, direccion } = req.body;

    const emailregex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!nombres.trim() || !email.trim() || !direccion.trim()) {
      return res.json({ message: "Faltan datos" });
    } else if (!emailregex.test(email)) {
      return res.json({ message: "El correo electrónico no es válido" });
    }

    await pool
      .request()
      .input("CUI", cui)
      .input("NOMBRES", nombres)
      .input("APELLIDOS", apellidos)
      .input("CORREO", email)
      .input("DIRECCION", direccion)
      .query(
        "UPDATE PACIENTE SET NOMBRES = @NOMBRES, APELLIDOS = @APELLIDOS, DIRECCION = @DIRECCION WHERE CORREO = @CORREO"
      );

    res.json({ message: "Cliente editado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const getAllCliente = async (req, res) => {
  try {
    const result = await pool.request().query('SELECT * FROM PACIENTE');
    res.json(result.recordset);
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const changeEstado = async (req, res) => {
  try {
    const { id, estado } = req.body;

    await pool
      .request()
      .input("ESTADO", estado)
      .input("ID_PACIENTE", id)
      .query("UPDATE PACIENTE SET ESTADO = @ESTADO WHERE ID_PACIENTE = @ID_PACIENTE");

    res.json({ message: "Estado cambiado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
// Función para generar una contraseña aleatoria
function generateRandomPassword() {
  const numeros = "0123456789";
  const letrasMayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
  const simbolos = "!@#$%^&*()_+";
  const caracteres = numeros + letrasMayusculas + letrasMinusculas + simbolos;

  let password = "";
  const longitud = 14;
  for (let i = 0; i < longitud; i++) {
    password += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }

  return password;
}

module.exports = {
  crearCliente,
  editCliente,
  getAllCliente,
  changeEstado,
};