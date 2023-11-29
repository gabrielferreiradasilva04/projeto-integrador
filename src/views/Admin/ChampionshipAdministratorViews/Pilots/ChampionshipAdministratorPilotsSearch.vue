<template>
    <v-container class="h-100 d-flex flex-column">
        <v-card variant="tonal" color="light-blue-darken-2" class="rounded-x" width="100%">
            <v-card-subtitle>
                <h3>Filtros</h3>
            </v-card-subtitle>
            <v-card  class="pa-2">
                <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" single-line
                    variant="outlined" hide-details></v-text-field>
                <v-data-table v-model:items="this.userStore.state.pilotsList" :headers="this.headers" :search="this.search">
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-btn variant="text" color="warning" @click="this.edit(item)"><v-icon>mdi-pencil</v-icon></v-btn>
                    </template>
                </v-data-table>
            </v-card>
            <v-card-item>
                <v-btn variant="text" color="success" @click="this.showRegister = true"><v-icon size="x-large">
                        mdi-account-plus</v-icon></v-btn>
            </v-card-item>
        </v-card>
        <Message :infoMessage="this.infoMessage" v-if="this.showMessage" @closeMessageDialog="this.showMessage = false" />
        <ChampionshipAdministratorPilotsEditVue :teams="userStore.state.teamsList" :pilotToEdit="this.selectedPilot"
            v-if="this.showEditDialog" @closeEditDialog="this.showEditDialog = false, this.pilots = null" />
        <ChampionshipAdministratorPilotsRegisterVue v-if="this.showRegister"
            @closeRegisterDialog="this.showRegister = false, this.pilots = null" />
    </v-container>
</template>

<script>
import { VDataTable } from 'vuetify/lib/labs/components.mjs'

import { mask } from 'vue-the-mask'
import Message from '@/components/dialogs/Message.vue';
import PilotsTableVue from '@/components/tables/pilots/PilotsTable.vue';
import ChampionshipAdministratorPilotsEditVue from './ChampionshipAdministratorPilotsEdit.vue';
import ChampionshipAdministratorPilotsRegisterVue from './ChampionshipAdministratorPilotsRegister.vue';
import { inject } from 'vue'

export default {
    components: { Message, PilotsTableVue, ChampionshipAdministratorPilotsEditVue, ChampionshipAdministratorPilotsRegisterVue, VDataTable },

    setup() {

        const userStore = inject('userStore')
        userStore.methods.getTeams();
        userStore.methods.getPilots();
        return {
            userStore
        }

    },
    data() {
        return {
            name: null,
            nickname: null,
            uf: null,
            document: null,
            team: null,

            //selects field
            teams: [],
            //dialogs fields
            showMessage: false,
            infoMessage: '',
            showEditDialog: false,
            showRegister: false,
            selectedPilot: {},
            //table
            pilots: [],
            headers: [
                { title: 'Nome', key: 'name' },
                { title: 'Apelido', key: 'nickname' },
                { title: 'Equipe', key: 'team.name' },
                { title: 'Ações', key: 'actions', sortable: false },
            ],
            search: ''
        }
    },
    methods: {
        edit(selectedPilot) {
            this.selectedPilot = selectedPilot;
            this.showEditDialog = true;
        }
    },

    directives: {
        mask
    },


}


</script>