<template>
    <v-dialog v-if="showEditDialogView" activator="parent" persistent class="w-auto h-auto " max-width="60%">
        <v-card class="pa-6 d-flex flex-column rounded-xl" theme="dark">
            <v-card-title>
                <h1>Dados da Equipe</h1>
            </v-card-title>
            <v-sheet class="pa-6">
                <v-form ref="form">
                    <v-text-field variant="solo-filled" label="Nome da Equipe" v-model="this.teamEdit.name"></v-text-field>
                    <v-text-field variant="solo-filled" label="E-mail" v-model="this.teamEdit.email"></v-text-field>
                    <v-text-field v-mask="['(##)#####-####']" variant="solo-filled" label="Telefone"
                        v-model="this.teamEdit.phone"></v-text-field>
                    <v-text-field v-mask="['###.###.###-##']" variant="solo-filled" label="Documento do Responsável"
                        v-model="this.teamEdit.document"></v-text-field>
                    <v-text-field variant="solo-filled" label="Data de Ingresso"
                        v-model="this.teamEdit.registerDate"></v-text-field>
                    <v-select clearable label='Estado'
                        :items="['PR', 'SP', 'SC', 'RS', 'MS', 'RO', 'AC', 'AM', 'RR', 'PA', 'TO', 'MA', 'RN', 'PB', 'PE', 'AL', 'SE', 'BA', 'MG', 'RJ', 'MT', 'GO', 'DF', 'PI', 'CE', 'ES']"
                        variant='solo-filled' v-model="this.teamEdit.uf"></v-select>

                </v-form>
            </v-sheet>
            <v-card-title>
                <h1>Pilotos</h1>
            </v-card-title>
            <v-sheet class="pa-6 " theme="dark">
                <PilotsTable :pilotsList="this.pilots" @updateList="this.getTeamPilots" />
                <br>
                <v-btn variant="text" color="success" @click="this.showChoose = true">Adicionar <v-icon icon="mdi-plus"
                        size="large"></v-icon></v-btn>
            </v-sheet>

            <ChooseUser v-if="this.showChoose" @returnChooseDialog="this.returnChooseDialog"
                @selectClosed="this.selectClosed" @closeChooseDialog="this.showChoose = false" />

            <v-card-actions class="d-flex flex-row-reverse">
                <v-btn variant="text" @click="saveChanges(this.pilots)" color="success">Salvar alterações</v-btn>
                <v-btn variant="text" @click="$emit('closeEditDialog')"
                    color="warning"><v-icon>mdi-keyboard-return</v-icon></v-btn>
                <v-btn variant="text" color="error" @click="this.deleteTeam"><v-icon
                        size="x-large">mdi-delete</v-icon></v-btn>
            </v-card-actions>
        </v-card>
        <Message v-if="this.showMessage" @closeMessageDialog="this.showMessage = false" :infoMessage="this.infoMessage" />
    </v-dialog>
</template>
<script>
import ChooseUser from '@/components/chooseUser/ChooseUser.vue'
import PilotsTable from '@/components/tables/pilots/PilotsTable.vue'
import PreparerTable from '@/components/tables/preparers/PreparerTable.vue'
import Message from '@/components/dialogs/Message.vue'
import { mask } from 'vue-the-mask'
import { ref, inject } from 'vue'



export default {
    props: ['team'],
    components: { ChooseUser, PilotsTable, PreparerTable, Message },

    setup() {
        const userStore = inject('userStore')
        return {
            userStore
        }

    },

    data() {
        return {
            teamEdit: {},
            showChoose: false,
            users: [],
            pilots: [],
            tab: null,
            showEditDialogView: true,
            showMessage: false,
            infoMessage: ''
        }
    },
    methods: {
        async getTeamPilots() {
            var teamToSearch = {
                id: this.teamEdit.id,
                name: this.teamEdit.name,
                document: this.teamEdit.document,
                email: this.teamEdit.email,
                registerDate: this.teamEdit.registerDate,
                password: this.teamEdit.password,
                phone: this.teamEdit.phone,
                userType: this.teamEdit.userType,
                uf: this.teamEdit.uf
            }

            await fetch('http://localhost:8081/Pilot/find-team-pilots', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(teamToSearch)
            }).then(res => res.json())
                .then(data => {
                    this.pilots = data;
                }).catch(res => {
                    this.infoMessage = 'Não foi possível localizar os pilotos'
                    this.showMessage
                });
        },
        returnChooseDialog() {
            this.showChoose = false;
            localStorage.setItem('chooseUser', null)
        },
        selectClosed() {
            var storageUser = JSON.parse(localStorage.getItem('chooseUser'))
            if (storageUser != null) {
                var findExistentPilot = false;
                for (var i = 0; i < this.pilots.length; i++) {
                    if (storageUser.id == this.pilots.at(i).id) {
                        findExistentPilot = true;
                    }
                }
                if (findExistentPilot == false) {
                    this.pilots.push(storageUser)
                    localStorage.setItem('chooseUser', null)
                } else {
                    this.infoMessage = "piloto já vinculado na equipe"
                    this.showMessage = true;
                }



            }

        },
        async putPilot(pilot) {
            var teamToSearch = {
                id: this.teamEdit.id,
                name: this.teamEdit.name,
                document: this.teamEdit.document,
                email: this.teamEdit.email,
                registerDate: this.teamEdit.registerDate,
                password: this.teamEdit.password,
                phone: this.teamEdit.phone,
                userType: this.teamEdit.userType,
                uf: this.teamEdit.uf
            }
            pilot.team = teamToSearch;
            await fetch('http://localhost:8081/Pilot/' + pilot.id, {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(pilot)
            }).then(res => {
                if (res.status === 200) {
                    this.userStore.methods.getTeams();
                    this.userStore.methods.getPilots();


                }
            })
        },
        async excludepilot(pilot) {
            pilot.team = null;
            await fetch('http://localhost:8081/Pilot/' + pilot.id, {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(pilot)
            }).then(res => {
                if (res.status === 200) {
                    this.userStore.methods.getTeams();
                    this.userStore.methods.getPilots();
                }
            })
        },
        saveChanges(pilots) {
            for (var i = 0; i < pilots.length; i++) {
                console.log(this.putPilot(pilots.at(i)))
            }
            this.editTeam();
            this.infoMessage = 'Alterações salvas com sucesso!'
            this.showMessage = true;
            this.userStore.methods.getTeams();
            this.userStore.methods.getPilots(); setTimeout(() => {
                this.$emit('closeEditDialog')
            }, 1000);

        },
        async editTeam() {
            await fetch('http://localhost:8081/User/' + this.teamEdit.id, {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(this.teamEdit)
            }).then(res => {
                if (res.status === 200) {
                    console.log('ok')
                }
            })
        },
        async deleteTeam() {
            await fetch('http://localhost:8081/User/' + this.teamEdit.id, {

                method: 'DELETE',
                headers: { 'Content-type': 'application/json' },
            }).then(res => {
                if (res.status === 200) {
                    this.infoMessage = 'Equipe Deletada'
                    this.showMessage = true;
                    this.userStore.methods.getTeams();
                    this.userStore.methods.getPilots();                    setTimeout(() => {
                        this.$emit('closeEditDialog')
                    }, 1000);


                } else {
                    this.infoMessage = 'Essa equipe possui vínculos.\nCorte os vínculos e tente novamente'
                    this.showMessage = true
                }

            }).catch(res => {
                this.infoMessage = 'Erro ao deletar equipe, tente novamente mais tarde'
                this.showMessage = true;
            })
        }
    },
    reset() {
        this.$refs.form.reset()
    },

    beforeMount() {
        this.teamEdit = this.team;
        this.getTeamPilots();
    },
    directives: {
        mask
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