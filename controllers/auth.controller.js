const pool = require("../services/bd");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
 

    if (!email.trim() || !password.trim()) {
      return res.status(400).json({
        message: "Faltan datos",
        auth: false,
        token: null,
      });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "El correo electrónico no es válido",
        auth: false,
        token: null,
      });
    }

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).json({
        message: "El usuario no existe",
        auth: false,
        token: null,
      });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.CONTRASENA);

 
    const token = generateToken(user);

    res.json({
      message: "Bienvenido",
      auth: true,
      token: token,
    });

    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error interno del servidor",
      auth: false,
      token: null,
    });
  }
};

const loginPacientes = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
 

    if (!email.trim() || !password.trim()) {
      return res.status(400).json({
        message: "Faltan datos",
        auth: false,
        token: null,
      });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "El correo electrónico no es válido",
        auth: false,
        token: null,
      });
    }

    const user = await getUserByEmailPaciente(email);

    if (!user) {
      return res.status(404).json({
        message: "El usuario no existe",
        auth: false,
        token: null,
      });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.CONTRASENA);

 
    const token = generateToken(user);

    res.json({
      message: "Bienvenido",
      auth: true,
      token: token,
    });

    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error interno del servidor",
      auth: false,
      token: null,
    });
  }
};
// Función para obtener un usuario por correo electrónico desde la base de datos
async function getUserByEmail(email) {
  const result = await pool.request().input('Email', email).query('SELECT * FROM USUARIO WHERE CORREO = @Email');
  return result.recordset[0] || null;
}

async function getUserByEmailPaciente(email) {
  const result = await pool.request().input('Email', email).query('SELECT * FROM PACIENTE WHERE CORREO = @Email');
  return result.recordset[0] || null;
}

// Función para generar un token JWT
function generateToken(user) {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      nombre: user.nombre,
      rol: user.rol,
    },
    process.env.SECRET || 'analisis', // Utiliza un valor predeterminado si process.env.SECRET no está definido
    { expiresIn: "24h" } // Expira en 24 horas
  );
  return token;
}

const logout = (req, res) => {
  const { token } = req.body;
  const decoded = jwt.verify(token, process.env.SECRET);

  if (!token) {
    res.status(401).json({
      message: "No hay token",
      auth: false,
      token: null,
    });
  }

  
  res.json({
    message: "Sesión cerrada",
    auth: false,
    token: null,
  });
};

const authMiddleware = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).json({
      message: "No hay token",
      auth: false,
      token: null,
    });
  }

  jwt.verify(token, process.env.SECRET || 'analisis', (error, decoded) => {
    if (error) {
      return res.status(401).json({
        message: "Token inválido",
        auth: false,
        token: null,
      });
    }

    req.id = decoded.id;
    req.email = decoded.email;
    req.nombre = decoded.nombre;
    req.rol = decoded.rol;
    next();
  });
};

const createUsers = async (req, res) => {
  const { email, nombre, apellidos } = req.body;
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
  const passregex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  if (!email.trim() || !password.trim() || !nombre.trim()) {
    res.json({
      message: "Faltan datos",
      auth: false,
      token: null,
    });
  } else if (!emailregex.test(email)) {
    res.json({
      message: "El correo electrónico no es válido",
      auth: false,
      token: null,
    });
  } else {
    try {
      const request = await pool.request();
      request.input('Email', email); // Asignamos el valor del parámetro @Email
      const result = await request.query("SELECT * FROM USUARIO WHERE CORREO = @Email");

      if (result.recordset.length > 0) {
        res.json({
          message: "Este usuario ya está registrado",
          auth: false,
          token: null,
        });
      } else if (!passregex.test(password)) {
        res.json({
          message: "La contraseña no es válida",
          auth: false,
          token: null,
        });
      } else {
        const insertRequest = await pool.request()
          .input('NOMBRES', nombre)
          .input('APELLIDOS', apellidos)
          .input('EMAIL', email)
          .input('PASSWORD', passwordHash)
          .input('ESTADO', status)
          .query("INSERT INTO USUARIO (NOMBRES, APELLIDOS, CORREO, CONTRASENA, ESTADO) VALUES (@NOMBRES, @APELLIDOS, @EMAIL, @PASSWORD, @ESTADO)");

        res.json({
          password: password,
          message: "Se ha enviado un correo de confirmación",
          auth: true
        });

        console.log(password)
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
};

const selectUsers = async  (req, res) => {
  (await connection).request().query("SELECT * FROM USUARIO", async (error, results) => {
    if (error) {
      console.log(error);
    } else {
      res.json(results);
    }
  }
  );
}

module.exports = {
  login,
  loginPacientes,
  logout,
  authMiddleware,
  createUsers,
  selectUsers
};
