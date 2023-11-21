<template>
    <v-container class="h-100 d-flex flex-column">
        <v-card variant="tonal" color="deep-purple-darken-1" class="rounded-x" width="100%">
            <v-card-subtitle>
                Filtros
            </v-card-subtitle>
            <v-card class="d-flex flex-column pa-2">
                <v-row>
                    <v-col>
                        <v-text-field theme="dark" clearable variant="solo-filled" name="name" label="Nome do piloto"
                            id="name" v-model="name" :rules="[v => !!v || 'Nome inválido']"></v-text-field>

                        <v-text-field class="w-100" theme="dark" clearable variant="solo-filled" name="nickname"
                            label="Apelido" id="nickname" v-model="nickname"
                            :rules="[v => !!v || 'Apelido inválido']"></v-text-field>

                        <v-select clearable label='Estado de atuação do piloto'
                            :items="['PR', 'SP', 'SC', 'RS', 'MS', 'RO', 'AC', 'AM', 'RR', 'PA', 'TO', 'MA', 'RN', 'PB', 'PE', 'AL', 'SE', 'BA', 'MG', 'RJ', 'MT', 'GO', 'DF', 'PI', 'CE', 'ES']"
                            variant='solo-filled' theme="dark" v-model="uf"
                            :rules="[v => !!v || 'selecione um estado']"></v-select>
                    </v-col>
                    <v-col>

                        <v-text-field theme="dark" clearable variant="solo-filled" name="name" label="CPF" id="cpf"
                            v-model="document" v-mask="['###.###.###-##']"
                            :rules="[v => !!v || 'CPF inválido']"></v-text-field>

                        <v-select variant="solo-filled" placeholder="Equipe do piloto"
                            :rules="[v => !!v || 'Selecione uma equipe']" theme="dark" clearable="" :items="this.teams"
                            item-title="name" v-model="this.team" return-object>
                        </v-select>
                    </v-col>
                </v-row>
            </v-card>

            <v-card-actions class="d-flex flex-column">
                <v-btn variant="tonal" class="w-100" color="success" @click="this.filter"><v-icon start size="x-large">
                        mdi-account-search
                    </v-icon>Buscar</v-btn>
            </v-card-actions>
            <v-card>
                <v-table class="table font-h6 " max-height="500px" fixed-header>
                    <thead class="font-weight-bold text-h6">
                        <tr>
                            <th class="text-justfy">
                                Nome
                            </th>
                            <th class="text-justfy">
                                Apelido
                            </th>
                            <th class="text-center">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody font-weight-bold class="text-justfy">
                        <tr v-for="pilot in pilots" :key="pilot.id">
                            <td>{{ pilot.name }}</td>
                            <td>{{ pilot.nickname }}</td>
                            <td class="text-center">
                                <v-btn variant="text" color="error" @click="this.edit(pilot)">Editar</v-btn>
                            </td>
                        </tr>
                    </tbody>
                    <Message :infoMessage="this.infoMessage" v-if="this.showMessage"
                        @closeMessageDialog="this.showMessage = false" />
                </v-table>
            </v-card>
            <v-card-item>
                <v-btn variant="text" color="success" @click="this.showRegister = true"><v-icon size="x-large">
                        mdi-account-plus</v-icon></v-btn>
            </v-card-item>
        </v-card>
        <Message :infoMessage="this.infoMessage" v-if="this.showMessage" @closeMessageDialog="this.showMessage = false" />
        <ChampionshipAdministratorPilotsEditVue :teams="this.teams" :pilotToEdit="this.selectedPilot" v-if="this.showEditDialog" @closeEditDialog="this.showEditDialog = false, this.pilots = null" />
        <ChampionshipAdministratorPilotsRegisterVue v-if="this.showRegister"
            @closeRegisterDialog="this.showRegister = false, this.pilots = null" />
    </v-container>
</template>

<script>
import { mask } from 'vue-the-mask'
import Message from '@/components/dialogs/Message.vue';
import PilotsTableVue from '@/components/tables/pilots/PilotsTable.vue';
import ChampionshipAdministratorPilotsEditVue from './ChampionshipAdministratorPilotsEdit.vue';
import ChampionshipAdministratorPilotsRegisterVue from './ChampionshipAdministratorPilotsRegister.vue';

export default {
    components: { Message, PilotsTableVue, ChampionshipAdministratorPilotsEditVue, ChampionshipAdministratorPilotsRegisterVue },
    data() {
        return {
            name: null,
            nickname: null,
            uf: null,
            document: null,
            team: null,

            //selects field
            teams: [],
            //dialogs fields
            showMessage: false,
            infoMessage: '',
            showEditDialog: false,
            showRegister: false,
            selectedPilot:{},
            //table
            pilots: []
        }
    },
    methods: {
        async getTeams() {
            await fetch('http://localhost:8081/teams', {
                method: 'GET',
                headers: { 'Content-type': 'application/json' },
            }).then(res => res.json().then(data => {
                this.teams = data;
            })).catch(res => {
                this.infoMessage = 'Erro ao carregar equipes'
                this.showMessage = true;
            })
        },
        async filter() {
            if (this.name == null && this.nickname == null && this.document == null && this.uf == null && this.team == null) {
                this.infoMessage = 'Preencha ao menos um dos filtros acima'
                this.showMessage = true
            } else {
                var stringToFetch = 'http://localhost:8081/Pilot/pilot-filter?'
                var append = '&'
                if (this.name != null) {
                    stringToFetch = stringToFetch + 'name=' + this.name + append
                }
                if (this.nickname != null) {
                    stringToFetch = stringToFetch + 'nickname=' + this.nickname + append
                }
                if (this.uf != null) {
                    stringToFetch = stringToFetch + 'uf=' + this.uf + append
                }
                if (this.document != null) {
                    stringToFetch = stringToFetch + 'document=' + this.document + append
                }
                if (this.team != null) {




                    stringToFetch = stringToFetch + 'team=' + this.team.id + append
                }

                await fetch(stringToFetch, {
                    method: 'GET',
                    headers: { 'Content-type': 'application/json' },
                }).then(res => {
                    if (res.status === 200) {
                        res.json().then(data => {
                            this.pilots = data;
                        })
                    } else {
                        res.json().then(data => {
                            this.infoMessage = data.message;
                            this.showMessage = true;
                            this.pilots = null;

                        })
                    }
                }).catch(res => {
                    this.infoMessage = 'Sua pesquisa não retornou resultados'
                    this.showMessage = true;
                    this.pilots = null;
                })
            }

        },
        edit(selectedPilot) {
            this.selectedPilot = selectedPilot;
            this.showEditDialog = true;
        }
    },
    beforeMount() {
        this.getTeams();

    },
    directives: {
        mask
    }
}


</script>