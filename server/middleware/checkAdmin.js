
const checkAdmin = async (req, res, next) => {
    if (req.tokenData.isAdmin !== true) {
        return res.status(403).json({
            status: 403,
            error: 'you are not authorized to perform this task',
        });
    }
    next();
};
export default checkAdmin;
