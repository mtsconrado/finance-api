const { Op } = require('sequelize');

class VehicleService {
    constructor(VehicleModels, SubscriptionModels) {
        this.vehicle = VehicleModels;
        this.subscription = SubscriptionModels;
    }

    async get(query) {
        try {
            const page = query.page || 1;
            const pageSize = query.pageSize || 20;
            const search = query.search;

            const where = {};
            if (search) {
                where.plateNumber = {
                    [Op.iLike]: `%${search}%`,
                };
            }

            // consulta com paginação
            const results = await this.subscription.findAndCountAll({
                attributes: { exclude: ['vehicleId'] },
                include: [
                    {
                        model: this.vehicle,
                        as: 'vehicle',
                        where,
                    },
                ],
                limit: pageSize, // quantidade de resultados por página
                offset: pageSize * (page - 1), // resultado a partir do qual começar a retornar
                order: [['created_at', 'DESC']],
            });
            // contagem de resultados
            const count = results.count;

            // resultados
            const rows = results.rows;

            // quantidade de páginas
            const totalPages = Math.ceil(count / pageSize);

            // total de resultados
            const totalElements = count;

            return {
                rows,
                size: pageSize,
                totalElements,
                totalPages,
            };
        } catch (error) {
            console.error(error.message);

            throw error;
        }
    }

    async getById(id) {
        try {
            const result = await this.subscription.findByPk(id, {
                attributes: { exclude: ['vehicleId'] },
                include: [
                    {
                        model: this.vehicle,
                        as: 'vehicle',
                    },
                ],
            });

            return result;
        } catch (error) {
            console.error(error.message);

            throw error;
        }
    }
}

module.exports = VehicleService;
