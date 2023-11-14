<template>
  <v-app>
    <DashBoard v-if="notIsLoginOrRegister" />
    <router-view />
    <Footer v-if="notIsLoginOrRegister" />
  </v-app>
</template>

<script>
import DashBoard from "./components/dashBoard/DashBoard.vue";
import Footer from "./components/footer/Footer.vue";
export default {
  components: { DashBoard, Footer },

  computed: {
    notIsLoginOrRegister() {
      return (
        this.$route.path !== "/" &&
        this.$route.path !== "/register" &&
        this.$route.path !== "/error-page"
      );
    },
  },
};

</script>


<style>
body {
  height: 100vh;
  background-color: #B3E5FC;
}
.button-system {
  width: 20%;
  border-radius: 20px;
}

</style>