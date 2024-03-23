const { pool } = require("../services/bd");
const bcryptjs = require("bcryptjs");

const crearCliente = async (req, res) => {
  try {
    const { cui, nombres, apellidos, email, direccion } = req.body;
    const numeros = "0123456789";
    const letrasMayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
    const simbolos = "!@#$%^&*()_+";
    const status = 1;

    let caracteres = "";
    let contraseña = "";
    let longitud = 14;

    caracteres += numeros.charAt(Math.floor(Math.random() * numeros.length));
    caracteres += letrasMayusculas.charAt(
      Math.floor(Math.random() * letrasMayusculas.length)
    );
    caracteres += letrasMinusculas.charAt(
      Math.floor(Math.random() * letrasMinusculas.length)
    );
    caracteres += simbolos.charAt(Math.floor(Math.random() * simbolos.length));

    for (let i = 0; i < longitud - 4; i++) {
      caracteres += numeros + letrasMayusculas + letrasMinusculas + simbolos;
      contraseña += caracteres.charAt(
        Math.floor(Math.random() * caracteres.length)
      );
    }

    const password = contraseña;
    const passwordHash = await bcryptjs.hash(password, 10);

    const emailregex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;


    if (
      !nombres.trim().length ||
      !email.trim().length ||
      !direccion.trim().length
    ) {
      return res.json({
        message: "Faltan datos",
      });
    } else if (!emailregex.test(email)) {
      return res.json({
        message: "El correo electrónico no es válido",
      });
    }

    const user = await getUserByEmail(email);

    if (user) {
      return res.json({
        message: "Este usuario ya está registrado",
      });
    }

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

    res.json({
      message: "Cliente creado correctamente",
      password: password,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

const editCliente = async (req, res) => {
  try {
    const { cui, nombres, apellidos, email, direccion } = req.body;
    const emailregex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (
      !nombres.trim().length ||
      !email.trim().length ||
      !direccion.trim().length
    ) {
      return res.json({
        message: "Faltan datos",
      });
    } else if (!emailregex.test(email)) {
      return res.json({
        message: "El correo electrónico no es válido",
      });
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

    res.json({
      message: "Cliente editado correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

const getAllCliente = async (req, res) => {
  try {
    const result = await pool.request().query("SELECT * FROM PACIENTE");
    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

const changeEstado = async (req, res) => {
  try {
      const { id, estado } = req.body;

      const result = await pool
          .request()
          .input("ESTADO", estado)
          .input("ID_PACIENTE", id)
          .query("UPDATE PACIENTE SET ESTADO = @ESTADO WHERE ID_PACIENTE = @ID_PACIENTE");

      res.json({
          message: "Estado cambiado correctamente",
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({
          message: "Error interno del servidor",
      });
  }
};

module.exports = {
  crearCliente,
  editCliente,
  getAllCliente,
  changeEstado,
};
