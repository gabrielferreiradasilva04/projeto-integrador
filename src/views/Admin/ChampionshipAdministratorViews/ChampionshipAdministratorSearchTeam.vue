<template>
    <v-card class="pa-6 rounded-0 h-auto w-auto"  theme="dark" variant="text">
            <v-card class=" w-auto pa-6 rounded-xl">
                <v-text-field theme="dark" clearable  variant="solo-filled"  name="name" label="Nome da Equipe" id="teamName"
                    v-model="nameTofind"></v-text-field>
                <v-btn variant="text" color="success" @click="this.search">
                    Pesquisar
                </v-btn>
            </v-card>
            <br>
            <v-sheet class="pa-3 rounded-xl w-auto" elevation="12" theme="dark">

                <v-table class="table" height="auto" density="compact" theme="dark" :fixed-header=true>
                    <thead class="font-weight-bold text-h6">
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
                                <v-btn variant="text" color="warning" @click="this.edit(team)">Editar</v-btn>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </v-sheet>
    </v-card>
    <!--Componente de mensagem-->
    <Message :infoMessage="this.infoMessage" v-if="showMessage" @closeMessageDialog="this.showMessage = false" />
    <championship-administrator-team-edit-vue :team="this.teamToEdit" v-if="showEditDialog" @closeEditDialog="this.showEditDialog = false" />

</template>
<script>
import Message from '@/components/dialogs/Message.vue'
import ChampionshipAdministratorTeamEditVue from './ChampionshipAdministratorTeamEdit.vue'
export default {
    components: { Message, ChampionshipAdministratorTeamEditVue },
    data() {
        return {
            teams: [],
            nameTofind: "",

            //dialog
            infoMessage: '',
            showMessage: false,
            showEditDialog: false,
            teamToEdit:{}
        }
    },
    methods: {
        async search() {
            var name = this.nameTofind
            await fetch('http://localhost:8081/teams/' + name, {
                method: 'GET',
                headers: { 'Content-type': 'application/json' },
            }).then(res => {
                if (res.status === 200) {
                    res.json().then(data => {
                        this.teams = data;
                    })
                }
                if (res.status != 200) {
                    res.json().then(data => {
                        this.infoMessage = data.message;
                        this.showMessage = true;
                    })
                }
            }).catch(res => {
                this.infoMessage = "Preencha o campo: Nome da Equipe"
                this.showMessage = true;
            })
        },
        edit(teamSelected) {
            this.teamToEdit = teamSelected;
            this.showEditDialog = true;
        }
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