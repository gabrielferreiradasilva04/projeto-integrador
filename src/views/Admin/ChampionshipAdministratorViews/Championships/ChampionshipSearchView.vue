<template>
    <v-container class="h-100 d-flex flex-column">
        <v-card variant="tonal" color="light-blue-darken-2" class="rounded-x" width="100%">
            <v-card-subtitle>
                <h3>
                    Filtros
                </h3>
            </v-card-subtitle>
        </v-card>
        <v-card>
            <v-data-table v-model:items="this.items" item-value="name" :headers="this.headers">
                    <template v-slot:[`bottom`]>
                        <div class="text-center pt-2">
                            <v-pagination v-model="page" :length="pageCount"></v-pagination>
                        </div>
                    </template>
            </v-data-table>
        </v-card>

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