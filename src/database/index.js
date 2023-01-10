const Sequelize = require('sequelize');
const { invoiceDB, subscriptionDB } = require('../config/database');

const Invoice = require('../models/InvoiceModels');
const Customer = require('../models/CustomerModels');
const Subscription = require('../models/SubscriptionModels');
const Vehicle = require('../models/VehicleModels');

const connectionInvoice = new Sequelize(invoiceDB);
const connectionSubscription = new Sequelize(subscriptionDB);

Invoice.init(connectionInvoice);
Customer.init(connectionInvoice);

Subscription.init(connectionSubscription);
Vehicle.init(connectionSubscription);

Invoice.associate({ Customer, Subscription });
Customer.associate(Invoice);

Subscription.associate(Vehicle);
Vehicle.associate(Subscription);

module.exports = { connectionInvoice, connectionSubscription };
