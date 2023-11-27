<template>
    <v-dialog v-model="dialog" persistent max-width="60%" class="h-auto w-auto" transition="dialog-transition">
        <v-card class="pa-2">
            <v-form ref="form">
                <v-text-field variant="solo-filled" clearable name="nickname" label="Apelido" id="nickname" v-model="preparer.nickname"></v-text-field>
            </v-form>
            <v-card-actions>
                <v-btn color="warning" variant="text"
                    @click="$emit('closePreparerRegister')"><v-icon>mdi-keyboard-return</v-icon></v-btn>
                <v-btn variant="text" color="success" class="mt-2" @click="registerOrPut">
                    Concluir
                </v-btn>
                <v-btn color="warning" variant="text" class="mt-2" @click="this.reset">
                    Limpar Campos
                </v-btn>
            </v-card-actions>
        </v-card>
        <Message :infoMessage="this.infoMessage" v-if="this.showMessage" @closeMessageDialog="this.showMessage = false" />
    </v-dialog>
</template>
<script>
import { inject } from 'vue'
import Message from '@/components/dialogs/Message.vue'
export default {
    components:{ Message },

    setup() {
        const preparerStore = inject('userStore')
        return {
            preparerStore,
        }
    },
    data() {
        return {
            preparer: {
                nickname: null,
            },
            infoMessage: '',
            showMessage: false,
            dialog: true

        }
    },
    methods: {
        async registerOrPut() {
                await fetch('http://localhost:8081/Preparer', {
                    method: 'POST',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify(this.preparer)
                }).then(res => {
                    if (res.status === 201) {
                        this.infoMessage = 'Preparador cadastrado com sucesso'
                        this.showMessage = true;
                        this.preparerStore.methods.getPreparers();
                        setTimeout(() => {
                            this.$emit('closePreparerRegister')
                        }, 1000);
                    }
                    if(res.status === 404){
                        res.json().then(data =>{
                            this.infoMessage = data.message
                            this.showMessage = true;
                        })
                    }
                }).catch(res => {
                    this.infoMessage = 'Erro ao cadastrar verifique os dados fornecidos!'
                    this.showMessage = true;
                })
        },
        reset() {
            this.$refs.form.reset()
        },
        
    },

}


</script>