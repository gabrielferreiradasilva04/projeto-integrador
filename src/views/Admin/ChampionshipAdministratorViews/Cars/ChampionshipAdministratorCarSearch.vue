<template>
    <v-container class="h-100 d-flex flex-column">
        <v-card variant="tonal" color="light-blue-darken-2" class="rounded-x" width="100%">
            <v-card-subtitle>
                <h3>Filtros</h3>
            </v-card-subtitle>
            <v-card class="d-flex flex-column pa-2">
                <v-form ref="form">
                    <v-row>
                        <v-col>
                            <v-text-field name="model" label="Modelo" id="model" v-model="this.model"
                                variant="solo-filled"></v-text-field>
                            <v-text-field variant="solo-filled" name="year" label="Ano" id="year" v-model="this.year"
                                v-mask="'####'"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field clearable name="nickname" label="Apelido" id="nickname" v-model="this.nickname"
                                variant="solo-filled"></v-text-field>
                            <v-select :items="this.carStore.state.pilotsList" item-title="name" v-model="pilot"
                                label="Piloto" variant="solo-filled" return-object></v-select>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card>
            <v-card-actions>
                <v-btn variant="tonal" class="w-100" color="success" @click="this.filter"><v-icon start size="x-large">
                        mdi-account-search
                    </v-icon>Buscar</v-btn>
            </v-card-actions>
            <v-card variant="text">
                <v-table class="table font-h6 " max-height="500px" fixed-header>
                    <thead>
                        <tr>
                            <th class="text-center">
                                Modelo
                            </th>
                            <th class="text-center">
                                Apelido
                            </th>
                            <th class="text-center">
                                Ano
                            </th>
                            <th class="text-center">
                                Piloto
                            </th>
                            <th class="text-center">
                                Preparador
                            </th>
                            <th class="text-center">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody font-weight-bold class="text-center">
                        <tr v-for="car in carsList" :key="car.id">
                            <td>{{ car.model }}</td>
                            <td>{{ car.nickname }}</td>
                            <td>{{ car.year }}</td>
                            <td>{{ car.pilot.niakname }}</td>
                            <td>{{ car.preparer.nickname }}</td>
                            <td>
                                <v-btn variant="text" color="warning" @click="this.edit(team)">Editar</v-btn>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card>
            <v-card-actions>
                <v-btn variant="text" color="success" @click="this.showRegister = true"><v-icon size="x-large">
                        mdi-car-2-plus</v-icon></v-btn>
            </v-card-actions>
            <championship-administrator-car-register-vue v-if="this.showRegister" @closeRegister="this.registerClosed" />
            <Message :infoMessage="this.infoMessage" v-if="this.showMessage" @closeMessageDialog="this.showMessage = false" />
        </v-card>
    </v-container>
</template>

<script>
import { mask } from 'vue-the-mask'
import { inject } from 'vue'
import ChampionshipAdministratorCarRegisterVue from './ChampionshipAdministratorCarRegister.vue'

import Message from '@/components/dialogs/Message.vue'

export default {
    components: { ChampionshipAdministratorCarRegisterVue, Message },
    directives: {
        mask
    },
    setup() {
        const carStore = inject('userStore');
        carStore.methods.getCars();
        carStore.methods.getPilots();
        return {
            carStore,
        }
    },
    data() {
        return {
            model: null,
            nickname: null,
            year: null,
            pilot: null,
            preparer: null,
            showRegister: false,
            carsList: [],
            infoMessage: '',
            showMessage:false

        }
    },
    methods: {
        registerClosed() {
            this.showRegister = false;
            this.carsList = [];
        },
        async filter() {
            if (this.model == null && this.nickname == null && this.year == null && this.preparer == null && this.pilot == null) {
                this.infoMessage = 'Preencha ao menos um dos filtros acima'
                this.showMessage = true
            } else {
                var stringToFetch = 'http://localhost:8081/Car/car-filter?'
                var append = '&'
                if (this.nickname != null) {
                    stringToFetch = stringToFetch + 'nickname=' + this.nickname + append
                }
                if (this.model != null) {
                    stringToFetch = stringToFetch + 'model=' + this.model + append
                }
                if (this.year > null) {
                    stringToFetch = stringToFetch + 'year=' + this.year + append
                }
                if (this.pilot != null) {
                    stringToFetch = stringToFetch + 'pilot=' + this.pilot.id + append
                }
                if (this.preparer != null) {
                    stringToFetch = stringToFetch + 'preparer=' + this.preparer + append
                }

                await fetch(stringToFetch, {
                    method: 'GET',
                    headers: { 'Content-type': 'application/json' },
                }).then(res => {
                    if (res.status === 200) {
                        res.json().then(data => {
                            this.carsList = data;
                            this.reset()
                        })
                    } 
                    if(res.status === 404){
                        res.json().then(data =>{
                            this.infoMessage = data.message;
                            this.showMessage = true;
                            this.carsList = [];
                        })
                    }
                    if(res.status === 500){
                        this.infoMessage = 'Estamos com problemas internos, tente novamente mais tarde'
                        this.showMessage = true;
                    }
                }).catch(res => {
                    this.infoMessage = 'Sua pesquisa não retornou resultados';
                    this.showMessage = true;
                    this.pilots = null;
                    this.reset();
                    this.carsList = [];
                })
            }

        }, 
        reset() {
            this.$refs.form.reset()
        },
    }
}

</script>