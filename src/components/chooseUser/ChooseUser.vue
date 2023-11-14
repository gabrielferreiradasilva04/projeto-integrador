<template>
    <div>
        <v-dialog persistent v-model="this.showChoose" width="30%">
            <v-card width="100%" class="pa-3 rounded-xl" elevation="24" theme="dark">
                <v-card-text class="text-center">
                    <h1>Selecione um piloto</h1>
                </v-card-text>
                <v-combobox v-model="selectedUser" variant="solo-filled" label="Pilotos" :items="pilots" item-title="name"></v-combobox>
                <br>
                <v-btn variant="text" color="success" @click="this.chooseUser">Selecionar</v-btn>
                <v-btn variant="text" color="warning" @click="$emit('closeMessageDialog')">Voltar</v-btn>

            </v-card>
        </v-dialog>


    </div>
</template>

<script>
export default {

    data() {
        return {
            pilots: [],
            showChoose: true,
            selectedUser: null
        }
    },
    methods: {
        async getpilots() {
            await fetch('http://localhost:8081/Pilot', {
                method: 'GET',
                headers: { 'Content-type': 'application/json' },
            }).then(res => res.json())
                .then(data => {
                    this.pilots = data;
                }).catch(res => {
                    alert("Não foi possível concluir a busca")
                });
        },
        chooseUser() {
            var user={};
            if(user === null){
                localStorage.setItem('chooseUser', null)
            }
            user = JSON.stringify(this.selectedUser);
            localStorage.setItem('chooseUser', user);
            this.$emit('closeMessageDialog')

        }
    },
    beforeMount() {
        this.getpilots();
    },
    unmounted(){
        this.$emit('selectClose');
    }
}

</script>

<style>
#select-user {
    border: 2px black solid;
    border-radius: 5px;
    padding-inline: 10px;
    color: rgb(0, 0, 0);
    background-color: white;
    font-weight: bold;
    font-size: 18px;
}
</style>