<template>
    <div class="text-center">
        <v-dialog
          activator="parent"
          width="auto"
          v-model="this.dialog"
          persistent="true"
          
        >
          <v-card>
            <v-card-text>
                <p>
                  {{ message }}
                </p>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" block @click="$emit('closeMessageDialog')" v-model="button">Ok</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

    </div>
  </template>

  <script>
  export default {
    props:['infoMessage'],
    name:'Message',
    data () {
      return {
        dialog: true,        
      }
    },
    created(){
      this.message = this.infoMessage;
    }
  }
</script>