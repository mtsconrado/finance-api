const CustomerModels = require('../models/CustomerModels');
const InvoiceModels = require('../models/InvoiceModels');
const SubscriptionModels = require('../models/SubscriptionModels');
const VehicleModels = require('../models/VehicleModels');
const InvoiceService = require('../services/InvoiceServices');
const VehicleService = require('../services/VehicleServices');

const vehicle = new VehicleService(VehicleModels, SubscriptionModels);
const invoice = new InvoiceService(InvoiceModels, CustomerModels);

module.exports = {
    async get(req, res) {
        try {
            const vehicles = await vehicle.get(req.query);

            if (req.query.search && vehicles.rows.length > 0) {
                let results = await Promise.all(
                    vehicles.rows.map(async (info) => {
                        const result = await invoice.getById(info.id);
                        if (result.length > 0) {
                            return {
                                ...result,
                                plate: info.vehicle.plateNumber,
                            };
                        }
                    })
                );

                results = results.filter((item) => item);
                res.status(200).json(results);
            } else {
                res.status(200).json(vehicles);
            }
        } catch (error) {
            res.status(400).json({ error });
        }
    },

    async getById(req, res) {
        try {
            const vehicles = await vehicle.getById(req.params.id);

            res.status(200).json(vehicles);
        } catch (error) {
            res.status(400).json({ error });
        }
    },
};
