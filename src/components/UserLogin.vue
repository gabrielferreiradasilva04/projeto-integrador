<template>
  <v-container class="pa-6 text-center">
    <h1>Login</h1>
    <v-sheet width="300" class="mx-auto">
      <v-form fast-fail @submit.prevent>
        <v-text-field v-model="user.userMail" label="E-mail"></v-text-field>

        <v-text-field v-model="user.userPassword" label="Senha de acesso"></v-text-field>

        <v-btn type="submit" color="success" block class="mt-2" @click="login">Entrar</v-btn>
        <v-btn type="button" color="success" block class="mt-2" to="/register">Cadastre-se</v-btn>
      </v-form>
    </v-sheet>
  </v-container>
  <!--Componente de mensagem-->
  <Message :infoMessage="this.dialogMessage" v-if="dialogMessageModal"
    @closeMessageDialog="this.dialogMessageModal = false" />
</template>
  
<script>
export default {
  data: () => ({

    user: {
      userMail: null,
      userPassword: null
    },
    //dialog
    dialogMessage: null,
    dialogMessageModal: false,

  }),
  methods: {
    async login() {

      await fetch('http://localhost:8081/User/findUserByMailAndPassword?email=' + this.user.userMail + '&password=' + this.user.userPassword, {
        method: 'get',
        headers: { 'Content-type': 'application/json' }

      })
        .then((res => {

          if (res.status === 200) {

            userResponse = res.json();
            this.dialogMessage = "Seja bem vindo " + userResponse.name
            this.dialogMessageModal = true;

          }

          if (res.status === 404) {

            (res.json().then((data => {

              this.dialogMessageModal = true;
              var serverResponse = data.message;
              this.dialogMessage = serverResponse;

            })))
          }

        }))
        .catch((res =>

          console.log(res.json())))
          
    }

  }

}
</script>