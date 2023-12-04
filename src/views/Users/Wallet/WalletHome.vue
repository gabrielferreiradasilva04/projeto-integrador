<template>
    <v-container class="d-flex flex-column" height="100%" width="100%" variant="text">
        <v-card class="elevation-24" color="blue-darken-4">
            <v-card-title primary-title class="text-center">
                <h1>Minha carteira</h1>
            </v-card-title>

        </v-card>
        <br>
        <br>
        <v-card color="green">
            <v-card-title primary-title>
                <h2>Saldo atual: <v-icon>mdi-currency-usd</v-icon>{{ this.userStore.state.balance }}
                </h2>

            </v-card-title>
            <v-card-actions class="d-flex flex-row-reverse">
                <v-btn @click="this.showAddBalance = true" color="" value="value">Realizar deposito</v-btn>
                <v-btn @click="this.showRemoveBalance = true" color="">Retirada</v-btn>
            </v-card-actions>
        </v-card>
        <v-card>
            <v-card-title primary-title>
                Movimentações
            </v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show"></v-btn>
            </v-card-actions>

            <v-expand-transition>
                <div v-show="show">
                    <v-divider></v-divider>

                    <v-card-text>
                        Aqui estão suas movimentações {{ userStore.state.user.name }}
                    </v-card-text>
                    <v-divider></v-divider>
                    <br>
                    <v-data-table class="rounded-xl" v-model:items="this.userStore.state.movements" :headers="this.movementsHeader"
                        items-per-page-text="Movimentos por Página" :hover="true" :hide-no-data="true">
                    </v-data-table>
                </div>
            </v-expand-transition>
        </v-card>
    <AddBalance v-if="this.showAddBalance" @closeAddBalance="this.showAddBalance = false" />
    <RemoveBalance v-if="this.showRemoveBalance" @closeRemoveBalance="this.showRemoveBalance = false" />

    </v-container>
</template>

<script>
import { VDataTable } from 'vuetify/lib/labs/components.mjs'
import { inject } from 'vue'
import {mask} from 'vue-the-mask'
import AddBalance from '@/views/Users/Wallet/AddBalance.vue'
import RemoveBalance from '@/views/Users/Wallet/RemoveBalance.vue'


export default {
    components: { VDataTable, AddBalance, RemoveBalance },

    setup() {
        const userStore = inject('userStore')
        userStore.methods.getCurrentUser();
        return{
            userStore,
        }

    },
    data() {
        return {
            show: false,
            movementsHeader: [
                {
                    title: 'Tipo',
                    key: 'movementType.description'
                },
                {
                    title: 'Valor',
                    key: 'amount'
                },
                {
                    title: 'Data',
                    key: 'date'
                },
            ],
            showAddBalance: false,
            showRemoveBalance: false,
        }
    },
    methods: {


    },
    directives:{
        mask
    }




}


</script>