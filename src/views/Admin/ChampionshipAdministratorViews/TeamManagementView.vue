<template>
    <body>
            <v-tabs v-model="tab" bg-color="blue-darken-3">
                <v-tab value="one">Cadastro de Equipes</v-tab>
                <v-tab value="two">Pesquisa</v-tab>
            </v-tabs>

            <v-card-text>
                <v-window v-model="tab">
                    <v-window-item value="one">
                        <ChampionshipAdministratorRegisterView />
                    </v-window-item>

                    <v-window-item value="two">
                        <ChampionshipAdministratorSearchTeam />
                    </v-window-item>

                </v-window>
            </v-card-text>
    </body>
</template>

<script>
import ChampionshipAdministratorRegisterView from './ChampionshipAdministratorRegisterView.vue'
import ChampionshipAdministratorSearchTeam from './ChampionshipAdministratorSearchTeam.vue'

export default {
    components:{ChampionshipAdministratorRegisterView, ChampionshipAdministratorSearchTeam},
    data: () => ({
        tab: null,
    }),
}
</script>


<style>
.main {
    display: flex;
    flex-direction: row;
    padding: 20px;
    gap: 100px;
}

.option-div {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>