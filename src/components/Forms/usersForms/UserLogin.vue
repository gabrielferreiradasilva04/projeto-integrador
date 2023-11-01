<template>
  <v-container class="pa-6 text-center">
    <h1>Login</h1>
    <v-sheet width="300" class="mx-auto">
      <v-form fast-fail @submit.prevent>
        <v-text-field v-model="user.email" label="E-mail"></v-text-field>

        <v-text-field v-model="user.password" label="Senha de acesso"></v-text-field>

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
import Message from '../../dialogs/Message.vue';

export default {
  data: () => ({

    user: {
      email:null,
      password:null
    },
    //dialog
    dialogMessage: null,
    dialogMessageModal: false,

  }),
  methods: {
    async login(e) {

      e.preventDefault()
      
      var userJson = JSON.stringify(this.user)

      console.log(userJson)

      await fetch('http://localhost:8081/auth/login', {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: userJson
      })
        .then((res => {

          if (res.status === 200) {

            this.dialogMessageModal = true;
            this.dialogMessage = "Seja bem vindo(a) "

            setTimeout(() => {
              this.$router.push('/administratorHome')
            }, 1000);
            
          }

          if (res.status === 404) {

            alert("Erro...")
          }

        }))
        .catch(alert("Erro no catch"))

    }

  },
  //Componentes do documento
  components: { Message },

}
</script>