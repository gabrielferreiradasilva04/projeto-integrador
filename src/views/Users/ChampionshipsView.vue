<template>
  <v-container class="d-flex flex-column" height="100%" width="100%" variant="text">
    <v-card class="elevation-24">
      <v-card-title primary-title class="text-center">
        <h1>Campeonatos</h1>
      </v-card-title>
    </v-card>
      <br>
      <br>
      <v-row>
        <v-col v-for="championship in championshipStore.state.championshipsList" :key="championship" cols="4">
          <v-card variant="plain" class="elevation-24 rounded-xl">
            <v-card-title primary-title class="text-center">
              {{ championship.title }}
            </v-card-title>
            <v-card-text>
              <v-text-field
                name="responsable"
                label="Responsável"
                id="responsable"
                variant="solo-filled"
                v-model="championship.championshipAdmin.name"
                prepend-inner-icon="mdi-account"
                readonly
              ></v-text-field>
              <v-text-field
                name="startDate"
                label="Data Inicio"
                id="startDate"
                variant="solo-filled"
                v-model="championship.startDate"
                prepend-inner-icon="mdi-calendar"

                readonly
              ></v-text-field>
              <v-text-field
                name="endDate"
                label="Data Fim"
                id="endDate"
                variant="solo-filled"
                v-model="championship.endDate"
                prepend-inner-icon="mdi-calendar"

                readonly
              ></v-text-field>
              <v-text-field
                name="championshipType"
                label="Tipo do Campeonato"
                id="championshipType"
                variant="solo-filled"
                v-model="championship.championshipType.description"
                prepend-inner-icon="mdi-key-variant"

                readonly
              ></v-text-field>
              <v-text-field
                name="status"
                label="Status"
                id="status"
                variant="solo-filled"
                v-model="championship.status.description"
                prepend-inner-icon="mdi-bookmark-outline"

                readonly
              ></v-text-field>
            </v-card-text>
            <v-card-actions class="d-flex flex-row-reverse">
              <v-btn color="success">Detalhes</v-btn>
            </v-card-actions>
            </v-card>
        </v-col>
      </v-row>
  </v-container>
</template>
    
<script>
import { inject } from 'vue'

export default {
  name: 'ChampionshipsView',

  setup() {
    const championshipStore = inject('userStore')
    championshipStore.methods.getChampionships();
    return {
      championshipStore
    }
  },
  data() {

  }

}

</script>