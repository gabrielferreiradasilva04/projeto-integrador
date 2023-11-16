<template>
    <v-table class="table elevation-24" height="300px" theme="dark">
        <thead class="font-weight-bold text-h6">
            <tr>
                <th class="text-justfy">
                    Nome
                </th>
                <th class="text-center">
                    Ações
                </th>
            </tr>
        </thead>
        <tbody font-weight-bold class="text-justfy">
            <tr v-for="pilot in pilots" :key="pilot.id">
                <td>{{ pilot.name }}</td>
                <td class="text-center">
                    <v-btn variant="text" color="error" @click="this.excludepilot(pilot)">Excluir</v-btn>
                </td>
            </tr>
        </tbody>
        <Message :infoMessage="this.infoMessage" v-if="this.showMessage" @closeMessageDialog="this.showMessage = false"/>
    </v-table>
</template>
<script>
import Message from '@/components/dialogs/Message.vue'
export default {
    components:{Message},
    props: ['pilotsList'],
    data() {
        return {
            pilots: [],
            showMessage: false,
            infoMessage: ''
        }
    },
    methods: {
        async excludepilot(pilot){
            pilot.team = null;
            await fetch('http://localhost:8081/Pilot/' + pilot.id, {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(pilot)
            }).then(res => {
                if (res.status === 200) {
                    this.infoMessage = 'Piloto desvinculado com sucesso!'
                    this.showMessage = true;
                    this.$emit('updateList')
                }
            }).catch(res =>{
                this.infoMessage = 'Erro ao desvincular piloto'
                this.showMessage = true;
            })
        }
    },
    updated() {
        this.pilots = this.pilotsList
    }
}

</script>