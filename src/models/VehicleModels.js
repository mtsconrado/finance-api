const { Model, DataTypes } = require('sequelize');

class VehicleModels extends Model {
    static init(sequelize) {
        super.init(
            {
                plateNumber: DataTypes.STRING,
            },
            {
                sequelize,
                tableName: 'vehicle',
                createdAt: false,
                updatedAt: false,
            }
        );
    }

    static associate(models) {
        this.hasMany(models, { foreignKey: 'vehicleId', as: 'subscription' });
    }
}

module.exports = VehicleModels;
