const admin = require("firebase-admin");

module.exports = async (req, res, next) => {

    const token =
        req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            erro: "Token não enviado"
        });
    }

    try {

        const decoded =
            await admin.auth().verifyIdToken(token);

        req.user = decoded;

        next();

    } catch {

        return res.status(403).json({
            erro: "Token inválido"
        });

    }
};