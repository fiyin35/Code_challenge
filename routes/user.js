const express = require('express');

const permission= require('../middleware/permission');

const auth = require('../middleware/auth');

const { signin, signup, getUsers, getUser } = require('../controllers/user.js');

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);

//admin only
router.get('/', getUsers); 

//only an admin that belongs to management group can get all users
//authenticated user who is not an admin can only get his/her personal account
router.get('/:id', auth, getUser); 

module.exports = router;