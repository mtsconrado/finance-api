const { Op } = require('sequelize');

class InvoiceService {
    constructor(InvoiceModels, CustomerModels) {
        this.invoice = InvoiceModels;
        this.customer = CustomerModels;
    }

    async get(query) {
        try {
            const page = Number(query.page) || 1;
            const pageSize = Number(query.pageSize) || 20;
            const status = query.status;
            const users = query.users;
            const search = query.search;

            const whereIlike = {};
            if (search) {
                whereIlike.fullName = {
                    [Op.iLike]: `%${search}%`,
                };
            }

            const where = {};
            if (status) {
                where.status = { [Op.eq]: status };
            }
            if (users === 'DEFAULTERS') {
                where.status = { [Op.ne]: 'PAID' };
            }
            if (users === 'ADEPTS') {
                where.status = { [Op.eq]: 'PAID' };
            }

            const results = await this.invoice.findAndCountAll({
                attributes: { exclude: ['customerId'] },
                include: [
                    {
                        model: this.customer,
                        as: 'customer',
                        where: whereIlike,
                    },
                ],
                where,
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
                number: page,
            };
        } catch (error) {
            console.error(error.message);

            throw error;
        }
    }

    async getById(id) {
        try {
            const result = await this.invoice.findAll({
                attributes: { exclude: ['customerId'] },
                include: [
                    {
                        model: this.customer,
                        as: 'customer',
                    },
                ],
                where: {
                    subscriptionId: id,
                },
            });

            return result;
        } catch (error) {
            console.error(error.message);

            throw error;
        }
    }
}

module.exports = InvoiceService;
