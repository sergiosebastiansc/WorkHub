const checkUser = (req, res, next) => {
  if (!req.user) { //verifica auntenticacion
    return res.status(401).json({ msg: "Usuario no autenticado." });
  }

  const emailParam = req.params.email; //obtener email

  if (req.user.rol === "admin" || req.user.email === emailParam) { //permite acceso si es admin r
    return next();
  }

  return res.status(403).json({ msg: "Acceso restringido: solo el usuario o admin puede continuar." });
};

const checkAdmin = (req, res, next) => {
  if (!req.user) { //revisa si existe el usuario
    return res.status(401).json({ msg: "Usuario no autenticado." });
  }

  if (req.user.rol !== "admin") { //solo permite admin
    return res.status(403).json({ msg: "Acceso restringido: se requiere rol admin." });
  }

  next();
};

module.exports = {
  checkUser,
  checkAdmin,
};