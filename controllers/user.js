const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {User, Role, Group, UserRoles} =  require('../models/user');

exports.signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email: email}});

        if(!existingUser) return res.status(404).json({message: "User doesn't exist"});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(404).json({message: 'Invalid Credentials'});

        const token = jwt.sign({email: existingUser.email, id: existingUser.id}, 'delete', { expiresIn: "3h" });

        res.status(200).json({result: existingUser, token});

    } catch(error) {
        res.status(500).json({message: 'Unable to login, something went wrong'});
    }
}

exports.signup = async (req, res) => {
    const { email, name, password, roleName, groupName} = req.body;
    try {
        const existingUser = await User.findOne({ where: { email: email}});

        if(existingUser) return res.status(400).json({message: 'User with email already exists'});    

        const hashedPassword = await bcrypt.hash(password, 12);

        const saveRole = await Role.create({roleName});
        const saveGroup = await Group.create({groupName});
        
        console.log(saveRole, saveGroup);
        const result = await User.create({email, password: hashedPassword, name});
        const save = await UserRoles.create({roleId: saveRole.id, groupId: saveGroup.id, userId: result.id});
        console.log(save);
        const token = jwt.sign({email: result.email, id: result.id}, 'delete', { expiresIn: "3h" });

        return res.status(200).json({result, saveRole, saveGroup, token});


    } catch(error) {
        res.status(500).json({message: `An internal error occurred ${error}`});
    }
}

exports.getUser = async (req, res) => {
    
    const { id } = req.params; 

    try {
        const user = await User.findOne({ where: {id: id} });
        
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}

exports.getUsers = async (req, res) => { 
    
    try {
        const users = await User.findAll();

        res.status(200).json(users)

    } catch(error) {
        console.log(error);
    }
}