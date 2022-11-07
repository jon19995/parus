<template>
    <el-container>
        <el-aside width="200px">Aside</el-aside>
        <patients-list />
    </el-container>
</template>

<script>
import PatientsList from "@/pages/PatientsList/PatientsList.vue";
import { Container, Aside } from "element-ui";
export default {
    components: {
        PatientsList,
        [Aside.name]: Aside,
        [Container.name]: Container,
    },
};
</script>

<style scoped>
.el-container {
    max-height: 100vh;
}
</style>
