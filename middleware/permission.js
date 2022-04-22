
const permission = (req, res, next) => {
    const { id } = req.params;
    
    const roles = `SELECT roles FROM USER WHERE id = ${id}`;
    const groups = `SELECT groups FROM USER WHERE id = ${id}`;

    if (roles.length && groups.length) {
        next()
    } else {
        return res.status(401).json('You do not have permission to perform this operation')
    }
}

module.exports = permission;