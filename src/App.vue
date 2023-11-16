<template>
  <v-app theme="dark">
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
  background-color: #4dc0f6;
}
.button-system {
  width: 20%;
  border-radius: 20px;
}

</style>