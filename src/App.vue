<template>
  <DashBoard v-if="notIsLoginOrRegister" />
  <router-view />
</template>

<script>
import DashBoard from "./components/dashBoard/DashBoard.vue";
export default{

  components:{DashBoard},

  computed:{
    notIsLoginOrRegister(){
      return this.$route.path !== "/" && this.$route.path !== "/register" && this.$route.path !== "/error-page";
    }
  }

}


</script>
