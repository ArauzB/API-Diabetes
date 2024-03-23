const express = require('express');
const router = express();

const {login, logout, authMiddleware ,createUsers,selectUsers} = require('../controllers/auth.controller');



router.post('/login', login);
router.post('/logout', logout);
router.get("/verify", authMiddleware, (req, res) => {
    res.json({ message: "Ruta protegida accesible" });
  });
router.post('/createUsers', createUsers);
router.get( '/users', selectUsers );



module.exports = router;