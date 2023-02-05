const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send("Acces denied !");

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        req.user = verified;
        next();
    } catch (err) {
        res.status(401).send("Invalid token !");
    }
}


const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not alowed to do that!");
        }
    });
};

module.exports = {
    verifyToken,
    verifyTokenAndAdmin
}