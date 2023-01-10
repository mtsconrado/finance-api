const { Router } = require('express');
const CustomerControllers = require('../controllers/CustomerControllers');
const InvoiceControllers = require('../controllers/InvoiceControllers');
const VehicleControllers = require('../controllers/VehicleControllers');

const router = Router();

router.get('/invoice', InvoiceControllers.get);

router.get('/customer', CustomerControllers.get);

router.get('/vehicle', VehicleControllers.get);
router.get('/vehicle/:id', VehicleControllers.getById);


module.exports = router;
