<template>
  <v-container class="text-center">
    <h1>Trazer estatísticas e mensagem de boas vindas ao administrador</h1>

    <p></p>
  </v-container>
</template>
    
<script>


export default {
  name: 'Home',

  user: {},

  methods: {
    async getCurrentUser() {
      await fetch('http://localhost:8081/User/' + this.$route.params.id)
        .then(res => res.json())
        .then(data => {

          this.user = data;

        })
    },
  },
  beforeMount(){
    this.getCurrentUser
  }



}

</script>