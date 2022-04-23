const express = require('express');

const permission = require('../middleware/permission');

const Role = require('../utils/role');

const auth = require('../middleware/auth');

const { signin, signup, getUsers, getUser } = require('../controllers/user.js');

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);


router.get('/', getUsers); 


router.get('/:id', permission(Role.Admin), getUser); 

module.exports = router; 