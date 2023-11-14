<template>
    <v-table class="table" height="200px" fixed-header="" density="compact" theme="dark">
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
                    <v-btn variant="text" color="error" @click="this.edit(team.id)">Excluir</v-btn>
                </td>

            </tr>

        </tbody>
    </v-table>
</template>
<script>
export default {
    props: ['pilotsList'],
    data() {
        return {
            pilots: []
        }
    },
    methods: {

    },
    updated() {
        this.pilots = this.pilotsList
    }
}

</script>