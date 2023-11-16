<template>
    <v-sheet>
        <v-card class="h-auto pa-6 d-flex flex-column w-auto" variant="text">
            <v-card class="d-flex flex-column ">
                <v-text-field theme="dark" clearable variant="solo-filled" name="name" label="Nome do Usuário/Equipe"
                    id="teamName" v-model="nameToFind"></v-text-field>
                <v-btn variant="tonal" color="success" @click="this.searchAllUsers"><v-icon start size="x-large">
                        mdi-account-search
                    </v-icon>Buscar</v-btn>
            </v-card>
            <br>
            <v-card>
                <v-table class="table font-h6" height="400px" :fixed-header="true">
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
                        <tr v-for="user in users" :key="user.id">
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
                <v-card-item class="d-flex flex-row-reverse">
                    <v-btn variant="text" color="success" @click="this.showRegister = true"><v-icon size="x-large">
                            mdi-account-plus</v-icon></v-btn>
                </v-card-item>
            </v-card>
        </v-card>
        <AdminstratorUserRegisterViewVue v-if="showRegister" @closeRegister="registerClosed" />
        <AdministratorUserEditViewVue :userToEdit="selectedUserToEdit" v-if="showEdit" @closeEdit="this.showEdit = false"
            @editClosed="this.editClosed" />
    </v-sheet>
</template>
<script>
import AdministratorUserEditViewVue from './AdministratorUserEditView.vue';
import AdminstratorUserRegisterViewVue from './AdminstratorUserRegisterView.vue';



export default {
    components: { AdminstratorUserRegisterViewVue, AdministratorUserEditViewVue },

    data() {
        return {
            users: [],
            nameToFind: '',
            showRegister: false,
            showEdit: false,
            selectedUserToEdit: null
        }
    },

    methods: {
        async searchAllUsers() {

            if (this.nameToFind === '') {
                await fetch('http://localhost:8081/User', {
                    method: 'GET',
                    headers: { 'Content-type': 'application/json' },
                }).then(res => res.json())
                    .then(data => {
                        this.users = data;

                    })
            }

            await fetch('http://localhost:8081/User/findUserByName?name=' + this.nameToFind, {
                method: 'GET',
                headers: { 'Content-type': 'application/json' },
            }).then(res => res.json())
                .then(data => {

                    this.users = data;

                })
        },
        userEdit(user) {
            this.showEdit = true;
            this.selectedUserToEdit = user;
        },
        editClosed() {
            this.searchAllUsers();
        },
        registerClosed() {
            this.showRegister = false;
            this.searchAllUsers();

        }
    },

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