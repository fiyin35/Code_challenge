const {User, Role, Group} =  require('../models/user');


const permission = async(roles = []) => {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    const userRole = await Role.findOne({where: {roles: roleName}});

    return [
        // authenticate JWT token and attach user to request object (req.user)
        //jwt({ secret, algorithms: ['HS256'] }),

        // authorize based on user role
        (req, res, next) => {
            //if (roles.length && !roles.includes(req.roleName)) {
            if (userRole != roles) {
                // user's role is not authorized
                return res.status(401).json({ message: 'You do not have the required permissions' });
            }

            // authentication and authorization successful
            next();
        }
    ];
}

module.exports = permission;