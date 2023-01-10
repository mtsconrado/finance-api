const { Model, DataTypes } = require('sequelize');

class InvoiceModels extends Model {
    static init(sequelize) {
        super.init(
            {
                status: DataTypes.STRING,
                kmPerMonth: DataTypes.NUMBER,
                kmPerMonthAmount: DataTypes.NUMBER,
                finishedAt: DataTypes.STRING,
                subscriptionId: DataTypes.UUID,
            },
            {
                sequelize,
                tableName: 'invoice',
                createdAt: false,
                updatedAt: false,
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.Customer, { foreignKey: 'customerId', as: 'customer' });
    }
}

module.exports = InvoiceModels;
