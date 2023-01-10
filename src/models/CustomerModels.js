const { Model, DataTypes } = require('sequelize');

class CustomerModels extends Model {
    static init(sequelize) {
        super.init(
            {
                fullName: DataTypes.STRING,
                cpf: DataTypes.STRING,
            },
            {
                sequelize,
                tableName: 'customer',
                createdAt: false,
                updatedAt: false,
            }
        );
    }

    static associate(models) {
        this.hasMany(models, { foreignKey: 'customerId', as: 'invoices' });
    }
}

module.exports = CustomerModels;
