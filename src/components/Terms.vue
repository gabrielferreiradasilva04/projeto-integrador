<template>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        width="800"
        persistent
      >
        <v-card>
          <v-card-title>
            <span class="text-h5">Termos de uso</span>
          </v-card-title>
          <v-card-text>
            <h2>1. Apostadores</h2>
            <h3>1.1 Dados do usuário.</h3>
            <p>
                Todos os dados solicitados durante o cadastro do usuário terão alguma finalidade dentro do sistema, e o
                acesso a esses dados por terceiros será impossibilitado, visando manter a privacidade e integridade dos
                dados fornecidos.
                Ao fornecer seus dados ao sistema, cada um deles contribuíra para aumentar a segurança e melhorar a
                comunidade do mesmo, por exemplo, seu e-mail será utilizado para a recuperação de suas senhas, envio de
                notificações referente a suas transações, além de receber anúncios com novidades referente ao sistema,
                seu CPF será utilizado para realizar validações referentes a sua idade e informações pessoais, visando
                manter a segurança, tanto para você quanto para os demais usuários.
            </p>
            <br />
            <h2>1.2 Apostas dentro do sistema.</h2>
            <h3>1.2.1 Realização das apostas.</h3>
            <p>
                Toda e qualquer aposta realizada dentro do sistema, somente poderá ser cancelada antes do início do
                evento referente, caso contrário a retirada do valor será impossibilitada.
                As formas de pagamento para a realização das apostas serão de acordo com a escolha do usuário, podendo
                se optar por: pix, crédito ou débito.

            </p>
            <br>
            <h3>1.2.2 Reembolso.</h3>
            <p>
                Qualquer solicitação de reembolso pode ser feita de 2 formas, no caso das apostas, pode -se solicitar o
                reembolso antes do fechamento do evento. Caso o fechamento do evento já tenha ocorrido, o reembolso pode
                ser solicitado através da “ajuda ao usuário”, onde é possível encaminhar um chamado a administração do
                sistema juntamente com anexos. Vale lembrar que seu chamado tem um prazo de 2 dias uteis para ser
                respondido.
            </p>
            <br>
            <h3>1.2.3 Campeonatos.</h3>
            <p>
                O sistema possui uma grande variedade de campeonatos realizados por todo o Brasil, sendo assim, os
                apostadores podem diversificar suas apostas em diferentes campeonatos.
            </p>
            <br>
            <h2>1.3 Dados de Pagamento</h2>
            <h3>1.3.1 Segurança.</h3>
            <p>
                Todos os seus dados de pagamento são protegidos com o objetivo que apenas você os possua e possa
                modifica-los, inclusive este é o objetivo da nossa autenticação em dois fatores ao acessar a sua conta
                pessoal, desse modo, mesmo logado no sistema, é necessário realizar a verificação do código encaminhado
                no seu e-mail para que o acesso aos extratos, contas e dados pessoais seja liberado.
            </p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green-darken-1"
              variant="text"
              @click="$emit('closeTermsDialog')"
            >
              Ok
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </template>
  <script>
  export default {
    data () {
      return {
        dialog: true,
      }
    },
  }
</script>