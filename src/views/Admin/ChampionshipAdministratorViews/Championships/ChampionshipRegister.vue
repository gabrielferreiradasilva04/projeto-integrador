<template>
    <v-dialog v-model="this.dialog" class="h-auto w-auto" max-width="60%" persistent>
        <v-sheet class=" pa-6 rounded-xl">
            <v-card variant="text">
                <v-card-title>
                    <h2>Cadastro de Campeonatos</h2>
                </v-card-title>
                <br>
                <v-card class="d-flex pa-2 w-50 elevation-5" variant="text">
                    <v-text-field :disabled="true" variant="solo-filled" name="responsable" label="Responsável"
                        v-model="championship.championshipAdmin.name" id="responsable"
                        prepend-inner-icon="mdi-account"></v-text-field>
                </v-card>
                <br>
                <v-card class="pa-2" variant="text">
                    <v-form ref="form">

                        <v-row>
                            <v-col>
                                <v-text-field name="title" label="Titulo" id="title" v-model="championship.title"
                                    variant="solo-filled"></v-text-field>
                            </v-col>

                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field name="startDate" label="Data Inicio" id="startDate" type="date"
                                    v-model="championship.startDate" variant="solo-filled"></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field name="endDate" label="Data Fim" id="endDate" v-model="championship.endDate"
                                    type="date" variant="solo-filled"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field name="minPilots" label="Mínimo de Pilotos" id="pilots"
                                    v-model="this.values[0]" readonly variant="solo-filled"></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field name="maxPilots" label="Máximo de pilotos" id="pilots"
                                    v-model="this.values[1]" variant="solo-filled" readonly></v-text-field>
                            </v-col>

                            <v-col class="pa-5">
                                <v-range-slider color="blue" step="2" thumb-label="always" v-model="this.values" strict>
                                </v-range-slider>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-select :items="this.store.state.championshipTypes" v-model="championship.championshipType" item-title="description"
                                    label="Tipo de campeonato" variant="solo-filled" return-object></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-select :items="this.store.state.placesList" v-model="championship.place"
                                    label="Local do Campeonato" return-object variant="solo-filled" item-title="name"></v-select>
                            </v-col>
                            <v-col class="pa-5">
                                <v-btn color="success" variant="tonal" class="rounded-xl"><v-icon>mdi-plus</v-icon></v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                    <v-divider thickness="5" color="blue"></v-divider>
                    <br>
                    <v-card class="pa-1 elevation-24" variant="outlined">
                        <v-card-subtitle class="text-center">
                            <h2>Carros competindo</h2>
                        </v-card-subtitle>
                        <br>
                        <v-text-field prepend-inner-icon="mdi-magnify" name="searchCars" label="Pesquisar Carros"
                            id="searchCars" variant="solo-filled" v-model="searchCars"></v-text-field>

                        <v-btn color="success" variant="tonal"><v-icon size="x-large">mdi-car</v-icon><v-icon
                                size="x-large">mdi-plus</v-icon></v-btn>

                        <v-data-table v-model:items="this.championship.carsList" :headers="this.carHeaders"
                            :search="this.searchCars" items-per-page-text="Carros por página" :hover="true"
                            :hide-no-data="true">
                            <template v-slot:[`item.actions`]="{ item }">
                                <v-btn variant="text" color="warning"
                                    @click="this.edit(item)"><v-icon>mdi-pencil</v-icon></v-btn>
                            </template>
                        </v-data-table>

                    </v-card>
                    <br>
                    <v-divider thickness="5" color="blue"></v-divider>
                    <br>
                    <v-card class="pa-1 elevation-24" variant="outlined">
                        <v-card-subtitle class="text-center">
                            <h2>Confrontos Iniciais</h2>
                        </v-card-subtitle>
                        <br>
                        <v-card-actions>
                            <v-btn color="success" variant="tonal"><v-icon size="x-large">mdi-controller</v-icon><v-icon
                                    size="x-large">mdi-plus</v-icon></v-btn>

                            <v-btn color="success" variant="tonal">Sortear</v-btn>
                        </v-card-actions>

                        <v-data-table v-model:items="this.championship.clashsList" :headers="this.clashsHeaders"
                            items-per-page-text="Confrontos por página" :hover="true" :hide-no-data="true">
                            <template v-slot:[`item.actions`]="{ item }">
                                <v-btn variant="text" color="warning"
                                    @click="this.edit(item)"><v-icon>mdi-pencil</v-icon></v-btn>
                            </template>
                        </v-data-table>
                    </v-card>
                </v-card>
                <v-card-actions class="d-flex flex-row-reverse">
                    <v-btn color="warning" @click="this.$emit('closeRegister')"><v-icon>mdi-keyboard-return</v-icon></v-btn>

                    <v-btn color="success">Salvar Alterações</v-btn>
                </v-card-actions>
            </v-card>
        </v-sheet>
    </v-dialog>
</template>

<script>
import { VDataTable } from 'vuetify/lib/labs/components.mjs'
import { inject } from 'vue'
export default {
    components: { VDataTable },
    setup() {
        const store = inject('userStore')
        store.methods.getCars();
        store.methods.getPilots();
        store.methods.getPlaces();
        store.methods.getChampionshipTypes()
        return {
            store
        }
    },
    data() {
        return {
            dialog: true,
            values: [10, 50],
            championship: {
                championshipAdmin: '',
                title: null,
                minPilots: 0,
                maxPilots: 0,
                startDate: null,
                endDate: null,
                championshipType: null,
                place: null,
                carsList: [],
                clashsList: []
            },
            carHeaders: [
                { title: 'Modelo', key: 'model' },
                { title: 'Apelido', key: 'nickname' },
                { title: 'Ano', key: 'year' },
                { title: 'Piloto', key: 'pilot.nickname' },
                { title: 'Preparador', key: 'preparer.nickname' },
                { title: 'Ações', key: 'actions', sortable: false },

            ],
            clashsHeaders: [
                { title: 'Adversário', key: 'car1.model' },
                { title: 'Apelido', key: 'car1.nickname' },
                { title: 'Piloto', key: 'car1.pilot.name' },
                { title: 'X', value: 'X', sortable: false },
                { title: 'Adversário', key: 'car2.model' },
                { title: 'Apelido', key: 'car2.nickname' },
                { title: 'Piloto', key: 'car2.pilot.name' },

                { title: 'Ações', key: 'actions', sortable: false },

            ],
            searchCars: ''

        }
    },
    async beforeMount() {
        const tokenStore = {
            token: localStorage.getItem('token')
        }

        await fetch('http://localhost:8081/User/find-by-token', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(tokenStore)
        }).then(res => {
            if (res.status === 200) {
                res.json().then(data => {
                    this.championship.championshipAdmin = data;
                    console.log(this.championship.championshipAdmin);
                })
            }
        })
    }
}

</script>