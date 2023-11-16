
<template>
    <v-dialog v-if="showRegisterDialog" activator="parent" persistent min-width="600px" max-width="800px">
        <v-card class="pa-6 d-flex flex-column rounded-xl">
            <v-card-title>
                <h1>Registro de Usuários</h1>
            </v-card-title>
            <br>
            <v-sheet width="100%" class="form">

                <v-form ref="form">
                    <v-text-field variant="solo-filled" v-model="user.name" :rules="nameRules" label="Nome completo"
                        required></v-text-field>

                    <v-text-field variant="solo-filled" v-model="user.document" :rules="nameRules" label="CPF"
                        v-mask="['###.###.###-##']" required></v-text-field>

                    <v-text-field variant="solo-filled" v-model="user.email" :rules="nameRules" label="E-mail para contato"
                        required></v-text-field>

                    <v-text-field variant="solo-filled" v-model="user.password" :counter="8" :rules="nameRules"
                        label="Defina uma senha de acesso" required :type="'' ? 'text' : 'password'"></v-text-field>

                    <v-text-field variant="solo-filled" v-model="confirmPassword" :counter="8" :rules="nameRules"
                        label="Confirme a senha de acesso" required :type="'' ? 'text' : 'password'"></v-text-field>

                    <v-text-field variant="solo-filled" v-model="user.phone" :rules="nameRules" label="Telfone para contato"
                        v-mask="['(##)#####-####']" required></v-text-field>

                    <div class="combo-div">
                        <select name="userType" id="userType" v-model="this.user.userType" @click="this.listenerUserType">
                            <option value="" disabled selected>Tipo de usuário</option>
                            <option value="0">Administrador de Campeonatos</option>
                            <option value="1">Administrador da Casa</option>
                            <option value="2">Apostador</option>
                            <option value="3">Equipe</option>
                        </select>

                        <select style="display: none;" name="userUF" id="userUF" v-model="this.user.uf" :rules="nameRules">
                            <option value="" disabled selected>Estado de Administração</option>
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
                    </div>
                    <br>
                    <v-checkbox v-model="checkbox" :rules="[v => !!v || 'Você precisa concordar para continuar']"
                        label="Li e aceito os termos de uso" required @click="this.termsDialog = true"></v-checkbox>

                    <v-card-actions class="d-flex flex-row-reverse">
                        <v-btn color="success" class="button-system" @click="validate">
                            Concluir
                        </v-btn>

                        <v-btn color="warning" class="button-system" @click="this.reset">
                            Limpar Campos
                        </v-btn>
                        <v-btn @click="$emit('closeRegister')"><v-icon>mdi-keyboard-return</v-icon></v-btn>
                    </v-card-actions>


                </v-form>
            </v-sheet>
            <!--Componente de notificação-->
            <Message :infoMessage="this.dialogMessage" v-if="dialogMessageModal"
                @closeMessageDialog="this.dialogMessageModal = false" />
            <!--Componente termos-->
            <Terms @closeTermsDialog="this.termsDialog = false" v-if="termsDialog" />
        </v-card>
    </v-dialog>
</template>
  
<script>

import { mask } from 'vue-the-mask'
import Message from '@/components/dialogs/Message.vue';
import Terms from '@/components/dialogs/Terms.vue';



export default {

    data: () => ({
        nameRules: [
            v => !!v || 'Campo obrigatório',
        ],

        select: null,
        checkbox: false,
        //usuario
        user: {
            name: null,
            document: null,
            email: null,
            password: null,
            phone: null,
            userType: '',
            uf: ''
        },
        confirmPassword: null,
        //Dialogs
        dialogMessage: null,
        dialogMessageModal: false,
        termsDialog: false,
        //combo
        showUf: false,
        showRegisterDialog: true



    }),

    methods: {
        async validate() {

            const { valid } = await this.$refs.form.validate()

            if (valid) {

                if (this.user.password != this.confirmPassword) {

                    this.dialogMessageModal = true;
                    this.dialogMessage = "As senhas não conferem"

                } else {
                    if (this.user.uf === '') {
                        this.user.uf = null;
                    }
                    if (this.user.userType === '') {
                        this.user.userType = null;
                    }

                    var userJson = JSON.stringify(this.user);
                    await fetch('http://localhost:8081/auth/register', {

                        method: 'post',
                        headers: { 'Content-type': 'application/json' },
                        body: userJson

                    }).then((res => {

                        if (res.status === 201) {
                            this.dialogMessageModal = true;
                            this.dialogMessage = "Parabéns! Cadastro realizado com sucesso"
                            setTimeout(() => {
                                this.$emit('closeRegister')
                            }, 1000);

                        }
                        if (res.status === 404) {

                            (res.json().then((data => {

                                this.dialogMessageModal = true;
                                var serverResponse = data.message;
                                this.dialogMessage = serverResponse;

                                this.user.userType = '';
                                this.user.uf = '';
                            })))

                        }
                    })).catch((res =>{
                        this.dialogMessage = 'Algo deu errado, tente novamente mais tarde'
                        this.dialogMessageModal = true
                    }))
                }
            }

        },

        reset() {
            this.$refs.form.reset()
        },
        listenerUserType(e) {
            e.preventDefault();
            var comboUserType = document.querySelector("#userType");
            comboUserType.addEventListener('click', function () {
                var index = comboUserType.value;
                if (index == 0) {
                    var comboUf = document.getElementById("userUF");
                    comboUf.style.display = 'block'
                } else {
                    var comboUf = document.getElementById("userUF");
                    comboUf.style.display = 'none'
                }
            })

        }

    },
    components: {
        Message,
        Terms,
    },
    directives: {
        mask
    }
}
</script>

<style>
#userType {
    display: flex;
    align-items: end;
    border: 2px solid black;
    border-radius: 10px;
    padding: 10px;
    color: black;
    background-color: gray;
    font-weight: bold;
}

#userUF {
    display: flex;
    align-items: end;
    border: 2px solid black;
    border-radius: 10px;
    padding: 10px;
    color: black;
    background-color: gray;
    font-weight: bold;

}

.combo-div {
    display: flex;
    flex-direction: row;
    gap: 20px;
}

.button-div {
    align-items: center;
    display: flex;
    gap: 10px;
}
</style>