<template>
    <v-card class="d-flex flex-row" height="100%" width="100%" variant="text">
        <v-tabs v-model="tab" direction="vertical" color="primary" class="w-auto h-100">

            <v-tab value="option-1">
                <v-icon start size="x-large">
                    mdi-home-circle
                </v-icon>
                Menu Principal
            </v-tab>
            <v-tab value="option-2">
                <v-icon start size="x-large">
                    mdi-shield-car
                </v-icon>
                Campeonatos
            </v-tab>
            <v-tab value="option-3">
                <v-icon start size="x-large">
                    mdi-cash
                </v-icon>
                Meu Extrato </v-tab>
        </v-tabs>
        <v-window v-model="tab" continuous class="w-100 rounded-xl">
            <v-window-item value="option-1">
                <UserHome />
            </v-window-item>
            <v-window-item value="option-2">
                <ChampionshipsViewVue />
            </v-window-item>
            <v-window-item value="option-3">
            </v-window-item>
            <v-window-item value="option-4">
            </v-window-item>
        </v-window>
    </v-card>
</template>

<script>
import ChampionshipsViewVue from '@/views/Users/ChampionshipsView.vue'
import UserHome from '@/views/Users/UserHome.vue'

export default {
    components: {ChampionshipsViewVue, UserHome},
    data() {
        return {
            tab: 'option-1'
        }
    },

}


</script>