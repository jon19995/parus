// getters
export default {
    getPatientsWithPagination:
        ({ patients }) =>
        (page = 0, count = 10) =>
            patients.slice(page * count, (page + 1) * count),
};
