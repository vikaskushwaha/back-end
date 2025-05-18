const express = require('express');
const getAllusedVehicle = require('../controllers/usedvehicleControllers');
const getAllNewVehicles = require('../controllers/newVehicleController');
const getAllVehicle = require('../controllers/getVehiclesController');
const getAllmenufactures = require('../controllers/getAllmenufacturesController');
const signup = require('../controllers/singUpcontroller');
const login = require('../controllers/loginController');
const { submitInquiry } = require('../controllers/inquiryController');
const logout = require('../controllers/logoutController');
const router = express.Router();
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', message: 'API v1 is running' });
});

router.get('/used', getAllusedVehicle)
router.get('/new', getAllNewVehicles)
router.get('/vehicle', getAllVehicle)
router.get('/menufactures', getAllmenufactures)

router.post('/signup', signup)
router.post('/login', login)
router.post('/inqury', submitInquiry)
router.post('/logout', logout)
module.exports = router;