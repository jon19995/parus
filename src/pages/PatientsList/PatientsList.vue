<template>
    <el-container>
        <el-main>
            <el-table
                :data="getPatientsWithPagination(page, size)"
                :default-sort="{ prop: 'date', order: 'descending' }"
                style="width: 100%"
            >
                <el-table-column prop="firstName" label="Имя" sortable>
                    <template slot-scope="scope">
                        {{ scope.row | fullName }}
                    </template>
                </el-table-column>

                <el-table-column
                    prop="birthDate"
                    label="birthDate"
                    sortable
                    width="200"
                >
                    <template slot-scope="scope">
                        {{ scope.row.birthDate | date }}
                    </template>
                </el-table-column>

                <el-table-column prop="tags" label="tags" sortable width="180">
                    <template slot-scope="scope">
                        <transition-group
                            name="list-complete"
                            tag="div"
                            slot="reference"
                            class="name-wrapper"
                        >
                            <el-tag
                                v-for="(tag, i) in scope.row.tags"
                                :key="tag.id + i + tag.value"
                                size="medium"
                                :class="classTag(tag.value)"
                            >
                                {{ tag.value }}
                            </el-tag>
                        </transition-group>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>

        <el-footer>
            <el-pagination
                ref="pagination"
                @size-change="handleSizeChange"
                class="pagination_test"
                :current-page.sync="page"
                :pager-count="5"
                :page-sizes="[10, 20, 30]"
                :total="patients.length"
                layout="sizes, prev, pager, next, jumper"
            />
        </el-footer>
    </el-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import {
    Container,
    Table,
    TableColumn,
    Tag,
    Pagination,
    Main,
    Footer,
    Header,
} from "element-ui";
import locale from "element-ui/lib/locale";
import lang from "element-ui/lib/locale/lang/ru-RU";
import "datejs";

locale.use(lang);

export default {
    components: {
        [Header.name]: Header,
        [Tag.name]: Tag,
        [Table.name]: Table,
        [Main.name]: Main,
        [Footer.name]: Footer,
        [Container.name]: Container,
        [TableColumn.name]: TableColumn,
        [Pagination.name]: Pagination,
    },

    data() {
        return {
            page: 0,
            size: 10,
            tags: {
                vip: "vip",
                студент: "student",
                конфликт: "conflict",
                новый: "new",
            },
        };
    },

    computed: {
        ...mapGetters(["getPatientsWithPagination"]),
        ...mapState(["patients"]),
    },

    beforeMount() {
        this.getPatients();
    },

    filters: {
        date(value) {
            if (!value) return "";

            return new Date(value).toString("dd.MM.yyyy");
        },

        fullName(value) {
            if (!value) return "";

            return `${value.lastName} ${value.firstName}`;
        },
    },

    methods: {
        ...mapActions(["getPatients"]),

        handleSizeChange(size) {
            this.size = size;
        },

        classTag(type) {
            return this.tags[type.toLowerCase()];
        },
    },
};
</script>

<style scoped>
.new {
    color: #1ec561;
    background: #f4fcf7;
    border: 1px solid #a5e8c0;
    border-radius: 4px;
}

.vip {
    color: #444659;
    background: #fcf3a9;
    border: 1px solid #f8f8f9;
    border-radius: 4px;
}

.conflict {
    color: #594444;
    background: #fca9a9;
    border: 1px solid #f9f8f8;
    border-radius: 4px;
}

.el-tag:not(:last-of-type) {
    margin-right: 10px;
}

.el-table__row {
    height: 315px;
    max-height: 315px;
}

.el-pagination__total {
    display: none;
}

/* Пока просто убрал встроенные анимации тегов, чтоб не мешали */
.list-complete-enter,
.list-complete-leave,
.list-complete-enter-to,
.list-complete-leave-to {
    position: absolute;
}

.list-complete-enter-active,
.list-complete-leave-active {
    position: absolute;
}
</style>
