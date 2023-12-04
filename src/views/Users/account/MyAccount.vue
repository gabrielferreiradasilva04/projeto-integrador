
<template>
    <v-container class="d-flex flex-column align-center">
        <v-sheet class="w-50">
            <v-card class="text-center rounded-xl elevation-10" color="blue-darken-4">
                <h1>Seus Dados</h1>
            </v-card>
            <br>
            <v-divider>
            </v-divider>
            <br>
            <v-card class=" rounded-xl pa-5" variant="plain">
                <v-form ref="form">
                    <v-text-field variant="outlined" v-model="store.state.user.name" :rules="nameRules" label="Nome completo"
                        required readonly></v-text-field>

                    <v-text-field variant="outlined" v-model="store.state.user.document" :rules="nameRules" label="CPF" readonly
                        v-mask="['###.###.###-##']" required></v-text-field>

                    <v-text-field variant="outlined" v-model="store.state.user.email"  readonly :rules="nameRules" label="E-mail para contato"
                        required></v-text-field>

                    <v-text-field variant="outlined" v-model="store.state.user.password" :counter="8" :rules="nameRules"
                        label="Senha de acesso" readonly required :type="'' ? 'text' : 'password'"></v-text-field>


                    <v-text-field variant="outlined" v-model="store.state.user.phone" :rules="nameRules" label="Telfone para contato" readonly
                        v-mask="['(##)#####-####']" required></v-text-field>

                </v-form>
            </v-card>
            <br>
            <v-card class="pa-2 d-flex flex-column rounded-xl">
                <v-btn color="success" variant="outlined" class="mt-4 rounded-pill"  @click="validate">
                    Salvar Alterações
                </v-btn>
            </v-card>
            <!--Componente de notificação-->
            <Message :infoMessage="this.dialogMessage" v-if="dialogMessageModal"
                @closeMessageDialog="this.dialogMessageModal = false" />
            <!--Componente termos-->
            <Terms @closeTermsDialog="this.termsDialog = false" v-if="termsDialog" />
        </v-sheet>
    </v-container>
</template>
  
<script>

import { mask } from 'vue-the-mask'
import Message from '@/components/dialogs/Message.vue';
import Terms from '@/components/dialogs/Terms.vue';
import {inject} from 'vue'


export default {

    setup(){
        const store = inject('userStore');
        store.methods.getCurrentUser();
        return{
            store
        }
    },
    data: () => ({
        nameRules: [
            v => !!v || 'Campo obrigatório',
        ],
        select: null,
        //usuario
        confirmPassword: null,
        //Dialogs
        dialogMessage: null,
        dialogMessageModal: false,
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