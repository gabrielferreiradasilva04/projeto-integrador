<template>
    <v-dialog v-model="dialog" transition="dialog-transition" class="h-auto w-auto" max-width="60%" persistent>
        <v-card class="pa-6 rounded-xl">
            <v-card-title primary-title>
                <h1>Perfil do Piloto</h1>
            </v-card-title>
            <v-form ref="form">
                <v-text-field variant="solo-filled" v-model="pilot.name" :rules="nameRules" label="Nome"
                    required></v-text-field>

                <v-text-field variant="solo-filled" v-model="pilot.document" :rules="nameRules" label="CPF"
                    v-mask="['###.###.###-##']" required></v-text-field>

                <v-text-field variant="solo-filled" v-model="pilot.nickname" :rules="nameRules" label="Apelido"
                    required></v-text-field>

                <v-select variant="solo-filled" label="Estado de Atuação do Piloto" v-model="pilot.uf"
                    :rules="[v => !!v || 'Selecione um Estado']" clearable=""
                    :items="['PR', 'SP', 'SC', 'RS', 'MS', 'RO', 'AC', 'AM', 'RR', 'PA', 'TO', 'MA', 'RN', 'PB', 'PE', 'AL', 'SE', 'BA', 'MG', 'RJ', 'MT', 'GO', 'DF', 'PI', 'CE', 'ES']">
                </v-select>
                <v-select return-object variant="solo-filled" label="Equipe do piloto" v-model="this.pilot.team"
                    :rules="[v => !!v || 'Selecione uma equipe']" clearable="" :items="this.teams" item-title="name">
                </v-select>
            </v-form>
            <v-card-item class="d-flex flex-row-reverse">
                <v-btn variant="text" color="warning" @click="$emit('closeEditDialog')"
                    size="x-large"><v-icon>mdi-keyboard-return</v-icon></v-btn>

                <v-btn variant="text" color="error" @click="this.deletePilot"><v-icon
                        size="x-large">mdi-delete</v-icon></v-btn>

                <v-btn @click="this.reset()" color="warning" variant="text">
                    Limpar Campos
                </v-btn>
                <v-btn @click="this.edit" variant="text" color="success">
                    Salvar Alterações
                </v-btn>

            </v-card-item>
        </v-card>
        <Message :infoMessage="this.infoMessage" v-if="this.showMessage" @closeMessageDialog="this.showMessage = false" />
    </v-dialog>
</template>

<script>
import { mask } from 'vue-the-mask'
import Message from '@/components/dialogs/Message.vue'
import { ref, inject } from 'vue'


export default {
    components: { Message },
    props: ['pilotToEdit', 'teams'],
    setup() {

        const userStore = inject('userStore')
        userStore.methods.getTeams();
        return {
            userStore
        }

    },
    data() {
        return {
            nameRules: [
                v => !!v || 'Campo obrigatório',
            ],
            dialog: true,
            pilot: {},
            teamsToSearch: [],
            infoMessage: '',
            showMessage: false
        }
    },
    methods: {
        async edit() {
            /**
             * Habilitando a possibilidade de editar um piloto deixando ele sem equipe
             */
            var teamToSave = {};
            if (this.pilot.team != null) {
                teamToSave = {
                    id: this.pilot.team.id,
                    name: this.pilot.team.name,
                    document: this.pilot.team.document,
                    email: this.pilot.team.email,
                    registerDate: this.pilot.team.registerDate,
                    password: this.pilot.team.password,
                    phone: this.pilot.team.phone,
                    userType: this.pilot.team.userType,
                    uf: this.pilot.team.uf
                }

            } else {
                teamToSave = null;
            }
            this.pilot.team = teamToSave;
            await fetch('http://localhost:8081/Pilot/' + this.pilot.id, {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(this.pilot)
            }).then(res => {
                if (res.status === 200) {
                    this.infoMessage = 'Alterações salvas com sucesso';
                    this.showMessage = true;
                    setTimeout(() => {
                        this.userStore.getPilots();
                        this.$emit('closeEditDialog')
                    }, 1000);

                } else {
                    res.json().then(data => {
                        this.infoMessage = data.message;
                        this.showMessage = true;
                    })
                }
            }).catch(res => {
                this.infoMessage = 'Algo deu errado, tente novamente mais tarde'
                this.showMessage = true;
            })

        },
        async deletePilot() {
            await fetch('http://localhost:8081/Pilot/' + this.pilot.id, {
                method: 'DELETE',
                headers: { 'Content-type': 'application/json' },
            }).then(res => {
                if (res.status === 200) {
                    this.infoMessage = 'Piloto deletado com sucesso!'
                    this.showMessage = true;
                    setTimeout(() => {
                        this.userStore.getPilots();
                        this.$emit('closeEditDialog')
                    }, 1000);
                } else {
                    this.infoMessage = 'Erro do deletar Piloto'
                    this.showMessage = true;
                }
            }).catch(res => {
                this.infoMessage = 'Piloto registrado em uma equipe ou em uso.' + '/n' + 'Desvincule o piloto e tente novamente'
                this.showMessage = true;
            })
        },
        reset() {
            this.$refs.form.reset()
        }
    },
    beforeMount() {
        this.pilot = this.pilotToEdit;
        this.teamsToSearch = this.teams
    },
    directives: {
        mask
    }
}


</script>