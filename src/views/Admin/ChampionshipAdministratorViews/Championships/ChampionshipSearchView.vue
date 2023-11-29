<template>
    <v-container class="h-100 d-flex flex-column">
        <v-card variant="tonal" color="light-blue-darken-2" class="rounded-x" width="100%">
            <v-card-subtitle>
                <h3>
                    Filtros
                </h3>
            </v-card-subtitle>
            <v-card class="d-flex flex-column pa-2">
                <v-form ref="form">
                    <v-row>
                        <v-col>
                            <v-text-field name="title" label="Titulo do Campeonato" id="title" v-model="this.title"
                                variant="solo-filled"></v-text-field>

                            <v-date-picker v-model="value" :active="true" :landscape="true" :reactive="true">Selecione uma
                                data</v-date-picker>
                        </v-col>
                        <v-col>

                        </v-col>
                    </v-row>
                </v-form>

            </v-card>
        </v-card>
        <v-data-table v-model:items="this.items" item-value="name" :headers="this.headers">
        </v-data-table>
    </v-container>
</template>
<script>
import { VDataTable } from 'vuetify/lib/labs/components.mjs'

export default {
    components: { VDataTable },

    data() {
        return {
            title: null,
            startDate: null,

            headers: [
                {
                    title: 'Name',
                    key: 'name'
                }
            ]
        }
    }
}

</script>