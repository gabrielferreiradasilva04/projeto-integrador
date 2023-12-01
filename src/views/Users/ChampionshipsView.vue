<template>
  <v-container class="d-flex flex-column" height="100%" width="100%" variant="text">
    <v-card class="elevation-24" color="blue-darken-4">
      <v-card-title primary-title class="text-center">
        <h1>Campeonatos</h1>
      </v-card-title>
    </v-card>
    <br>
    <br>
    <v-row>
      <v-col v-for="championship in championshipStore.state.championshipsList" :key="championship" cols="4">
        <v-card variant="plain" class="elevation-24 rounded-xl" color="blue-darken-4">
          <v-card-title primary-title class="text-center">
            <h2>{{ championship.title }}</h2>
          </v-card-title>
          <v-card-text>
            <v-text-field name="responsable" label="Responsável" id="responsable" variant="solo-filled"
              v-model="championship.championshipAdmin.name" prepend-inner-icon="mdi-account" readonly></v-text-field>
            <v-text-field name="startDate" label="Data Inicio" id="startDate" variant="solo-filled"
              v-model="championship.startDate" prepend-inner-icon="mdi-calendar" readonly></v-text-field>
            <v-text-field name="endDate" label="Data Fim" id="endDate" variant="solo-filled"
              v-model="championship.endDate" prepend-inner-icon="mdi-calendar" readonly></v-text-field>
            <v-text-field name="championshipType" label="Tipo do Campeonato" id="championshipType" variant="solo-filled"
              v-model="championship.championshipType.description" prepend-inner-icon="mdi-key-variant"
              readonly></v-text-field>
            <v-text-field name="status" label="Status" id="status" variant="solo-filled"
              v-model="championship.status.description" prepend-inner-icon="mdi-bookmark-outline" readonly></v-text-field>
          </v-card-text>
          <v-card-actions class="d-flex flex-row-reverse">
            <v-btn @click="this.showDetails = true" color="success">Detalhes</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <ChampionshipDetails v-if="showDetails" @closeDetails="this.showDetails = false" />
  </v-container>
</template>
    
<script>
import { inject } from 'vue';
import ChampionshipDetails from '@/views/Users/ChampionshipsDetails'

export default {
  name: 'ChampionshipsView',
  components: { ChampionshipDetails },
  setup() {
    const championshipStore = inject('userStore')
    championshipStore.methods.getChampionships();
    return {
      championshipStore
    }
  },
  data() {
    return{
      showDetails: false
    }

  }

}

</script>