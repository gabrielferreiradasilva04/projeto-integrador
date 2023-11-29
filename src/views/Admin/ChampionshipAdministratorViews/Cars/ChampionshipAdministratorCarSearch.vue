<template>
    <v-container class="h-100 d-flex flex-column">
        <v-card variant="tonal" color="light-blue-darken-2" class="rounded-x" width="100%">
            <v-card-subtitle>
                <h3>Filtros</h3>
            </v-card-subtitle>
            <v-card class="pa-2">
                <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" single-line
                    variant="outlined" hide-details></v-text-field>
                <v-data-table v-model:items="this.carStore.state.carsList" :headers="this.headers" :search="this.search">

                    <template v-slot:[`item.actions`]="{ item }">
                        <v-btn variant="text" color="warning" @click="this.edit(item)"><v-icon>mdi-pencil</v-icon></v-btn>
                    </template>
                </v-data-table>

            </v-card>
            <v-card-actions>
                <v-btn color="success" @click="this.showRegister = true"><v-icon size="x-large">
                        mdi-car-2-plus</v-icon></v-btn>
            </v-card-actions>
            <championship-administrator-car-register-vue v-if="this.showRegister" @closeRegister="this.registerClosed" />
            <Message :infoMessage="this.infoMessage" v-if="this.showMessage"
                @closeMessageDialog="this.showMessage = false" />
            <championship-administrator-car-edit-vue :carToEdit="this.selectedCarToEdit" v-if="this.showEdit"
                @closeEditDialog="this.editClosed()" />

        </v-card>

    </v-container>
</template>

<script>
import { mask } from 'vue-the-mask'
import { inject } from 'vue'
import ChampionshipAdministratorCarRegisterVue from './ChampionshipAdministratorCarRegister.vue'
import Message from '@/components/dialogs/Message.vue'
import ChampionshipAdministratorCarEditVue from './ChampionshipAdministratorCarEdit.vue'
import { VDataTable } from 'vuetify/lib/labs/components.mjs'

export default {
    components: { ChampionshipAdministratorCarRegisterVue, Message, ChampionshipAdministratorCarEditVue, VDataTable },
    directives: {
        mask
    },
    setup() {
        const carStore = inject('userStore');
        carStore.methods.getCars();
        carStore.methods.getPilots();
        return {
            carStore,
        }
    },
    data() {
        return {
            model: null,
            nickname: null,
            year: null,
            pilot: null,
            preparer: null,
            showRegister: false,
            carsList: [],
            infoMessage: '',
            showMessage: false,
            showEdit: false,
            selectedCarToEdit: null,
            headers: [
                { title: 'Modelo', key: 'model' },
                { title: 'Ano', key: 'year' },
                { title: 'Piloto', key: 'pilot.name' },
                { title: 'Preparador', key: 'preparer.nickname' },
                { title: 'Ações', key: 'actions', sortable: false },
            ],
            search: ''
        }
    },
    methods: {
        registerClosed() {
            this.showRegister = false;
        },

        edit(car) {
            this.selectedCarToEdit = car;
            this.showEdit = true;
        },
        editClosed() {
            this.selectedCarToEdit = null;
            this.showEdit = false;
        }
    }
}

</script>