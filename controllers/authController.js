const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('autorization-token');
    if(!token) return res.status(401).send('Acesso negado');

    try {
        const userVerified = jwt.verify(token, process.env.SECRET_TOKEN);
        req.user = userVerified;
        next()
    } catch (error) {
        res.status(401).send('Acesso negado');
    }
}