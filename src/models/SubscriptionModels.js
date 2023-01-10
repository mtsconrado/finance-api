const { Model, DataTypes } = require('sequelize');

class SubscriptionModels extends Model {
    static init(sequelize) {
        super.init(
            {
                vehicleId: DataTypes.UUID,
            },
            {
                sequelize,
                tableName: 'subscription',
                createdAt: false,
                updatedAt: false,
            }
        );
    }

    static associate(models) {
        this.belongsTo(models, { foreignKey: 'vehicleId', as: 'vehicle' });
    }
}

module.exports = SubscriptionModels;
