<template>
    <v-container class="h-100 d-flex flex-column">
        <v-card variant="tonal" color="light-blue-darken-2" class="rounded-x" width="100%">
            <v-card-subtitle>
                <h3>
                    Filtros
                </h3>
            </v-card-subtitle>
            <v-card>
                <v-data-table v-model:items="this.items" :headers="this.headers"
                    :hide-no-data="true" items-per-page-text="Itens por Página" :hover="true">
                </v-data-table>
            </v-card>
        </v-card>

    </v-container>
</template>
<script>
import { VDataTable } from 'vuetify/lib/labs/components.mjs'
import { inject } from 'vue'

export default {
    components: { VDataTable},
    data(){
        return{
            headers:[
                {
                    title: 'Status da Aposta',
                },
                {
                    title: 'Tipo de aposta',
                },
                {
                    title: 'Campeonato',
                },
            ],
            items:[]
        }
    }


}
</script>