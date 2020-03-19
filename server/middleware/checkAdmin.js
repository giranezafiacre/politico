
const checkAdmin = async (req, res, next) => {
    const value = req.tokenData.isAdmin;
    if (value !== true) {
        return res.status(403).json({
            status: 403,
            error: 'you are not authorized to perform this task',
        });
    }
    next();
};
export default checkAdmin;
