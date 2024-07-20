import jwt from "jsonwebtoken";

// JWT Secret Key
const JWT_SECRET = "gvggcfcfxxxxfgggfxfgx"; // Replace with your actual secret

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send("Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};

export default verifyToken;
