<template>
    <body>
        <div class="main">
            <form action="" class="users-form">
                <input type="text" name="" id="" class="userFormInput" placeholder="nome do usuario" v-model="nameToFind">
                <input type="submit" name="" id="" class="userFormInput" value="Buscar" @click="this.searchAllUsers">
            </form>
            <div class="tableUsers">
                <v-table>
                    <thead>
                        <tr>
                            <th class="text-left">
                                Nome Completo
                            </th>
                            <th class="text-left">
                                E-mail
                            </th>
                            <th class="text-left">
                                Telefone de Contato
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
                            <td>
                               <button @click="this.userEdit(user.id)">Editar</button>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
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

        userEdit(id){

            this.$router.push('/userEdit/'+id)

        }
    }

}

</script>




<style scoped>
.userFormInput {
    border: 2px black solid;
}

body {
    padding-top: 20px;
    padding-left: 20px;
}

.main {
    display: flex;
    flex-direction: column;
}
td button{
    border: 2px solid black;
    width: 100px;
    height: 25px;
}
</style>