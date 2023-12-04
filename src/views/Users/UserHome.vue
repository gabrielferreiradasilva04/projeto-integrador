<template>
    <v-container >
        <v-card color="blue-darken-4" class="rounded-pill">
            <v-card-title primary-title class="text-center ">
                <h1>Seja Bem Vindo ao Incrível Mundo das Arrancadas!</h1>
            </v-card-title>
        </v-card>
        <br>

        <v-carousel hide-delimiters height="500px" class="rounded-xl">
            <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src" cover></v-carousel-item>
        </v-carousel>
        <br>
        <br>
        <v-divider></v-divider>
        <br>
        <v-card color="blue-darken-4" class="rounded-xl">
            <v-card-title primary-title>
                <h2>Suas Estatísticas</h2>
            </v-card-title>
            <v-card-text>
                <v-data-table v-model:items="this.table" :headers="this.headers" items-per-page-text="Linhas por página" :hover="true"
                    :hide-no-data="true" class="rounded-xl">
                </v-data-table>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import { VDataTable } from 'vuetify/lib/labs/components.mjs'

export default {
    components: {
        VDataTable
    },
    data() {
        return {
            items: [
                {
                    src: '\slide1.jpg',
                },
                {
                    src: '\slide2.jpg',
                },
                {
                    src: '\slide3.jpg',
                },
                {
                    src: '\slide4.jpeg',
                },
            ],
            headers: [
                {
                    title: 'Apostas Em Andamento',
                    key: 'open'
                },
                {
                    title: 'Apostas Finalizadas',
                    key: 'close'
                },
                {
                    title: 'Ganhos Em Apostas',
                    key: 'amount'
                },
                {
                    title: 'Acertividade (%)',
                    key: 'percent'
                }
            ],
            table:[]
        }
    }
}

</script>