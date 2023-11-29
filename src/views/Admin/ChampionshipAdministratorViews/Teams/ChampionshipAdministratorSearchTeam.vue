<template>
    <v-container class="h-100 d-flex flex-column">
        <v-card variant="tonal" color="light-blue-darken-2" class="rounded-x" width="100%">
            <v-card-subtitle>
                <h3>Filtros</h3>
            </v-card-subtitle>
            <v-card  card class="pa-2">
                <v-form ref="form">
                    <v-row>
                        <v-col>
                            <v-text-field theme="dark" clearable variant="solo-filled" name="name"
                                label="Nome do Usuário/Equipe" id="teamName" v-model="name"></v-text-field>

                            <v-text-field class="w-100" theme="dark" clearable variant="solo-filled" name="phone"
                                label="Telefone" id="phone" v-model="phone" v-mask="['(##)#####-####']"></v-text-field>

                            <v-select clearable label='Estado'
                                :items="['PR', 'SP', 'SC', 'RS', 'MS', 'RO', 'AC', 'AM', 'RR', 'PA', 'TO', 'MA', 'RN', 'PB', 'PE', 'AL', 'SE', 'BA', 'MG', 'RJ', 'MT', 'GO', 'DF', 'PI', 'CE', 'ES']"
                                variant='solo-filled' v-model="uf"></v-select>
                        </v-col>
                        <v-col>
                            <v-text-field theme="dark" clearable variant="solo-filled" name="email" label="E-mail" id="email"
                                v-model="email"></v-text-field>

                            <v-text-field theme="dark" clearable variant="solo-filled" name="cpf" label="CPF" id="cpf"
                                v-model="document" v-mask="['###.###.###-##']"></v-text-field>

                        </v-col>

                    </v-row>
                </v-form>


            </v-card>
            <v-card-actions class="d-flex flex-column">
                <v-btn variant="tonal" class="w-100" color="success" @click="this.filter"><v-icon start size="x-large">
                        mdi-account-search
                    </v-icon>Buscar</v-btn>
            </v-card-actions>
            <br>
            <v-card>
                <v-table class="table font-h6 " max-height="500px" fixed-header>
                    <thead>
                        <tr>
                            <th class="text-center">
                                Nome da Equipe
                            </th>
                            <th class="text-center">
                                E-mail da Equipe
                            </th>
                            <th class="text-center">
                                Telefone de Contato
                            </th>
                            <th class="text-center">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody font-weight-bold class="text-center">
                        <tr v-for="team in teams" :key="team.id">
                            <td>{{ team.name }}</td>
                            <td>{{ team.email }}</td>
                            <td>{{ team.phone }}</td>
                            <td>
                                <v-btn variant="text" color="warning" @click="this.edit(team)"><v-icon>mdi-pencil</v-icon></v-btn>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card>
            <v-card-item>
                <v-btn variant="text" color="success" @click="this.showRegisterDialog = true"><v-icon size="x-large">
                        mdi-account-plus</v-icon></v-btn>
                <v-btn variant="text" color="success" @click="this.filter"><v-icon size="x-large">
                        mdi-update</v-icon></v-btn>
            </v-card-item>
        </v-card>
        <!--Componente de mensagem-->
        <Message :infoMessage="this.infoMessage" v-if="showMessage" @closeMessageDialog="this.showMessage = false" />
        <championship-administrator-team-edit-vue :team="this.teamToEdit" v-if="showEditDialog"
            @closeEditDialog="this.showEditDialog = false, this.teams = null" />
        <ChampionshipAdministratorRegisterViewVue v-if="this.showRegisterDialog"
            @closeRegisterDialog="this.closeRegisterDialogMethod" />
    </v-container>
</template>
<script>
import Message from '@/components/dialogs/Message.vue'
import ChampionshipAdministratorTeamEditVue from './ChampionshipAdministratorTeamEdit.vue'
import ChampionshipAdministratorRegisterViewVue from './ChampionshipAdministratorRegisterView.vue'
import { mask } from 'vue-the-mask'

export default {
    components: { Message, ChampionshipAdministratorTeamEditVue, ChampionshipAdministratorRegisterViewVue },
    data() {
        return {
            teams: [],
            nameTofind: "",

            //dialog
            infoMessage: '',
            showMessage: false,
            showEditDialog: false,
            teamToEdit: {},
            showRegisterDialog: false,
            //fields to filter
            name: null,
            email: null,
            phone: null,
            document: null,
            uf: null
        }
    },
    methods: {
        async filter() {
            if (this.name == null && this.email == null && this.phone == null && this.document == null && this.uf == null) {
                this.infoMessage = 'Preencha ao menos um dos filtros acima'
                this.showMessage = true
            } else {
                var stringToFetch = 'http://localhost:8081/User/user-filter?userType=TEAM&'
                var append = '&'
                if (this.name != null) {
                    stringToFetch = stringToFetch + 'name=' + this.name + append
                }
                if (this.email != null) {
                    stringToFetch = stringToFetch + 'email=' + this.email + append
                }
                if (this.phone != null) {
                    stringToFetch = stringToFetch + 'phone=' + this.phone + append
                }
                if (this.document != null) {
                    stringToFetch = stringToFetch + 'document=' + this.document + append
                }
                if (this.uf != null) {
                    stringToFetch = stringToFetch + 'uf=' + this.uf + append
                }

                await fetch(stringToFetch, {
                    method: 'GET',
                    headers: { 'Content-type': 'application/json' },
                }).then(res => {
                    if (res.status === 200) {
                        res.json().then(data => {
                            this.teams = data;
                            this.reset()
                        })
                    } else {
                        this.infoMessage = 'Sua pesquisa com esses filtros não retornou resultados'
                        this.showMessage = true;
                        this.teams = null;
                        this.reset()

                    }
                }).catch(res => {
                    this.infoMessage = 'Erro ao realizar busca, tente novamente mais tarde'
                    this.showMessage = true;
                    this.teams = null;
                    this.reset()

                })
            }

        },
        edit(selectedTeam) {
            this.teamToEdit = selectedTeam;
            this.showEditDialog = true;
        },
        closeRegisterDialogMethod() {
            this.showRegisterDialog = false;
            this.teams = [];
        },
        closeEditDialogMethod() {
            this.showEditDialog = false;
            this.teams = [];
        },
        reset() {
            this.$refs.form.reset()
        },
    },
    directives: {
        mask
    }

}
</script>

<style scoped>
.main {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.form-search {
    width: 30%;
}

.title {
    padding-left: 20px;
}

h1 {
    font-size: 25px;
}
</style>