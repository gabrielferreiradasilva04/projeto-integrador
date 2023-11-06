<template>
    <div class="main">
        <div class="title-box">
            <h1>Perfil de Usuário</h1>
        </div>
        <div class="profile-details">
            <form action="" class="user-form">
                <label for="userId"><strong>Código do usuário</strong></label>
                <label for="" id="userId">{{ user.id }}</label>

                <label for="userName"><strong>Nome</strong></label>
                <label for="" id="userName">{{ user.name }}</label>

                <label for="userMail"><strong>E-mail</strong></label>
                <label for="" id="userMail">{{ user.email }}</label>

                <label for="userPhone"><strong>Telefone para contato</strong></label>
                <input type="text" name="userPhone" id="userPhone" v-model="this.user.phone">

                <label for="userDocument"><strong>CPF</strong></label>
                <label for="" id="userDocument">{{ user.document }}</label>


                <label for="registerDate"><strong>Data de ingresso</strong></label>
                <label for="" id="registerDate">{{ this.registerDateFormat }}</label>

                <label for="userType"><strong>Tipo de usuário</strong></label>

                <select name="userType" id="userType" v-model="this.user.userType">
                    <option value="0">Administrador de Campeonatos</option>
                    <option value="1">Administrador da Casa</option>
                    <option value="2">Apostador</option>
                    <option value="3">Equipe</option>
                </select>


                <div class="button-box">
                    <input type="submit" @click="this.updateUser" value="Finalizar">
                    <input type="submit" @click="this.deleteUser" value="Deletar">
                </div>

            </form>

        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            user: {
                name: null,
                document: null,
                email: null,
                password: null,
                phone: null,
                registerDate: null,
                userType: ''
            },
            registerDateFormat: null
        }
    },
    methods: {
        async getUser() {
            await fetch('http://localhost:8081/User/' + this.$route.params.id)
                .then(res => res.json())
                .then(data => {
                    this.user = data;

                    var userDate = new  Date(this.user.registerDate);
                    this.registerDateFormat = userDate.toString()
                    
                })
        },

        async updateUser(e) {

            e.preventDefault();


            await fetch('http://localhost:8081/User/' + this.$route.params.id, {

                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(this.user)

            }).then(res => {
                if (res.status === 200) {
                    alert("Usuário atualizado")
                    this.$router.push('/administrator-home')

                } else {
                    alert("Erro ao atualizar usuário")
                }

            })

        },

        async deleteUser(e) {

            e.preventDefault();


            await fetch('http://localhost:8081/User/' + this.$route.params.id, {

                method: 'DELETE',
                headers: { 'Content-type': 'application/json' },
            }).then(res => {
                if (res.status === 200) {
                    alert("Usuário deletado")

                    this.$router.push('/administrator-home')


                } else {
                    alert("Erro ao deletar usuário")
                }

            })

        }
    },
    beforeMount() {
        this.getUser();
    },


}


</script>

<style scoped>
.profile-details {

    gap: 20px;
    display: flex;
    flex-direction: column;
    width: 60%;
}

.user-form {
    padding: 20px;
    gap: 10px;
    display: flex;
    flex-direction: column;
}

.user-form input {
    border-bottom: 1px black solid;
}

.button-box {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
}



#userType {
    display: flex;
    align-items: end;
    border: 2px solid black;
    border-radius: 10px;
    padding: 10px;
}
</style>