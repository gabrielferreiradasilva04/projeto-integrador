<template>
    <div>
        <v-dialog persistent v-model="this.showChoose" width="30%">
            <v-card width="100%" class="pa-3 rounded-xl" elevation="24" theme="dark">
                <v-card-text class="text-center">
                    <h1>Selecione um piloto</h1>
                </v-card-text>
                <v-combobox v-model="selectedUser" variant="solo-filled" label="Pilotos" :items="pilots"
                    item-title="name"></v-combobox>
                <br>
                <v-btn variant="text" color="success" @click="this.chooseUser">Selecionar</v-btn>
                <v-btn variant="text" color="warning" @click="$emit('returnChooseDialog')">Voltar</v-btn>
            </v-card>
            <Message :infoMessage="this.infoMessage" v-if="showMessage" @closeMessageDialog="this.showMessage = false" />
        </v-dialog>
    </div>
</template>

<script>
import Message from '@/components/dialogs/Message.vue'

export default {
    components: { Message },
    data() {
        return {
            pilots: [],
            showChoose: true,
            selectedUser: null,
            showMessage: false,
            infoMessage: ''
        }
    },
    methods: {
        async getpilots() {
            await fetch('http://localhost:8081/Pilot/find-pilots-available', {
                method: 'GET',
                headers: { 'Content-type': 'application/json' },
            }).then(res => {
                if (res.status === 200) {
                    res.json().then(data => {
                        this.pilots = data;
                    })
                }
                if (res.status === 404) {
                    res.json().then(data => {
                        this.infoMessage = data.message;
                        this.showMessage = true;
                        setTimeout(() => {
                            this.$emit('closeChooseDialog')
                        }, 2000);

                    })
                }
            }).catch(res => {
                this.infoMessage = 'Não foi possível concluir a busca'
                this.showMessage = true;
                this.$emit('closeChooseDialog')
            })

        },
        chooseUser() {
            var user = this.selectedUser;
            if (user == null) {
                localStorage.setItem('chooseUser', null)
                this.$emit('closeChooseDialog')
            } else {
                user = JSON.stringify(this.selectedUser);
                localStorage.setItem('chooseUser', user);
                this.$emit('closeChooseDialog')
            }


        }
    },
    beforeMount() {
        this.getpilots();
    },
    unmounted() {
        this.$emit('selectClosed')
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