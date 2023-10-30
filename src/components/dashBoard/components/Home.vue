<template>
  <v-container class="text-center">
    <h1>Componente Home</h1>

    <p></p>
  </v-container>
    
    </template>
    
    <script>
    
    
    export default{
      name:'Home',

      user:{},

      created(){
        this.user = localStorage.getItem('authUser');
      }
    
    
    }
    
    </script>