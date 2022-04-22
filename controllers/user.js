const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User =  require('../models/user.js');

exports.signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email: email}});

        if(!existingUser) return res.status(404).json({message: "User doesn't exist"});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(404).json({message: 'Invalid Credentials'});

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'delete', { expiresIn: "3h" });

        res.status(200).json({result: existingUser, token});

    } catch(error) {
        res.status(500).json({message: 'Unable to login, something went wrong'});
    }
}

exports.signup = async (req, res) => {
    const { email, name, password, roles, groups} = req.body;
    try {
        const existingUser = await User.findOne({ where: { email: email}});

        if(existingUser) return res.status(400).json({message: 'User with email already exists'});    

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({email, password: hashedPassword, name, roles, groups});

        const token = jwt.sign({email: result.email, id: result._id}, 'delete', { expiresIn: "3h" });

        return res.status(200).json({result, token});


    } catch(error) {
        res.status(500).json({message: `An internal error occurred ${error}`});
    }
}

exports.getUser = async (req, res) => {
    const { roles } = req.body;
    const { id } = req.params; 

    if(!req.id) return res.status(404).send({message: 'Unathenticated user'});

    try {
        const user = await User.findById(id);
        const userRoles = await User.findOne({ where: { roles: roles}});

        if(userRoles.length && !userRoles.includes(Admin)) {
            // user's role is not authorized
            //only an admin can access this route
            return res.status(401).json({ message: 'Unauthorized, only an admin user can access this route' });
        }
        
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}

exports.getUsers = async (req, res) => { 
    //const { id } = req.params;
    const { roles, groups } = req.body;

    //if(!req.id) return res.status(404).send({message: 'Unathenticated user'});


    try {
        const users = await User.findAll();
        const userRole = await User.findOne({where: {roles: roles}})
        const userGroup = await User.findOne({where: {groups: groups}});

        
        if(userRole.length &&  userGroup.length && userGroup.includes(Management) && !userGroup.includes(Admin) ) {
            // user's role is not authorized
            //only an admin that belong to management group can access this route
            return res.status(401).json({ message: 'Unauthorized, only an admin that belong to management group can access this route' });
        }

        res.status(200).json(users)

    } catch(error) {
        console.log(error);
    }
}