require('dotenv').config();

module.exports = {
    invoiceDB: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: 'invoice',
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port: process.env.DB_PORT,
        rejectUnauthorized: false,
        pluralize: false,
        define: {
            underscored: true,
        },
        dialectOptions: {
            ssl: true,
        },
    },

    subscriptionDB: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: 'subscription',
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port: process.env.DB_PORT,
        rejectUnauthorized: false,
        pluralize: false,
        define: {
            underscored: true,
        },
        dialectOptions: {
            ssl: true,
        },
    },
};
