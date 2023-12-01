<template>
    <v-container class="h-100 d-flex flex-column">
        <v-card variant="tonal" color="light-blue-darken-2" class="rounded-x" width="100%">
            <v-card-subtitle>
                <h3>
                    Filtros
                </h3>
            </v-card-subtitle>
            <v-card class="pa-2">
                <v-text-field v-model="search" label="Pesquisa (Titulo, tamanho da pista, data inicio, data fim e status)" prepend-inner-icon="mdi-magnify" single-line
                    variant="outlined" hide-details></v-text-field>
                <v-data-table v-model:items="this.championshipStore.state.championshipsList" :headers="this.headers"
                    :hide-no-data="true" items-per-page-text="Items por Página" :hover="true">
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-btn variant="text" color="warning" @click="this.edit(item)"><v-icon>mdi-pencil</v-icon></v-btn>
                    </template>
                </v-data-table>
            </v-card>
            <v-card-actions>
                <v-btn @click="this.showRegister = true" color="success" size="x-medium"><v-icon>mdi-shield-car</v-icon> <v-icon
                        size="x-medium">mdi-plus</v-icon></v-btn>
            </v-card-actions>
        </v-card>
        <championship-register-vue v-if="showRegister" @closeRegister="this.showRegister = false" />
    </v-container>
</template>
<script>
import { VDataTable } from 'vuetify/lib/labs/components.mjs'
import { inject } from 'vue'

import ChampionshipRegisterVue from './ChampionshipRegister.vue'

export default {
    components: { VDataTable, ChampionshipRegisterVue },
    setup() {
        const championshipStore = inject('userStore');
        championshipStore.methods.getChampionships();

        return {
            championshipStore
        }
    },

    data() {
        return {
            title: null,
            startDate: null,
            showRegister: false,
            headers: [
                {
                    title: 'Titulo',
                    key: 'title'
                },
                {
                    title: 'Tamanho da pista',
                    key: 'trackSize',
                },
                {
                    title: 'Data Inicio',
                    key: 'startDate'
                },
                {
                    title: 'Data Fim',
                    key: 'endDate'
                },
                {
                    title: 'Status',
                    key: 'status.description'
                },
                {
                    title: 'Ações',
                    key: 'actions',
                    sortable: false
                }
            ],
            search: ''
        }
    }
}

</script>