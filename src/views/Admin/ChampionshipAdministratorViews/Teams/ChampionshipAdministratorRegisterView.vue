
<template>
    <v-dialog v-model="showRegister" class="h-auto w-auto" max-width="60%" persistent>
        <v-card class="pa-6 border rounded-xl">
            <v-form ref="form">
                <v-text-field variant="solo-filled" v-model="user.name" :rules="nameRules" label="Nome da Equipe"
                    required></v-text-field>

                <v-text-field variant="solo-filled" v-model="user.document" :rules="nameRules"
                    label="CPF do Representante da equipe" v-mask="['###.###.###-##']" required></v-text-field>

                <v-text-field variant="solo-filled" v-model="user.email" :rules="nameRules" label="E-mail da equipe"
                    required></v-text-field>

                <v-text-field variant="solo-filled" v-model="user.password" :counter="8" :rules="nameRules"
                    label="Defina uma senha" required :type="'' ? 'text' : 'password'"></v-text-field>

                <v-text-field variant="solo-filled" v-model="confirmPassword" :counter="8" :rules="nameRules"
                    label="Confirme a senha de acesso" required :type="'' ? 'text' : 'password'"></v-text-field>

                <v-text-field variant="solo-filled" v-model="user.phone" :rules="nameRules" label="Telfone da equipe"
                    v-mask="['(##)#####-####']" required></v-text-field>

                <v-select variant="solo-filled" placeholder="Estado de Atuação" v-model="this.user.uf"
                    :rules="[v => !!v || 'Selecione um Estado']" clearable=""
                    :items="['PR', 'SP', 'SC', 'RS', 'MS', 'RO', 'AC', 'AM', 'RR', 'PA', 'TO', 'MA', 'RN', 'PB', 'PE', 'AL', 'SE', 'BA', 'MG', 'RJ', 'MT', 'GO', 'DF', 'PI', 'CE', 'ES']">
                </v-select>

                <v-checkbox variant="solo-filled" v-model="checkbox"
                    :rules="[v => !!v || 'Você precisa concordar para continuar']" label="Li e aceito os termos de uso"
                    required @click="this.termsDialog = true"></v-checkbox>
                <v-card-item density="comfortable" class="d-flex flex-column">
                    <v-btn variant="text" color="success" class="mt-2" @click="validate">
                        Concluir
                    </v-btn>
                    <v-btn color="warning" variant="text" class="mt-2" @click="this.reset">
                        Limpar Campos
                    </v-btn>
                    <v-btn @click="$emit('closeRegisterDialog')"><v-icon>mdi-keyboard-return</v-icon></v-btn>

                </v-card-item>

            </v-form>
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
import { ref, inject } from 'vue'



export default {
    setup() {
        const userStore = inject('userStore')
        return {
            userStore
        }

    },
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
        termsDialog: false,
        showRegister: true



    }),

    methods: {
        async validate() {

            const { valid } = await this.$refs.form.validate()

            if (valid) {

                if (this.user.password != this.confirmPassword) {

                    this.dialogMessageModal = true;
                    this.dialogMessage = "As senhas não conferem"

                }
                if (this.user.uf == null) {
                    this.dialogMessage = 'Selecione um Estado'
                    this.dialogMessageModal = true;
                }
                else {
                    var userJson = JSON.stringify(this.user);
                    await fetch('http://localhost:8081/auth/register', {

                        method: 'post',
                        headers: { 'Content-type': 'application/json' },
                        body: userJson

                    }).then((res => {

                        if (res.status === 201) {
                            this.dialogMessageModal = true;
                            this.dialogMessage = "Cadastro realizado com  sucesso"
                            this.userStore.methods.getTeams();
                            setTimeout(() => {
                                this.reset()
                                this.$emit('closeRegisterDialog')
                            }, 1000);

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
        showselect() {
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

<style></style>