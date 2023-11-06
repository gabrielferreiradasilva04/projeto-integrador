<template>
    <body>
        <div class="main">
            <div class="users-form-box">
                <form action="" class="users-form">
                    <input type="text" name="" id="" class="userFormInput" placeholder="nome do usuario"
                        v-model="nameToFind">
                    <button id="search-button" @click="this.searchAllUsers">Buscar</button>
                </form>
            </div>
            <div class="tableUsers">
                <v-table class="table">
                    <thead>
                        <tr>
                            <th class="text-left">
                                Nome da Equipe
                            </th>
                            <th class="text-left">
                                E-mail da Equipe
                            </th>
                            <th class="text-left">
                                Telefone da Equipe
                            </th>
                            <th class="text-left">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.id">
                            <td>{{ user.name }}</td>
                            <td>{{ user.email }}</td>
                            <td>{{ user.phone }}</td>
                            <td>{{ user.userType }}</td>
                            <td>
                                <button @click="this.userEdit(user.id)">Editar</button>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
                <div class="button-add-div">
                    <button @click="addUser">Adicionar nova Equipe</button>
                </div>
            </div>
        </div>
    </body>
</template>
<script>

export default {
    data() {
        return {
            users: [],
            nameToFind: '',
        }
    },

    methods: {
        async searchAllUsers(e) {

            e.preventDefault();

            var userType = {
                userType: "TEAM"
            }
            if (this.nameToFind === '') {
                await fetch('http://localhost:8081/User/findUserByUserType', {
                    method: 'GET',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify(userType)
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
        userEdit(id) {

            this.$router.push('/administrator-user-edit/' + id)
        },
        addUser(e) {

            e.preventDefault();

            this.$router.push('/administrator-user-register');

        }
    }

}

</script>




<style scoped>
.userFormInput {
    border-bottom: 2px solid black;
    height: 40px;
}

body {
    padding-top: 20px;
    padding-left: 20px;
}

.main {
    display: flex;
    flex-direction: column;
}

td button {
    border: 2px solid black;
    border-radius: 10px;
    width: 100px;
    height: 25px;
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