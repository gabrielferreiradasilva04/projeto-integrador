<template>
    <v-dialog v-model="dialog" persistent max-width="60%" class="h-auto w-auto" transition="dialog-transition">

        <v-card class="pa-6 border rounded-xl">
            <v-form ref="form">

                <v-text-field :rules="nameRules" name="model" label="Modelo" id="model" variant="solo-filled"
                    v-model="this.car.model"></v-text-field>

                <v-text-field :rules="nameRules" name="nickname" label="Apelido" id="nickname" variant="solo-filled"
                    v-model="this.car.nickname"></v-text-field>

                <v-text-field :rules="nameRules" name="year" label="Ano" id="year" variant="solo-filled" v-mask="'####'"
                    v-model="this.car.year"></v-text-field>

                <v-select :items="carStore.state.pilotsList" v-model="this.car.pilot" item-title="nickname" label="Piloto"
                    :rules="nameRules" return-object></v-select>

                <v-select :rules="nameRules" :items="carStore.state.preparersList" v-model="this.car.preparer" return-object
                    item-title="nickname" label="Preparador"></v-select>
                <v-btn @click="this.showPreparerRegister = true" variant="text" color="success">Adicionar
                    Preparador<v-icon>mdi-plus</v-icon></v-btn>

                <v-card-item density="comfortable" class="d-flex flex-column">
                    <v-btn color="warning" variant="text"
                        @click="$emit('closeRegister')"><v-icon>mdi-keyboard-return</v-icon></v-btn>
                    <v-btn variant="text" color="success" class="mt-2" @click="register">
                        Concluir
                    </v-btn>
                    <v-btn color="warning" variant="text" class="mt-2" @click="this.reset()">
                        Limpar Campos
                    </v-btn>

                </v-card-item>
            </v-form>
        </v-card>
        <Message :infoMessage="this.infoMessage" v-if="this.showMessage" @closeMessageDialog="this.showMessage = false" />
        <preparer-register v-if="showPreparerRegister" @closePreparerRegister="this.showPreparerRegister = false" />

    </v-dialog>
</template>

<script>
import Message from '@/components/dialogs/Message.vue'
import { mask } from 'vue-the-mask'
import { inject } from 'vue'
import PreparerRegister from '../Preparers/ChampionshipAdministratorPreparerRegister.vue'


export default {
    components: { Message, PreparerRegister },
    setup() {

        const carStore = inject('userStore')
        carStore.methods.getPreparers()
        carStore.methods.getPilots();

        return {
            carStore
        }
    },
    data() {
        return {
            nameRules: [
                v => !!v || 'Campo obrigatório',
            ],
            dialog: true,
            infoMessage: '',
            showMessage: false,
            showPreparerRegister: false,
            car: {
                model: null,
                nickname: null,
                year: '',
                pilot:null,
                preparer: null,
            }

        }
    },
    directives: {
        mask
    },
    methods: {
        async register() {
            const { valid } = await this.$refs.form.validate()
            if (valid) {
                await fetch('http://localhost:8081/Car', {
                    method: 'POST',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify(this.car)
                }).then(res => {
                    if (res.status === 201) {
                        this.infoMessage = 'Carro cadastrado com sucesso'
                        this.showMessage = true;
                        this.carStore.methods.getCars();
                        setTimeout(() => {
                            this.$emit('closeRegister');
                        }, 1000);
                    }
                    if (res.status === 404) {
                        res.json().then(data => {
                            this.infoMessage = data.message;
                            this.showMessage = true;
                        })
                    }
                }).catch(res => {
                    this.infoMessage = 'Erro inesperado, contate um administrador da casa em: +55 (41) 99624-1805'
                    this.showMessage = true;
                })
            }

        },
        reset() {
            this.$refs.form.reset()
        },
    }
}

</script>

<style scoped></style>