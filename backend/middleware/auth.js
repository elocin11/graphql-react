const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const header = req.get("Authorization");

  if (!header) {
    req.isAuth = false;
    return next();
  }

  const token = header.split(" ")[1];

  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, "secretkey");
  } catch (error) {
    req.isAuth = false;
    return next();
  }

  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;
  req.userId = decodedToken.id;
  next();
};
