const express = require('express');

const permission = require('../middleware/permission');

const Role = require('../utils/role');

const { signin, signup, getUsers, getUser } = require('../controllers/user.js');

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);


 //route: baseURL/user
router.get('/', getUsers); 

//route: baseURL/user/id
router.get('/:id', permission(Role.Admin), getUser);  //only user with admin role can access this route

module.exports = router; 