<template>
  <v-card>
    <v-toolbar color="blue-darken-4">
      <v-toolbar-title>{{ this.welcome }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

      <template v-slot:extension >
        <v-tabs v-model="tab" align-tabs="title">
          <v-tab v-for="item in items" :key="item" :value="item.text" :to="item.path">
            {{ item.text }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-window v-model="tab">
      <v-window-item v-for="item in items" :key="item" :value="item.text" >
        
      </v-window-item>
    </v-window>
  </v-card>
  <Message :infoMessage="this.dialogMessage" v-if="dialogMessageModal"
    @closeMessageDialog="this.dialogMessageModal = false" />
</template>

<script>
import Message from '@/components/dialogs/Message.vue';
import ChampionshipAdministratorRegister from '@/views/Admin/ChampionshipAdministratorViews/ChampionshipAdministratorRegisterView.vue';

export default {
  components: { Message, ChampionshipAdministratorRegister },
  props: ['routers', "userType"],

  data() {
    return {
      tab: null,
      items: [],
      user: {},
      //dialog
      dialogMessage: null,
      dialogMessageModal: false,
      //welcome
      welcome: ''
    }
  },
  beforeMount() {
    const ObjectToken = {
      token: ''
    };
    ObjectToken.token = localStorage.getItem("token")
    var jsonToken = JSON.stringify(ObjectToken);

    fetch('http://localhost:8081/User/find-by-token', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: jsonToken
    }).then(res => {
      if (res.status === 200) {
        res.json().then(data => {
          this.user = data;

          if (this.user.userType === "HOUSEMANAGER") {
            this.items = [
              { text: 'Admin Home', path: '/administrator-home' },
              { text: 'Gerenciar Usuários', path: '/administrator-user-search' },
            ]
            this.welcome = 'Painel de Controle Administrativo';
          }
          if (this.user.userType === "BETTOR") {
            this.items = [
              { text: 'Home', path: '/user-home' },
              { text: 'Campeonatos Brasileiros', path: '/users-championships' },
              { text: 'Minhas Apostas', path: '/my-bets' },
            ]
            this.welcome = 'Seja bem vindo ' + this.user.name;
          }
          if (this.user.userType === "CHAMPIONSHIPADMINISTRATOR") {
            this.items = [
              { text: 'Admin Home', path: '/championship-administrator-home' },
              { text: 'Gerenciar Equipes', path: '/championship-administrator-register' },
              { text: 'Gerenciar Campeonatos da Região', path: '/my-bets' },
            ]
            this.welcome = "Painel de Controle Administrativo de Campeonatos"
          }
        })
      } else {
        this.$router.push('/error-page')

      }


    })
  },

}
</script>



