const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    console.log(authHeader)
    const token = authHeader;

    if (!token) {
        return res.status(401).json({ message: "Access token not found" });
    }

    jwt.verify(token, "secretkey123", (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: err.message });
        }
        req.user = decoded;
        next();
    });
};

module.exports = {
    verifyToken,
};
