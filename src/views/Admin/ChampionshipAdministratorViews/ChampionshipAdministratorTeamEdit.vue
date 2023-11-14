<template>
    <body>
        <div class="main">
            <v-sheet width="30%" class="pa-3 rounded-xl" elevation="24" theme="dark">
                <div class="title ">
                    <h1>Dados da Equipe</h1>
                </div>
                <v-form class="align-center">
                    <v-text-field label="Nome da Equipe" v-model="this.team.name"></v-text-field>
                    <v-text-field label="E-mail" v-model="this.team.email"></v-text-field>
                    <v-text-field label="Telefone" v-model="this.team.phone"></v-text-field>
                    <v-text-field label="Documento do Responsável" v-model="this.team.document"></v-text-field>
                    <v-text-field label="Data de Ingresso" v-model="this.team.registerDate"></v-text-field>

                </v-form>
            </v-sheet>
            <v-sheet width="50%" class="pa-3 rounded-xl" elevation="24" theme="dark">
                <div class="title">
                    <h1>Membros</h1>
                </div>
                <v-card>
                    <v-tabs v-model="tab" bg-color="blue-darken-4">
                        <v-tab value="one">Pilotos</v-tab>
                    </v-tabs>
                    <v-card-text>
                        <v-window v-model="tab">
                            <v-window-item value="one">
                                <PilotsTable :pilotsList="this.pilots" />
                                <div class="add-member">
                                    <v-btn variant="text" color="success" @click="this.showChoose = true">Adicionar <v-icon
                                            icon="mdi-plus" size="large"></v-icon></v-btn>
                                </div>
                            </v-window-item>



                        </v-window>
                    </v-card-text>
                </v-card>

            </v-sheet>
            <ChooseUser v-if="this.showChoose"
            @closeMessageDialog="this.showChoose = false"
            @selectClose="this.selectClosed" />



        </div>
        <div class="button-box">
            <v-btn color="success">Salvar alterações</v-btn>
            <v-btn color="warning">Retornar</v-btn>
        </div>
    </body>
</template>
<script>
import ChooseUser from '@/components/chooseUser/ChooseUser.vue'
import PilotsTable from '@/components/tables/pilots/PilotsTable.vue'
import PreparerTable from '@/components/tables/preparers/PreparerTable.vue'


export default {
    components: { ChooseUser, PilotsTable, PreparerTable },
    data() {
        return {
            team: {},
            showChoose: false,
            users: [],
            pilots: [],
            tab: null,
        }
    },
    methods: {
        async getTeam() {
            await fetch('http://localhost:8081/User/' + this.$route.params.id)
                .then(res => res.json())
                .then(data => {
                    this.team = data;
                    console.log(this.team)
                })
            this.getTeamPilots();
        },
        async getUsers() {
            await fetch('http://localhost:8081/User', {
                method: 'GET',
                headers: { 'Content-type': 'application/json' },
            }).then(res => res.json())
                .then(data => {
                    this.users = data;
                }).catch(res => {
                    alert("Não foi possível concluir a busca")
                });
        },
        async getTeamPilots() {
            var teamToSearch = {
                id: this.team.id,
                name: this.team.name,
                document: this.team.document,
                email: this.team.email,
                registerDate: this.team.registerDate,
                password: this.team.password,
                phone: this.team.phone,
                userType: this.team.userType,
                uf: this.team.uf
            }

            await fetch('http://localhost:8081/Pilot/find-team-pilots', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(teamToSearch)
            }).then(res => res.json())
                .then(data => {
                    this.pilots = data;
                    console.log(this.pilots)
                }).catch(res => {
                    alert("Não foi possível concluir a busca")
                });
        },

        selectClosed(){

                var storageUser = JSON.parse(localStorage.getItem('chooseUser'))
                this.pilots.push(storageUser);
                console.log(storageUser);
            
        }
    },

    beforeMount() {
        this.getTeam();
        this.getUsers();
    }
}

</script>

<style>
.main {
    padding-top: 30px;
    display: flex;
    gap: 50px;
    padding-left: 20px;
}

.button-box {
    align-items: center;
    padding: 20px;
    justify-content: baseline;
    display: flex;
    gap: 10px
}

.title {
    align-items: center;
    display: flex;
    justify-content: baseline;
    width: 100%;
}

.add-member {
    align-items: center;
    display: flex;
    justify-content: end;
}
</style>