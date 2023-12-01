<template>
    <v-dialog v-model="dialog" scrollable persistent max-width="60%" transition="dialog-transition" class="h-auto w-auto">
        <v-card class="rounded-xl elevation-0" color="blue-darken-4">
            <v-card-title primary-title class="text-center">
                <h2>Tabela de Classificação</h2>
            </v-card-title>
            <v-card-text class="rounded">
                <v-data-table v-model:items="table" :headers="this.headers" :search="this.search"
                    items-per-page-text="Posições por página" :hover="true" :hide-no-data="true">
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-btn variant="text" color="warning" @click="this.edit(item)"><v-icon>mdi-pencil</v-icon></v-btn>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { VDataTable } from 'vuetify/lib/labs/components.mjs'

export default {
    components: { VDataTable },
    data() {
        return {
            table: [
                {
                    nickname: 'Carro1',
                    pilot:{
                        nickname: 'Piloto  1'
                    }
                },
                {
                    nickname: 'Carro2',
                    pilot:{
                        nickname: 'Piloto  2'
                    }
                },
                {
                    nickname: 'Carro3',
                    pilot:{
                        nickname: 'Piloto  3'
                    }
                },
            ],
            headers: [
                {
                    title: 'Posição',
                    value: "1°"
                },
                {
                    title: 'Carro (Apelido)',
                    key: 'nickname'
                },
                {
                    title: 'Piloto (Apelido)',
                    key: 'pilot.nickname'
                }
            ],
            search: '',
            dialog: true
        }
    }
}


</script>