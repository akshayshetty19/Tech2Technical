const adminMiddleware = async (req, res, next) => {
    try {
        const adminRole = req.user.isAdmin;
        if(!adminRole) {
            return res.status(401).json({
                message: "You are not authorized to access this route"
            })
        }
        next(); // If the user is an admin, continue to the next middleware or controller function.

    } catch (error) {
        next(error);
    }
}

module.exports = adminMiddleware;