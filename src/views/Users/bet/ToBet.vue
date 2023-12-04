<template>
    <v-dialog v-model="dialog" scrollable persistent max-width="60%" transition="dialog-transition">
        <v-card class="pa-6 rounded-xl elevation-0">
            <v-card-title primary-title>
                <h2>Apostas {{ this.payment.bet.clash.championship.title }}</h2>
            </v-card-title>
            <br>
            <v-divider></v-divider>
            <br>
            <v-card>
                <v-form ref="form">
                    <v-select :rules="this.rules" :items="this.carsList" v-model="this.payment.bet.car"
                        label="Selecione um dos carros" variant="solo-filled" item-title="nickname"
                        return-object></v-select>

                    <v-select :rules="this.rules" :items="userStore.state.betTypes" v-model="this.payment.bet.betType"
                        item-title="description" label="Selecione um tipo de aposta" variant="solo-filled"
                        return-object></v-select>
                    <v-text-field :rules="this.rules" name="amount" label="Valor da aposta"
                        prepend-inner-icon="mdi-currency-usd" id="amount" variant="solo-filled" v-mask="'###.##'"
                        v-model="this.payment.paymentAmount"></v-text-field>
                    <v-text-field :rules="this.rules" name="multiplier" label="Multiplicador"
                        v-model="this.payment.bet.multiplier" id="multiplier" readonly></v-text-field>
                    <v-card-actions>
                        <v-btn color="orange-lighten-2" variant="text">
                            Pagamento
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show"></v-btn>
                    </v-card-actions>

                    <v-expand-transition>
                        <div v-show="show" class="pa-2">
                            <v-divider></v-divider>
                            <v-card-text>
                                <v-select :rules="this.rules" :items="userStore.state.paymentTypes" item-title="description"
                                    v-model="payment.paymentType" label="Tipo de pagamento" variant="solo-filled"
                                    return-object></v-select>
                            </v-card-text>
                            <v-card-actions class="d-flex flex-row-reverse">
                                <v-btn @click="this.confirmPayment" color="success">Finalizar Aposta</v-btn>
                            </v-card-actions>
                        </div>
                    </v-expand-transition>
                </v-form>
            </v-card>
            <v-card-actions class="d-flex flex-row-reverse ga-2">
                <v-btn variant="text" color="warning" @click="this.$emit('closeBetDialog')">Voltar</v-btn>
            </v-card-actions>
        </v-card>
        <Message :infoMessage="this.infoMessage" v-if="this.showMessage" @closeMessageDialog="this.showMessage = false" />
    </v-dialog>
</template>

<script>
import { mask } from 'vue-the-mask'
import { inject } from 'vue'
import Message from '@/components/dialogs/Message.vue'
export default {
    props: ['cars', 'clashRecieve'],
    components:{Message},
    setup() {
        const userStore = inject('userStore')
        userStore.methods.getCurrentUser();
        userStore.methods.getPaymentTypes();
        userStore.methods.getBetTypes();
        return {
            userStore
        }
    },
    data() {
        return {
            showMessage:false,
            infoMessage: '',
            rules: [
                v => !!v || 'Campo obrigatório',
            ],
            payment: {
                paymentAmount: null,
                paymentType: null,
                bet: {
                    car: null,
                    betType: null,
                    multiplier: 0.5,
                    betResult: null,
                    betStatus: null,
                    bettor: null,
                    clash: null,
                }
            },
            dialog: true,
            carsList: [],
            betTypes: [],
            show: false
        }
    },
    beforeMount() {
        this.carsList = this.cars;
        this.payment.bet.clash = this.clashRecieve;
    },
    directives: {
        mask
    },
    methods: {

        async confirmPayment() {
            const { valid } = await this.$refs.form.validate()

            if (valid) {
                this.payment.bet.bettor = this.userStore.state.user;
                await fetch('http://localhost:8081/Payment/betPayment?walletId=' + this.userStore.state.wallet.id, {
                    method: 'POST',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify(this.payment)
                }).then(res => {
                    if (res.status === 200) {
                        this.userStore.methods.getCurrentUser();
                        this.infoMessage = 'Sua aposta foi realizada com sucesso!'
                        this.showMessage = true;
                        setTimeout(() => {
                            this.$emit('closeBetDialog')
                        }, 1000);
                    }
                    if(res.status === 404){
                        res.json().then(data =>{
                            this.infoMessage = data.message;
                            this.showMessage = true;
                        })
                    }
                })
            }

        }
    },
}



</script>