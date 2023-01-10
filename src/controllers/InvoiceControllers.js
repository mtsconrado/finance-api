const CustomerModels = require('../models/CustomerModels');
const InvoiceModels = require('../models/InvoiceModels');
const InvoiceService = require('../services/InvoiceServices');

const invoiceService = new InvoiceService(InvoiceModels, CustomerModels);

module.exports = {
    async get(req, res) {
        try {
            const invoices = await invoiceService.get(req.query);

            res.status(200).json(invoices);
        } catch (error) {
            res.status(400).json({ error });
        }
    },
};
