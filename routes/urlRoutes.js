const express = require('express')
const { getUrls, setUrl, redirectPath } = require('../controllers/urlController')
const router = express.Router()

router.get('/', getUrls)
router.post('/', setUrl)
router.get('/:path', redirectPath)


module.exports = router;