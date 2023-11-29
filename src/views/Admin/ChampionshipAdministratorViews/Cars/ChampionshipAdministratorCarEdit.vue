<template>
    <v-dialog v-model="dialog" persistent max-width="60%" transition="dialog-transition">
        <v-card class="pa-6 rounded-xl">
            <v-card-title primary-title>
                <h1>Dados do Veículo</h1>
            </v-card-title>
            <v-form ref="form">
                <v-text-field name="model" label="Modelo" id="nickname" required v-model="car.model"
                    variant="solo-filled"></v-text-field>

                <v-text-field name="nickname" label="Apelido" id="nickname" required v-model="car.nickname"
                    variant="solo-filled"></v-text-field>

                <v-text-field name="year" label="Ano" id="year" required v-model="car.year"
                    variant="solo-filled"></v-text-field>

                <v-select :items="store.state.pilotsList" item-title="name" v-model="car.pilot" label="Piloto"
                    return-object></v-select>

                <v-select :items="store.state.preparersList" item-title="nickname" v-model="car.preparer" label="Preparador"
                    return-object></v-select>

            </v-form>
            <v-card-item class="d-flex flex-row-reverse">
                <v-btn variant="text" color="warning" @click="$emit('closeEditDialog')"
                    size="x-large"><v-icon>mdi-keyboard-return</v-icon></v-btn>

                <v-btn variant="text" color="error" @click="this.deleteCar"><v-icon
                        size="x-large">mdi-delete</v-icon></v-btn>
                <v-btn @click="this.edit" variant="text" color="success">
                    Salvar Alterações
                </v-btn>

            </v-card-item>

        </v-card>
        <Message :infoMessage="this.infoMessage" v-if="this.showMessage" @closeMessageDialog="this.showMessage = false" />

    </v-dialog>
</template>

<script>
import { inject } from 'vue'

import Message from '@/components/dialogs/Message.vue'
export default {
    components:{Message},
    setup() {
        const store = inject('userStore')
        store.methods.getPilots();
        store.methods.getPreparers();
        return {
            store
        }
    },
    props: ['carToEdit'],

    data() {
        return {
            dialog: true,
            car: {},
            showMessage: false,
            infoMessage: ''
        }
    },
    methods: {
        async edit() {

            await fetch('http://localhost:8081/Car/' + this.car.id, {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(this.car)
            }).then(res => {
                if (res.status === 200) {
                    this.infoMessage = 'Alterações salvas com sucesso';
                    this.showMessage = true;
                    this.store.methods.getCars();
                    setTimeout(() => {
                        this.$emit('closeEditDialog')
                    }, 1000);

                } else {
                    res.json().then(data => {
                        this.infoMessage = data.message;
                        this.showMessage = true;
                    })
                }
            }).catch(res => {
                this.infoMessage = 'Algo deu errado, tente novamente mais tarde'
                this.showMessage = true;
            })
        },

        async deleteCar() {
            await fetch('http://localhost:8081/Car/' + this.car.id, {
                method: 'DELETE',
                headers: { 'Content-type': 'application/json' },
            }).then(res => {
                if (res.status === 200) {
                    this.infoMessage = 'Carro deletado com sucesso!';
                    this.showMessage = true;
                    this.store.methods.getCars();
                    setTimeout(() => {
                        this.$emit('closeEditDialog')
                    }, 1000);

                } else {
                    res.json().then(data => {
                        this.infoMessage = data.message;
                        this.showMessage = true;
                    })
                }
            }).catch(res => {
                this.infoMessage = 'Algo deu errado, tente novamente mais tarde'
                this.showMessage = true;
            })
        }

    },
    beforeMount() {
        this.car = this.carToEdit;
    }
}

</script>