<template>
  <v-card height="100%" width="100%">
    <v-layout>
      <v-app-bar color="indigo-darken-4" v-if="notIsLoginOrRegister()">
        <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>
        <template v-slot:append>
          <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>
        <v-app-bar-title>Gerenciar Casa</v-app-bar-title>
      </v-app-bar>
      <v-main>
        <v-container fluid>
          <router-view />
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
  <FooterVue v-if="notIsLoginOrRegister()" />
</template>
<script>
import HouseManagerMenu from "@/components/Menus/HouseManagerMenu.vue";
import FooterVue from '../footer/Footer.vue';
export default {
  components: { HouseManagerMenu, FooterVue },
  methods: {
    notIsLoginOrRegister() {
      return (
        this.$route.path !== "/" &&
        this.$route.path !== "/register" &&
        this.$route.path !== "/error-page"
      );
    },
  }
}
</script>