<template>
  <v-card height="100%" width="100%">
    <v-layout>
      <v-app-bar color="indigo-darken-4" v-if="notIsLoginOrRegister()">
        <template v-slot:prepend>
          <v-btn size="x-large" icon="mdi-car-traction-control"></v-btn>
        </template>
        <template v-slot:append>
        </template>
        <v-app-bar-title>Arranque Forte Bet</v-app-bar-title>
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