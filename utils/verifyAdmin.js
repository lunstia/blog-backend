export default function verifyAdmin(req, res, next) {
    if (!req.user.isAdmin) {
        res.status(403).json({message: "User is unauthorized"});
        return;
    } 

    next();
}