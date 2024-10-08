const express = require('express');

const urlController = require('../controllers/url.controller');

const router = express.Router();

router.post('/api/shorturl', urlController.responseUrl);

router.post('/api/shorturl/:shortUrl', urlController.redirectToUrl);

module.exports = router;