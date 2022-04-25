const {Role, Group, UserRoles} =  require('../models/user');




const permission = (roles = []) => {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [

        // authorize based on user role
        (req, res, next) => {
            if(!req.params.id) {
                return res.status(404).json({message: 'route not found'})
            }
            UserRoles.findAll({where: {userId: req.params.id}, include: [{model: Group}, {model: Role}], raw: true}).then((user) => {
                if(!user) throw new Error('User not found');

                user.forEach((element) => {
                    if(roles != element['role.roleName']) {
                        return res.status(401).json({ message: 'You do not have the required permission' });
                    }
                })
                
            })

            // authorization successful
            next();
        }
    ];
}

module.exports = permission;