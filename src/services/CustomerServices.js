class CustomerService {
    constructor(CustomerModels) {
        this.customer = CustomerModels;
    }

    async get(query) {
        try {
            const page = query.page || 1;
            const pageSize = query.pageSize || 20;

            // consulta com paginação
            const results = await this.customer.findAndCountAll({
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
}

module.exports = CustomerService;
