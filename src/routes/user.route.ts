import express from 'express'
import {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/user.controller'

const router = express.Router()

router.route('/users')
    .get(getAllUsers)
    .post(createUser)

router.route('/users/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)

export default router