const CustomerModels = require('../models/CustomerModels');
const CustomerService = require('../services/CustomerServices');

const customerService = new CustomerService(CustomerModels);

module.exports = {
    async get(req, res) {
        try {
            const customers = await customerService.get(req.query);

            res.status(200).json({ customers });
        } catch (error) {
            res.status(400).json({ error });
        }
    },
};
