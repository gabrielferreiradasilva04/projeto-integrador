<template>
    <body>
        
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
    
                    <div class="combo-div">
    
                        <label for="userType"><strong>Tipo de usuário</strong></label>
                        <select name="userType" id="userType" v-model="this.user.userType" @click="this.listenerUserType">
                            <option value="" disabled selected>Tipo do usuário</option>
                            <option value="CHAMPIONSHIPADMINISTRATOR">Administrador de Campeonatos</option>
                            <option value="HOUSEMANAGER">Administrador da Casa</option>
                            <option value="BETTOR">Apostador</option>
                            <option value="TEAM">Equipe</option>
                        </select>
    
                        <label for="userUF" id="userUFLabel" style="display: none;"><strong>Estado de Administradção</strong></label>
                        <select style="display: none;" name="userUF" id="userUF" v-model="this.user.uf">
                            <option value='' disabled selected>Estado de Administração</option>
                            <option value="PR">PR</option>
                            <option value="SP">SP</option>
                            <option value="SC">SC</option>
                            <option value="RS">RS</option>
                            <option value="MS">MS</option>
                            <option value="RO">RO</option>
                            <option value="AC">AC</option>
                            <option value="AM">AM</option>
                            <option value="RR">RR</option>
                            <option value="PA">AP</option>
                            <option value="TO">TO</option>
                            <option value="MA">MA</option>
                            <option value="RN">RN</option>
                            <option value="PB">PB</option>
                            <option value="PE">PE</option>
                            <option value="AL">AL</option>
                            <option value="SE">SE</option>
                            <option value="BA">BA</option>
                            <option value="MG">MG</option>
                            <option value="RJ">RJ</option>
                            <option value="MT">RJ</option>
                            <option value="GO">GO</option>
                            <option value="DF">DF</option>
                            <option value="PI">PI</option>
                            <option value="CE">CE</option>
                            <option value="ES">ES</option>
                        </select>
    
                    </div>
    
    
    
                    <div class="button-box">
                        <input type="submit" @click="this.updateUser" value="Finalizar" id="ok">
                        <input type="submit" @click="this.deleteUser" value="Deletar" id="delete">
                    </div>
    
                </form>
    
            </div>
        </div>
    </body>
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
                userType: '',
                uf: ''
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

                    var userDate = new Date(this.user.registerDate);
                    this.registerDateFormat = userDate.toString()

                    var select = document.getElementById("userUF");
                    var labelselect = document.getElementById("userUFLabel");
                    if (this.user.userType === "CHAMPIONSHIPADMINISTRATOR") {
                        select.style.display = 'block';
                        labelselect.style.display = 'block'
                    }

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

        },
        listenerUserType(e) {
            e.preventDefault();
            var comboUserType = document.querySelector("#userType");

            comboUserType.addEventListener('click', function () {
                if (comboUserType.value === "CHAMPIONSHIPADMINISTRATOR") {
                    var select = document.getElementById("userUF");
                    var labelselect = document.getElementById("userUFLabel");
                    select.style.display = 'block';
                    labelselect.style.display = 'block'
                } else {
                    var select = document.getElementById("userUF");
                    var labelselect = document.getElementById("userUFLabel");
                    select.style.display = 'none';
                    labelselect.style.display = 'none'
                    

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
body{
    display: flex;
    justify-content: center;
    align-items: center;
}
.profile-details {

    gap: 20px;
    display: flex;
    flex-direction: column;
    width: 60%;
}
.main{
    padding-left: 20px;
    width: 100%;
    text-align: justify;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
}
.title-box{
    display: flex;
    align-items: center;
    justify-content: center;
}

.user-form {
    padding: 20px;
    gap: 10px;
    display: flex;
    flex-direction: column;
}



.combo-div {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 30%;
}

.button-box {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
}




#userType {
    border: 1px solid gray;
    border-radius: 10px;
    padding: 10px;
}

#userUF {
    border: 1px solid gray;
    border-radius: 10px;
    padding: 10px;
}
#ok{
    border: solid 2px black;
    font-size: 18px;
    color: rgb(255, 255, 255);
    background-color: rgb(33, 204, 33);
    border-radius: 10px;
    width: 10%;
}
#delete{
    border: solid 2px black;
    font-size: 18px;
    color: rgb(255, 255, 255);
    background-color: rgb(204, 73, 33);
    border-radius: 10px;
    width: 10%;
}
</style>