import jwt from 'jsonwebtoken';

export default async function verifyToken(req, res, next) {
    const bearerHeader = req.headers['Authorization'];

    if (bearerHeader === undefined) {
        res.status(403).json({message: "User is unauthorized"});
        return
    }

    try {
        const bearerToken = bearerHeader.split(' ')[1];
        const authData = await jwt.verify(bearerToken, process.env.SECRET_KEY);
        req.user = authData.user;
    } catch(err) {
        res.status(403).json({message: "User is unauthorized"});;
        return
    }

    next();
}