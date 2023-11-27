<template>
  <v-app theme="dark">
   <MainBar />
  </v-app>
</template>

<script>
import MainBar from './components/dashBoard/MainBarView.vue'
import UserStore from '@/store/UserStore'
import { provide } from 'vue';
export default {
  components: { MainBar },

  setup(){
    provide('userStore', UserStore )

  },

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