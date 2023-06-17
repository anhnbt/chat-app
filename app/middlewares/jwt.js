const jwt = require('jsonwebtoken');
const SECRET_KEY = '58703273357638792F423F4528482B4D6250655368566D597133743677397A24';

exports.decode = (req, res, next) => {
    if (!req.headers['authorization']) {
        return res.status(400).json({ success: false, message: 'No access token provided' });
    }
    const accessToken = req.headers.authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(accessToken, SECRET_KEY);
        req.userId = decoded.userId;
        req.userType = decoded.type;
        return next();
    } catch (error) {

        return res.status(401).json({ success: false, message: error.message });
    }
}
