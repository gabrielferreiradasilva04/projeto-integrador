<template>
  <v-container class="pa-6 text-center">
    <h1>Login</h1>
    <v-sheet width="300" class="mx-auto">
      <v-form fast-fail @submit.prevent>
        <v-text-field v-model="user.email" label="E-mail"></v-text-field>

        <v-text-field :type="'' ? 'text' : 'password'" v-model="user.password" label="Senha de acesso"></v-text-field>

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
import Message from '@/components/dialogs/Message.vue';

export default {
  data: () => ({

    user: {
      email: null,
      password: null
    },
    //dialog
    dialogMessage: null,
    dialogMessageModal: false,

  }),
  methods: {
    async login(e) {
      e.preventDefault()

      var userJson = JSON.stringify(this.user)

      await fetch('http://localhost:8081/auth/login', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: userJson
      })
        .then((res => {
          if (res.status === 200) {
            res.json().then(data => {
              //adicionando o token no local storage da aplicação
              localStorage.setItem("token", data.token);

              this.dialogMessageModal = true;
              this.dialogMessage = "Seja bem vindo(a)"

              if (data.user.userType === "HOUSEMANAGER") {
                setTimeout(() => {
                  this.$router.push('/administrator-home')
                }, 1000);
              }
              if (data.user.userType === "BETTOR") {
                setTimeout(() => {
                  this.$router.push('/administrator-home')
                }, 1000);
              }

            })
          }

          if (res.status === 404) {
            res.json().then(data => {
              this.dialogMessage = data.message;
              this.dialogMessageModal = true;
            })
          }

          if (res.status === 403) {
            res.json().then(data => {
              this.dialogMessage = data.message;
              this.dialogMessageModal = true;
            })
          }
        }))
    }
  },
  //Componentes do documento
  components: { Message },

}
</script>