// actions

export default {
    async getPatients({ commit }) {
        const data = await import("../../mocks/patients.json");

        if (data.value) {
            commit("setPatients", data.value);
        }
    },
};
