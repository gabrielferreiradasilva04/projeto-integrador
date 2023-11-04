
<template>
    <v-container class="pa-6 text-center ">
        <h1>Cadastre-se</h1>
        <v-sheet width="300" class="mx-auto">

            <v-form ref="form">
                <v-text-field v-model="user.name" :rules="nameRules" label="Nome completo" required></v-text-field>

                <v-text-field v-model="user.document" :rules="nameRules" label="CPF" v-mask="['###.###.###-##']"
                    required></v-text-field>

                <v-text-field v-model="user.email" :rules="nameRules" label="E-mail para contato" required></v-text-field>

                <v-text-field v-model="user.password" :counter="8" :rules="nameRules" label="Defina uma senha de acesso"
                    required :type="'' ? 'text' : 'password'"></v-text-field>

                <v-text-field v-model="confirmPassword" :counter="8" :rules="nameRules" label="Confirme a senha de acesso"
                    required :type="'' ? 'text' : 'password'"></v-text-field>

                <v-text-field v-model="user.phone" :rules="nameRules" label="Telfone para contato"
                    v-mask="['(##)#####-####']" required></v-text-field>

                <v-checkbox v-model="checkbox" :rules="[v => !!v || 'Você precisa concordar para continuar']"
                    label="Li e aceito os termos de uso" required @click="this.termsDialog = true"></v-checkbox>

                <div class="d-flex flex-column">
                    <v-btn color="success" class="mt-4" block @click="validate">
                        Validate
                    </v-btn>

                    <v-btn color="success" class="mt-4" block to="/">
                        Já possuo uma conta!
                    </v-btn>

                </div>
            </v-form>
        </v-sheet>
        <!--Componente de notificação-->
        <Message :infoMessage="this.dialogMessage" v-if="dialogMessageModal"
            @closeMessageDialog="this.dialogMessageModal = false" />
        <!--Componente termos-->
        <Terms @closeTermsDialog="this.termsDialog = false" v-if="termsDialog" />
    </v-container>
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
            userType: 2,
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
                            this.dialogMessage = "Parabéns! Cadastro realizado com sucesso"
                            setTimeout(() => {
                                this.$router.push('/')
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