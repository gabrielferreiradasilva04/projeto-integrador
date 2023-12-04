<template>
  <v-container class="d-flex flex-column align-center">
    <v-sheet class="w-50">
      <v-card class="text-center rounded-pill elevation-12" color="blue-darken-4">
        <h1>Acessar sua conta</h1>
      </v-card>
      <br>
      <v-card-text>
        Forneça os dados solicitados para acesso.
      </v-card-text>
      <br>
      <v-divider></v-divider>
      <br>
      <v-card class="elevation-24 rounded-xl pa-5" variant="plain">
        <v-form fast-fail @submit.prevent>
          <v-text-field v-model="user.email" label="E-mail" variant="outlined"></v-text-field>

          <v-text-field :type="'' ? 'text' : 'password'" v-model="user.password" label="Senha de acesso"
            variant="outlined"></v-text-field>

        </v-form>
        <v-card-actions>
          <v-btn variant="outlined" type="submit" color="success" class="mt-2 rounded-pill" @click="login">Entrar</v-btn>
          <v-btn variant="outlined" type="button" color="blue-darken-4" class="mt-2 rounded-pill" to="/register">Cadastre-se</v-btn>
        </v-card-actions>
      </v-card>

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
                  this.$router.push('/user-home')
                }, 1000);
              }
              if (data.user.userType === "CHAMPIONSHIPADMINISTRATOR") {
                setTimeout(() => {
                  this.$router.push('/championship-administrator-home')
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