const jwt = require("jsonwebtoken");
const {accessTokenSecret} = require('./config')
const authenticateJWT = (req, res, next) => {
  // const accessTokenSecret = "arif";
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      req.body.userId = user.userId 
      req.body.userName = user.name 
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = authenticateJWT;
