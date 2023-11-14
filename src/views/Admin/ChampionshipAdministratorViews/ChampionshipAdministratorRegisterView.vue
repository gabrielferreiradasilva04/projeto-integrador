
<template>
    <body>

        <v-container class="pa-6 text-justfy ">

            <v-sheet width="60%"  class="pa-3 rounded-xl mx-auto" elevation="24" theme="dark">

                <v-form ref="form">
                    <v-text-field v-model="user.name" :rules="nameRules" label="Nome do Representante da equipe"
                        required></v-text-field>

                    <v-text-field v-model="user.document" :rules="nameRules" label="CPF do Representante da equipe"
                        v-mask="['###.###.###-##']" required></v-text-field>

                    <v-text-field v-model="user.email" :rules="nameRules" label="E-mail da equipe" required></v-text-field>

                    <v-text-field v-model="user.password" :counter="8" :rules="nameRules"
                        label="Defina uma senha para que a equipe acesse o sistema" required
                        :type="'' ? 'text' : 'password'"></v-text-field>

                    <v-text-field v-model="confirmPassword" :counter="8" :rules="nameRules"
                        label="Confirme a senha de acesso" required :type="'' ? 'text' : 'password'"></v-text-field>

                    <v-text-field v-model="user.phone" :rules="nameRules" label="Telfone da equipe"
                        v-mask="['(##)#####-####']" required></v-text-field>

                    <v-select placeholder="Estado de Atuação"  v-model="this.user.uf" :rules=" [v => !!v || 'Selecione um Estado']" clearable="" :items="['PR','SP','SC','RS','MS','RO','AC','AM','RR', 'PA','TO','MA','RN', 'PB','PE','AL','SE','BA','MG','RJ','MT', 'GO','DF','PI','CE','ES']">
                    </v-select>

                    <v-checkbox v-model=" checkbox " :rules=" [v => !!v || 'Você precisa concordar para continuar']"
                        label="Li e aceito os termos de uso" required @click="this.termsDialog = true"></v-checkbox>

                    <div class="d-flex flex-column">
                        <v-btn variant="text" color="success" class="mt-2" @click=" validate ">
                            Concluir
                        </v-btn>
                        <v-btn color="warning" variant="text" class="mt-2" @click="this.reset">
                            Limpar Campos
                        </v-btn>
                    </div>
                </v-form>
            </v-sheet>
            <!--Componente de notificação-->
            <Message :infoMessage=" this.dialogMessage " v-if=" dialogMessageModal "
                @closeMessageDialog="this.dialogMessageModal = false" />
            <!--Componente termos-->
            <Terms @closeTermsDialog="this.termsDialog = false" v-if=" termsDialog " />
        </v-container>
    </body>
</template>
  
<script>

import { mask } from 'vue-the-mask'
import Message from '@/components/dialogs/Message.vue';
import Terms from '@/components/dialogs/Terms.vue';


export default {

    data: () => ({
        name: 'ChampionshipAdministratorRegister',
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
            userType: 3,
            uf: null
        },
        confirmPassword: null,
        //Dialogs
        dialogMessage: null,
        dialogMessageModal: false,
        termsDialog: false



    }),

    methods: {
        async validate() {

            const { valid } = await this.$refs.form.validate()

            if (valid) {

                if (this.user.password != this.confirmPassword) {

                    this.dialogMessageModal = true;
                    this.dialogMessage = "As senhas não conferem"

                } else {

                    var userJson = JSON.stringify(this.user);
                    await fetch('http://localhost:8081/auth/register', {

                        method: 'post',
                        headers: { 'Content-type': 'application/json' },
                        body: userJson

                    }).then((res => {

                        if (res.status === 201) {
                            this.dialogMessageModal = true;
                            this.dialogMessage = "Cadastro realizado com  sucesso"
                            setTimeout(() => {

                                this.$router.push('/administrator-home');
                            }, 2000);

                        }
                        if (res.status === 404) {

                            (res.json().then((data => {

                                this.dialogMessageModal = true;
                                var serverResponse = data.message;
                                this.dialogMessage = serverResponse;

                            })))

                        }
                    })).catch((res =>
                        console.log(res.json())))

                }
            }

        },
        showselect(){
            alert(this.user.uf);
        },

        reset() {
            this.$refs.form.reset()
        },

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
.userTypeCombo {
    display: flex;
    align-items: end;
    border: 2px solid black;
    border-radius: 10px;
    padding: 5px;
}

.userTypeCombo select {
    width: 100%;

}
</style>