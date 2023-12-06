const { Router } = require('express');
const { checkUserBody } = require('../middlewares/Validator');
const { AddUser, UpdateUser, DeleteUser, GetUsers, GetUser, Login, Profile } = require('../controllers/User');
const { auth } = require('../middlewares/Auth');

const router = Router();

router.route('/')
    .get(GetUsers)
    .post(checkUserBody, AddUser);
router.route('/:id')
    .get(GetUser)
    .put(auth, UpdateUser)
    .delete(auth, DeleteUser);

router.post('/login', Login);
router.get('/profile', Profile)



module.exports = router;