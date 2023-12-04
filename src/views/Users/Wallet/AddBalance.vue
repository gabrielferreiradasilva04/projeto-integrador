<template>
    <v-dialog v-model="dialog" scrollable persistent max-width="60%" transition="dialog-transition" class="h-auto w-auto">
        <v-card class="rounded-xl pa-2 elevation-0">
            <v-card-title>
                Realize um depósito a partir de R$20,00
            </v-card-title>
            <v-card class="pa-2" variant="text">
                <v-form>
                    <v-text-field loading name="amount" label="Valor a depositar" placeholder="100.00" id="amount"
                        v-model="this.amount" variant="solo-filled"></v-text-field>
                    <v-select :items="['Débito', 'Crédito', 'PIX']" variant="solo-filled"
                        label="Forma de depóstio"></v-select>
                </v-form>
                <v-card-actions>
                    <v-btn @click="this.addBalance" variant="text" color="success">Depositar</v-btn>
                    <v-btn color="warning"
                        @click="this.$emit('closeAddBalance')"><v-icon>mdi-keyboard-return</v-icon></v-btn>
                </v-card-actions>
            </v-card>
            <Message :infoMessage="this.infoMessage" v-if="this.showMessage"
                @closeMessageDialog="this.showMessage = false" />
        </v-card>

    </v-dialog>
</template>
<script>
import { inject } from 'vue'
import Message from '@/components/dialogs/Message.vue'
export default {
    components: { Message },
    setup() {
        const store = inject('userStore');
        store.methods.getCurrentUser();
        return {
            store
        }
    },
    data() {
        return {
            dialog: true,
            infoMessage: '',
            showMessage: false,
            amount: null
        }
    },
    methods: {
        async addBalance() {
            await fetch('http://localhost:8081/movement/addBalance?walletId=' + this.store.state.wallet.id + '&amount=' + this.amount, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
            }).then(res => {
                if (res.status === 200) {
                    this.infoMessage = 'Depósito realizado com sucesso!'
                    this.showMessage = true;
                    this.store.methods.getCurrentUser();
                    setTimeout(() => {
                        this.$emit('closeAddBalance')
                    }, 1000);
                }
                if (res.status === 404) {
                    res.json().then(data => {
                        this.infoMessage = data.message;
                        this.showMessage = true;
                    })
                }
                if (res.status === 500) {
                    res.json().then(data => {
                        this.infoMessage = 'Algo deu errado, verifique o formato da moeda inserido: R$00.00'
                        this.showMessage = true;
                    })
                }
                if (res.status === 400) {
                    res.json().then(data => {
                        this.infoMessage = 'Algo deu errado, verifique o formato da moeda inserido: R$00.00'
                        this.showMessage = true;
                    })
                }
            }).catch(res => {
                this.infoMessage = 'Algo deu errado, tente novamente mais tarde';
                this.showMessage = true;
            })

        }
    },
}
</script>