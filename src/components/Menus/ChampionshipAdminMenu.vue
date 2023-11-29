<template>
    <v-card theme="dark" class="d-flex flex-row" height="100%" width="100%" variant="text">
        <v-tabs v-model="tab" direction="vertical" color="primary" class="w-auto h-100">

            <v-tab value="option-1">
                <v-icon start size="x-large">
                    mdi-account-group
                </v-icon>
                Pesquisa de Equipes
            </v-tab>
            <v-tab value="option-2">
                <v-icon start size="x-large">
                    mdi-shield-car
                </v-icon>
                Campeonatos
            </v-tab>
            <v-tab value="option-3">
                <v-icon start size="x-large">
                    mdi-car-sports
                </v-icon>
                Veículos
            </v-tab>
            <v-tab value="option-4">
                <v-icon start size="x-large">
                    mdi-account
                </v-icon>
                Pilotos
            </v-tab>

        </v-tabs>
        <v-window v-model="tab" continuous class="w-100 border rounded-xl elevation-24">
            <v-window-item value="option-1">
                <ChampionshipAdministratorSearchTeamVue />
            </v-window-item>
            <v-window-item value="option-2">
                <ChampionshipSearchView />
            </v-window-item>
            <v-window-item value="option-3">
                <ChampionshipAdministratorCarSearch />
            </v-window-item>
            <v-window-item value="option-4">
                <ChampionshipAdministratorPilotsSearchVue />
            </v-window-item>
        </v-window>
    </v-card>
</template>

<script>
import ChampionshipAdministratorRegisterViewVue from '@/views/Admin/ChampionshipAdministratorViews/Teams/ChampionshipAdministratorRegisterView.vue'
import ChampionshipAdministratorSearchTeamVue from '@/views/Admin/ChampionshipAdministratorViews/Teams/ChampionshipAdministratorSearchTeam.vue'
import ChampionshipAdministratorCarSearch from '@/views/Admin/ChampionshipAdministratorViews/Cars/ChampionshipAdministratorCarSearch.vue'
import ChampionshipAdministratorPilotsSearchVue from '@/views/Admin/ChampionshipAdministratorViews/Pilots/ChampionshipAdministratorPilotsSearch.vue'
import ChampionshipSearchView from '@/views/Admin/ChampionshipAdministratorViews/Championships/ChampionshipSearchView.vue'

export default {
    components: {
        ChampionshipAdministratorRegisterViewVue, ChampionshipAdministratorSearchTeamVue, ChampionshipAdministratorCarSearch, ChampionshipAdministratorPilotsSearchVue,
        ChampionshipSearchView
    },
    data() {
        return {
            tab: 'option-1'
        }
    },

}


</script>