<template>
    <v-dialog v-model="this.dialog" class="h-auto w-auto" max-width="60%" persistent>
        <v-card class="d-flex flex-column pa-6 rounded-xl">
            <v-card-title>
                <h1>Cadastro de Pilotos</h1>
            </v-card-title>
            <v-card>
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
                        clearable="" :items="this.teams" item-title="name">
                    </v-select>
                    <v-card-item class="d-flex flex-row-reverse">
                        <v-btn variant="text" color="warning"
                            @click="$emit('closeRegisterDialog')"><v-icon>mdi-keyboard-return</v-icon></v-btn>

                        <v-btn @click="this.reset" color="warning" variant="text">
                            Limpar Campos
                        </v-btn>
                        <v-btn @click="this.validate" variant="text" color="success">
                            Concluir
                        </v-btn>

                    </v-card-item>

                </v-form>

            </v-card>
            <Message :infoMessage="this.infoMessage" v-if="this.showMessage"
                @closeMessageDialog="this.showMessage = false" />
        </v-card>
    </v-dialog>
</template>

<script>
import Message from '@/components/dialogs/Message.vue';
import { mask } from 'vue-the-mask'


export default {
    components: { Message },
    data() {
        return {
            nameRules: [
                v => !!v || 'Campo obrigatório',
            ],
            pilot: {
                id: null,
                name: null,
                nickname: null,
                document: null,
                team: null,
                uf: null
            },
            teams: [],
            showMessage: false,
            infoMessage: '',
            dialog: true,
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
        async validate() {

            const { valid } = await this.$refs.form.validate()

            if (valid) {
                /** habilitando a possibilidade de adicionar um piloto sem uma equipe */
                var teamToadd = {};
                if (this.pilot.team != null) {
                    teamToadd = {
                        id: this.pilot.team.id,
                        name: this.pilot.team.name,
                        document: this.pilot.team.document,
                        phone: this.pilot.team.phone,
                        email: this.pilot.team.email,
                        uf: this.pilot.team.uf,
                        userType: this.pilot.team.userType,
                    }
                } else {
                     teamToadd = null;
                }
                this.pilot.team = teamToadd;

                var pilotJson = JSON.stringify(this.pilot);

                await fetch('http://localhost:8081/Pilot', {
                    method: 'POST',
                    headers: { 'Content-type': 'application/json' },
                    body: pilotJson
                }).then(res => {
                    if (res.status === 201) {
                        res.json().then(data => {
                            this.infoMessage = 'Cadastro realizado com sucesso!';
                            this.showMessage = true;
                            setTimeout(() => {
                                this.$emit('closeRegisterDialog');
                            }, 1000);
                        })
                    }
                    if(res.status === 404){
                        res.json().then(data => {
                            this.infoMessage = data.message;
                            this.showMessage = true;
                        })
                    }
                }).catch(res => {
                    this.infoMessage = "Erro ao realizar cadastro, tente novamente mais tarde"
                    this.showMessage = true;
                })
            }
        },
        reset() {
            this.$refs.form.reset()
        },


    },
    beforeMount() {
        this.getTeams();
    },
    directives: {
        mask
    }

}
</script>