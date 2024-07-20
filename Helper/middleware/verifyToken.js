import jwt from "jsonwebtoken";

const JWT_SECRET = "gvggcfcfxxxxfgggfxfgx"; // Replace with your actual secret

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send("No token provided");
  }

  const token = authHeader.split(' ')[1]; // Get the token part

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(`Token verification error: ${error}`);
    res.status(403).send("Invalid or expired token");
  }
};
