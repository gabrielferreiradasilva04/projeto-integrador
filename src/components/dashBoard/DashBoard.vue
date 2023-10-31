<template>
  <v-card>
    <v-toolbar color="orange-darken-2">
      <v-toolbar-title>Painel de Controle Administrativo</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs
          v-model="tab"
          align-tabs="title"
        >
          <v-tab
            v-for="item in items"
            :key="item"
            :value="item.text"
            :to="item.link"
          >
            {{ item.text }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-window v-model="tab">
      <v-window-item
        v-for="item in items"
        :key="item"
        :value="item.text"
      >
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        tab: null,
        items: [
          {text: 'Home', link: '/administratorHome'},
          {text: 'Consulta de Usuários', link: '/usersSearch'},
          {text: 'Registro de Usuários', link: '/registerAllUsers'},
        ],
        user:{}
      }
    },
    methods:{
      async getCurrentUser() {
            await fetch('http://localhost:8081/User/' + this.$route.params.id)
                .then(res => res.json())
                .then(data => {

                    this.user = data;

                })
        },
    }
  }
</script>

