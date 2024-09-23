const express = require('express')

const router = express.Router()

const { handleGetAllUser, handleGetUserById, handleDeleteUserById, handleUpdateUserById, handleCreateNewUser } = require('../controllers/user')




router.route('/:id')
    .get(handleGetUserById)

    .patch(handleUpdateUserById)

    .delete(handleDeleteUserById)


router.route('/').post(handleCreateNewUser).get(handleGetAllUser)

module.exports = router;