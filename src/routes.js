'use strict';

const router = require('express').Router();

const middlewareService = require('./queryValidation-middleware');
const screenShotService = require('./screenShot-service');

router.use(middlewareService)
router.get('/', screenShotService);

module.exports = router;