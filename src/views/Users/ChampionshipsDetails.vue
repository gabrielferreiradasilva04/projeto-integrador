<template>
    <v-dialog v-model="dialog" scrollable persistent max-width="60%" transition="dialog-transition" class="h-auto w-auto">
        <v-card class="rounded-xl pa-2 elevation-0" >
            <v-card-title primary-title class="text-center">
                <h3>Detalhes do Campeonato</h3>
            </v-card-title>
            <v-card-text>
                <h2>Classificação</h2>
                <v-data-table class="rounded-xl" v-model:sortBy="sortBy" :items="ranking" :headers="this.headers"
                    :search="this.search" items-per-page-text="Posições por página" :hover="true" :hide-no-data="true">
                </v-data-table>
                <br>
                <v-divider></v-divider>
                <br>
                <h2> Próximos Confrontos</h2>
                <v-data-table class="rounded-xl" v-model:items="this.championshipClashs" :headers="this.clashHeaders"
                    items-per-page-text="Confrontos por página" :hover="true" :hide-no-data="true">
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-btn variant="text" color="warning" @click="this.showToBetFunction(item)"><v-icon
                                size="x-large">mdi-cash</v-icon></v-btn>
                    </template>
                    <template v-slot:[`item.versus`]="{ item }">
                        X
                    </template>
                </v-data-table>
            </v-card-text>
            <v-card-actions class="pa-2 d-flex flex-row-reverse">
                <v-btn @click="this.$emit('closeDetails')" color="warning">Voltar</v-btn>
            </v-card-actions>
        </v-card>
        <ToBet v-if="this.showToBet" :cars="this.carsClash" :clashRecieve="this.selectedClash"
            @closeBetDialog="this.closeTobet()" />
    </v-dialog>
</template>

<script>
import { VDataTable } from 'vuetify/lib/labs/components.mjs'
import ToBet from './bet/ToBet.vue'


export default {
    props: ['championshipProp'],
    components: { VDataTable, ToBet },
    data() {
        return {
            showToBet: false,
            sortBy: [
                {
                    "key": "score",
                    "order": "desc",
                    "key": "bestTime",
                    "order": "asc"
                }
            ],
            ranking: [],
            table: [
                {
                    nickname: 'Carro1',
                    pilot: {
                        nickname: 'Piloto  1'
                    }
                },
                {
                    nickname: 'Carro2',
                    pilot: {
                        nickname: 'Piloto  2'
                    }
                },
                {
                    nickname: 'Carro3',
                    pilot: {
                        nickname: 'Piloto  3'
                    }
                },
            ],
            headers: [
                {
                    title: 'Carro (Apelido)',
                    key: 'carNickname'
                },
                {
                    title: 'Piloto (Apelido)',
                    key: 'pilot.nickname'
                },
                {
                    title: 'Pontuação (Vitórias)',
                    key: 'score'
                },
                {
                    title: 'Melhor Temp (s)',
                    key: 'bestTime'
                }

            ],
            search: '',
            dialog: true,
            clashHeaders: [
                {
                    title: 'Carro',
                    key: "car1.nickname"
                },
                {
                    title: 'Piloto',
                    key: 'car1.pilot.nickname'
                },
                {
                    title: 'X',
                    key: 'versus'
                },
                {
                    title: 'Carro',
                    key: 'car2.nickname'
                },
                {
                    title: 'Piloto',
                    key: 'car2.pilot.nickname'
                },
                {
                    title: 'Status',
                    key: 'clashStatus.description'
                },
                {
                    title: 'Ações',
                    key: 'actions'
                }
            ],
            championship: null,
            championshipClashs: [],
            selectedClash: null,
            carsClash: []
        }
    },
    methods: {
        async findbyChampionship(championship) {
            await fetch('http://localhost:8081/Clash/find-open-clashs', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(championship)
            }).then(res => {
                if (res.status === 200) {
                    res.json().then(data => {
                        this.championshipClashs = data;
                    })
                }
            })
        },
        async getRanking(championshipCarsList, championshipID) {
            await fetch('http://localhost:8081/Championship/ranking?championshipID=' + championshipID, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(championshipCarsList)
            }).then(res => {
                if (res.status === 200) {
                    res.json().then(data => {
                        this.ranking = data;

                    })
                }
            })
        },
        showToBetFunction(item) {
            this.selectedClash = item;
            var car1 = item.car1;
            var car2 = item.car2;
            this.carsClash.push(car1);
            this.carsClash.push(car2);
            this.showToBet = true;
        },
        closeTobet(){
            this.carsClash = [];
            this.showToBet = false;
        }
    },

    beforeMount() {
        this.championship = this.championshipProp;
        this.findbyChampionship(this.championshipProp);
        this.getRanking(this.championshipProp.cars, this.championshipProp.id);
    },
}


</script>