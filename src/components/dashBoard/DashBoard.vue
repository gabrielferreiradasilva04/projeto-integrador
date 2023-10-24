<template>
  <v-card>
    <v-toolbar color="orange-darken-2">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Dashboard</v-toolbar-title>

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
          {text: 'Home', link: '/home'},
          {text: 'Campeonatos', link: '/championships'},
          {text: 'Minhas Apostas', link: '/mybets'},
        ],
      }
    },
  }
</script>

