<template>
    <v-container class="h-100">
        <v-card variant="tonal" color="light-blue-darken-2" class="rounded-x" width="100%">
            <v-card-subtitle>
                <h3>Filtros</h3>
            </v-card-subtitle>
            <v-card class="d-flex flex-row pa-2 ">

                <v-row>
                    <v-col>
                        <v-text-field theme="dark" clearable variant="solo-filled" name="name"
                            label="Nome do Usuário/Equipe" id="teamName" v-model="name"></v-text-field>

                        <v-text-field theme="dark" clearable variant="solo-filled" name="phone" label="Telefone" id="phone"
                            v-model="phone" v-mask="['(##)#####-####']"></v-text-field>

                        <v-select clearable label='Estado'
                            :items="['PR', 'SP', 'SC', 'RS', 'MS', 'RO', 'AC', 'AM', 'RR', 'PA', 'TO', 'MA', 'RN', 'PB', 'PE', 'AL', 'SE', 'BA', 'MG', 'RJ', 'MT', 'GO', 'DF', 'PI', 'CE', 'ES']"
                            variant='solo-filled' v-model="uf"></v-select>
                    </v-col>
                    <v-col>
                        <v-text-field theme="dark" clearable variant="solo-filled" name="name" label="E-mail" id="email"
                            v-model="email"></v-text-field>

                        <v-text-field theme="dark" clearable variant="solo-filled" name="name" label="CPF" id="cpf"
                            v-model="document" v-mask="['###.###.###-##']"></v-text-field>

                        <v-select clearable label='Tipo de Usuário'
                            :items="['HOUSEMANAGER', 'BETTOR', 'CHAMPIONSHIPADMINISTRATOR', 'TEAM']" variant='solo-filled'
                            v-model="userType"></v-select>
                    </v-col>
                </v-row>
            </v-card>
            <v-card-actions class="d-flex flex-column">
                <v-btn variant="tonal" class="w-100" color="success" @click="this.filter"><v-icon start size="x-large">
                        mdi-account-search
                    </v-icon>Buscar</v-btn>
            </v-card-actions>
            <br>
            <v-card>
                <v-table class="table font-h6 " max-height="500px" :fixed-header="true">
                    <thead>
                        <tr>
                            <th class="text-center">
                                Nome Completo
                            </th>
                            <th class="text-center">
                                E-mail
                            </th>
                            <th class="text-center">
                                Telefone de Contato
                            </th>
                            <th class="text-center">
                                Tipo de Usuário
                            </th>
                            <th class="text-center">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody class="text-center">
                        <tr v-for=" user  in  users " :key="user.id">
                            <td>{{ user.name }}</td>
                            <td>{{ user.email }}</td>
                            <td>{{ user.phone }}</td>
                            <td>{{ user.userType }}</td>
                            <td>
                                <v-btn variant="text" color="warning" @click="this.userEdit(user)">Editar</v-btn>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card>
            <v-btn variant="text" color="success" @click="this.showRegister = true"><v-icon size="x-large">
                    mdi-account-plus</v-icon></v-btn>
            <AdminstratorUserRegisterViewVue v-if="showRegister" @closeRegister="registerClosed" />
            <AdministratorUserEditViewVue :userToEdit="selectedUserToEdit" v-if="showEdit"
                @closeEdit="this.showEdit = false" @editClosed="this.editClosed" />
        </v-card>
        <Message :infoMessage="this.infoMessage" v-if="this.showMessage" @closeMessageDialog="this.showMessage = false" />
    </v-container>
</template>
<script>
import AdministratorUserEditViewVue from './AdministratorUserEditView.vue';
import AdminstratorUserRegisterViewVue from './AdminstratorUserRegisterView.vue';
import { mask } from 'vue-the-mask'
import Message from '@/components/dialogs/Message.vue'




export default {
    components: { AdminstratorUserRegisterViewVue, AdministratorUserEditViewVue, Message },


    data() {
        return {
            users: [],
            name: null,
            email: null,
            phone: null,
            userType: null,
            document: null,
            uf: null,
            showRegister: false,
            showEdit: false,
            selectedUserToEdit: null,
            showMessage: false,
            infoMessage: ''
        }
    },

    methods: {
        userEdit(user) {
            this.showEdit = true;
            this.selectedUserToEdit = user;
        },
        editClosed() {
            this.users = []
        },
        registerClosed() {
            this.showRegister = false;
            this.users = []

        },
        async filter() {
            if (this.name == null && this.email == null & this.phone == null && this.document == null && this.userType == null && this.uf == null) {
                this.infoMessage = 'Preencha ao menos um dos filtros acima'
                this.showMessage = true
            } else {
                var stringToFetch = 'http://localhost:8081/User/user-filter?'
                var append = '&'
                if (this.name != null) {
                    stringToFetch = stringToFetch + 'name=' + this.name + append
                }
                if (this.email != null) {
                    stringToFetch = stringToFetch + 'email=' + this.email + append
                }
                if (this.phone != null) {
                    stringToFetch = stringToFetch + 'phone=' + this.phone + append
                }
                if (this.document != null) {
                    stringToFetch = stringToFetch + 'document=' + this.document + append
                }
                if (this.userType != null) {
                    stringToFetch = stringToFetch + 'userType=' + this.userType + append
                }
                if (this.uf != null) {
                    stringToFetch = stringToFetch + 'uf=' + this.uf + append
                }


                await fetch(stringToFetch, {
                    method: 'GET',
                    headers: { 'Content-type': 'application/json' },
                }).then(res => {
                    if (res.status === 200) {
                        res.json().then(data => {
                            this.users = data;
                        })
                    }
                }).catch(res => {
                    this.infoMessage = 'Erro ao realizar pesquisa'
                    this.showMessage = true;
                })
            }

        }
    },
    directives: {
        mask
    }

}

</script>




<style scoped>
.userFormInput {
    border-bottom: 2px solid black;
    height: 40px;
}

.main {
    display: flex;
    flex-direction: column;
}



.users-form-box {
    display: flex;
    align-items: center;
    justify-content: center;
}

form {
    padding: 10px;
    display: flex;
    flex-direction: column;
    width: 60%;
    gap: 20px;
}

#search-button {
    border: 2px solid black;
    border-radius: 10px;
    width: 20%;
}

.button-add-div {
    align-items: center;
    ;
    display: flex;
    width: 100%;
    justify-content: end;
    padding-top: 40px;
    padding-right: 50px;
}

.button-add-div button {
    border: 2px black solid;
    border-radius: 20px;
    width: 250px;
    height: 35px;
    color: orange;


}
</style>