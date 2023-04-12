import express from 'express'
import auth from './auth.route'
import user from './user.route'

const router = express.Router()

// Using other routes
router.use(auth)
router.use(user)

router.get('/healthcheck', (_, res) => {
    res.sendStatus(200)
})


export default router