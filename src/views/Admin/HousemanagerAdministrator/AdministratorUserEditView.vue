<template>
    <v-dialog v-model="showUserEdit" min-width="600px" max-width="700px" class="elevation-24">
        <v-card class="h-auto pa-6 rounded-xl elevation-12" variant="flat">
            <v-card-title>
                <h1>Perfil de Usuário</h1>
            </v-card-title>
            <v-card class="d-flex flex-column text-justfy" theme="dark">
                <v-card-text><v-icon size="x-large">mdi-identifier</v-icon> {{ user.id }}</v-card-text>
                <v-card-text><v-icon size="x-large">mdi-account</v-icon>{{ user.name }}</v-card-text>
                <v-card-text><v-icon size="x-large">mdi-email</v-icon>{{ user.email }}</v-card-text>
                <v-card-text><v-icon size="x-large">mdi-card-account-details</v-icon> {{ user.document }}</v-card-text>
                <v-card-text><v-icon size="x-large">mdi-calendar-range</v-icon> {{ user.registerDate }}</v-card-text>

                <v-text-field v-mask="['(##)#####-####']" v-model="user.phone" variant="outlined"><v-icon
                        size="x-large">mdi-phone</v-icon></v-text-field>


                <v-card class="" variant="text">

                    <select name="userType" id="userType" v-model="this.user.userType" @click="this.listenerUserType">
                        <option value="" disabled selected>Tipo do usuário</option>
                        <option value="CHAMPIONSHIPADMINISTRATOR">Administrador de Campeonatos</option>
                        <option value="HOUSEMANAGER">Administrador da Casa</option>
                        <option value="BETTOR">Apostador</option>
                        <option value="TEAM">Equipe</option>
                    </select>
                </v-card>
                <br>
                <v-card>
                    <select style="display: none;" name="userUF" id="userUF" v-model="this.user.uf">
                        <option value='' disabled selected>Estado de Administração</option>
                        <option value="PR">PR</option>
                        <option value="SP">SP</option>
                        <option value="SC">SC</option>
                        <option value="RS">RS</option>
                        <option value="MS">MS</option>
                        <option value="RO">RO</option>
                        <option value="AC">AC</option>
                        <option value="AM">AM</option>
                        <option value="RR">RR</option>
                        <option value="PA">AP</option>
                        <option value="TO">TO</option>
                        <option value="MA">MA</option>
                        <option value="RN">RN</option>
                        <option value="PB">PB</option>
                        <option value="PE">PE</option>
                        <option value="AL">AL</option>
                        <option value="SE">SE</option>
                        <option value="BA">BA</option>
                        <option value="MG">MG</option>
                        <option value="RJ">RJ</option>
                        <option value="MT">RJ</option>
                        <option value="GO">GO</option>
                        <option value="DF">DF</option>
                        <option value="PI">PI</option>
                        <option value="CE">CE</option>
                        <option value="ES">ES</option>
                    </select>
                </v-card>

                <br>
                <v-card class="d-flex flex-row-reverse" variant="flat">
                    <v-btn color="success" variant="text" @click="this.updateUser">Salvar alterações</v-btn>
                    <v-btn color="error" variant="text" @click="this.deleteUser">Deletar</v-btn>
                    <v-btn variant="text" color="warning"
                        @click="$emit('closeEdit')"><v-icon>mdi-keyboard-return</v-icon></v-btn>
                </v-card>
            </v-card>
        </v-card>
        <Message :infoMessage="this.infoMessage" v-if="this.showMessage" @closeMessageDialog="this.showMessage = false" />
    </v-dialog>
</template>

<script>
import Message from '@/components/dialogs/Message.vue'
import { mask } from 'vue-the-mask'

export default {
    components: { Message },
    props: ['userToEdit'],
    data() {
        return {
            user: {
                id: null,
                name: null,
                document: null,
                email: null,
                password: null,
                phone: null,
                registerDate: null,
                userType: '',
                uf: ''
            },
            registerDateFormat: null,
            showUserEdit: true,
            showMessage: false,
            infoMessage: ''

        }
    },
    methods: {
        async updateUser(e) {

            e.preventDefault();

            if (this.user.uf === '') {
                this.user.uf = null;
            }
            if (this.user.userType === '') {
                this.user.userType = null;
            }
            await fetch('http://localhost:8081/User/' + this.user.id, {

                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(this.user)

            }).then(res => {
                if (res.status === 200) {
                    this.infoMessage = 'Atualizado com sucesso!'
                    this.showMessage = true;
                    setTimeout(() => {
                        this.$emit('closeEdit')
                    }, 1000);

                } else {
                    this.infoMessage = 'Erro ao atualizar, confira os dados fornecidos'
                    this.showMessage = true;
                }

            })

        },

        async deleteUser() {
            await fetch('http://localhost:8081/User/' + this.user.id, {

                method: 'DELETE',
                headers: { 'Content-type': 'application/json' },
            }).then(res => {
                if (res.status === 200) {
                    this.infoMessage = 'Usuário deletado'
                    this.showMessage = true;

                    setTimeout(() => {
                        this.$emit('closeEdit')
                        this.$emit('editClosed')
                    }, 1000);


                } else {
                    this.infoMessage = 'Erro ao deletar usuário'
                    this.showMessage = true
                }

            })

        },
        listenerUserType() {
            var comboUserType = document.querySelector("#userType");

            comboUserType.addEventListener('click', function () {
                if (comboUserType.value === "CHAMPIONSHIPADMINISTRATOR") {
                    var select = document.getElementById("userUF");
                    var labelselect = document.getElementById("userUFLabel");
                    select.style.display = 'block';
                    labelselect.style.display = 'block'
                } else {
                    var select = document.getElementById("userUF");
                    var labelselect = document.getElementById("userUFLabel");
                    select.style.display = 'none';
                    labelselect.style.display = 'none'

                }
            })

        }
    },
    beforeMount() {
        this.user = this.userToEdit
    },
    directives: {
        mask
    }

}


</script>

<style >
#userType {
    border: 1px solid gray;
    border-radius: 10px;
    padding: 10px;
    color: black;
    background-color: gray;
    font-weight: bold;
}

#userUF {
    border: 1px solid gray;
    border-radius: 10px;
    padding: 10px;
    color: black;
    background-color: gray;
    font-weight: bold;

}
</style>