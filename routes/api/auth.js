const router = require('express').Router();
const { signup, login, isAuthenticated, getUserData } = require('../../controllers/auth')

router.get('/', () => {
    res.send("Welcome to Leenks API")
})

router.post('/signup', signup)
router.post('/login', login)
router.get('/user', isAuthenticated, getUserData)


module.exports = router;