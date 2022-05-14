const router = require('express').Router();
const { addLink, getAllLinks, getLink, editLink, increaseClicks } = require('../../controllers/link')

router.post('/link', addLink)
router.get('/user/:userId/links', getAllLinks)
router.get('/link/:id', getLink)
router.put('/link/:id', editLink)
router.put('/link/:id/click', increaseClicks)


module.exports = router