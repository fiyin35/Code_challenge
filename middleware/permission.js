const User =  require('../models/user.js');

const permission = async (req, res, next) => {
    //const { id } = req.params;
    // const { roles, groups} = req.body;
    
    
    // const userRole = await User.findOne({where: {roles: roles}})
    // const userGroup = await User.findOne({where: {groups: groups}});

    // if (userRole.length && userGroup.length) {
    //     next()
    // } else {
    //     return res.status(401).json('You do not have permission to perform this operation')
    // }
}

module.exports = permission;