<template>
    <v-card color="indigo-darken-4">
        <div class="flex-row d-flex">
            <v-tabs v-model="tab" direction="vertical" color="primary">
                <v-tab value="option-1">
                    <v-icon start size="x-large">
                        mdi-account-group
                    </v-icon>
                    Cadastro de Equipes
                </v-tab>
                <v-tab value="option-2">
                    <v-icon start size="x-large">
                        mdi-search-web
                    </v-icon>
                    Pesquisa de Equipes
                </v-tab>
                <v-tab value="option-3">
                    <v-icon start size="x-large">
                        mdi-shield-car
                    </v-icon>
                    Campeonatos
                </v-tab>
            </v-tabs>
            <v-window v-model="tab">
                <v-window-item value="option-1">
                        <ChampionshipAdministratorRegisterViewVue />

                </v-window-item>
                <v-window-item value="option-2">
                    <v-card >
                            <ChampionshipAdministratorSearchTeamVue />
                    </v-card>
                </v-window-item>
            </v-window>
        </div>
    </v-card>
</template>

<script>
import ChampionshipAdministratorRegisterViewVue from '@/views/Admin/ChampionshipAdministratorViews/ChampionshipAdministratorRegisterView.vue'
import ChampionshipAdministratorSearchTeamVue from '@/views/Admin/ChampionshipAdministratorViews/ChampionshipAdministratorSearchTeam.vue'
export default {
    components: { ChampionshipAdministratorRegisterViewVue, ChampionshipAdministratorSearchTeamVue },
    data() {
        return {
            tab: 'option-1'
        }
    }
}


</script>