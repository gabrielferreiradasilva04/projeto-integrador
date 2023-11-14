<template>
    <v-table class="table" height="200px" fixed-header="" density="compact">
        <thead class="font-weight-bold text-h6">
            <tr>
                <th class="text-center">
                    Nome
                </th>
                <th class="text-center">
                    Ações
                </th>
            </tr>
        </thead>
        <tbody font-weight-bold class="text-center">
            <tr v-for="preparer in preparers" :key="preparer.id">
                <td>{{ preparer.name }}</td>
                    <v-btn variant="text" color="error" @click="this.edit(team.id)">Excluir</v-btn>
            </tr>

        </tbody>
    </v-table>
</template>
<script>
export default {
    data() {
        return {
            preparers: []
        }
    },
    methods: {
        getpreparers() {
            fetch('http://localhost:8081/Preparer', {
                method: 'GET',
                headers: { 'Content-type': 'application/json' },
            }).then(res =>{
                if(res.status === 200){
                    res.json().then(data =>{
                        this.preparers = data;
                    })
                }
            }).catch(res =>{
                alert("Erro ao localizar os Preparadores")
            })
        }
    },
    beforeMount(){
        this.getpreparers();
    }
}

</script>