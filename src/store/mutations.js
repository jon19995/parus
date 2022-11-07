// mutations

export default {
    setPatients(state, newPatients) {
        const isValidPatients = Array.isArray(state.patients);

        if (isValidPatients) {
            state.patients = newPatients;
        }
    },

    setPatient(state, patient) {
        const patients = state.patients;

        const searchPatient = Array.prototype.findIndex.call(
            patients,
            (u) => u.id === patient.id
        );

        searchPatient !== -1
            ? (patients[searchPatient] = patient)
            : patients.push(patient);
    },
};
