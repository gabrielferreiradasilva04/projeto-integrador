<template>
    <v-card  theme="dark" class="d-flex flex-row" height="100%" width="100%" variant="text">
            <v-tabs v-model="tab" direction="vertical" color="blue" class="w-auto h-100">
                <v-tab value="option-1">
                    <v-icon start size="x-large">
                        mdi-account-group
                    </v-icon>
                    Usuários
                </v-tab>
                <v-tab value="option-2">
                    <v-icon start size="x-large">
                        mdi-currency-usd
                    </v-icon>
                    Financeiro
                </v-tab>
            </v-tabs>
            <v-window v-model="tab" continuous class="w-100  ">
                <v-window-item value="option-1" >
                        <AdministratorUserSearchViewVue />
                </v-window-item>
                <v-window-item value="option-2">
                    <v-card >
                    </v-card>
                </v-window-item>
            </v-window>
    </v-card>
</template>

<script>
import AdministratorUserSearchViewVue from '@/views/Admin/HousemanagerAdministrator/AdministratorUserSearchView.vue'

export default {
    components: { AdministratorUserSearchViewVue},
    data() {
        return {
            tab: 'option-1'
        }
    }
}


</script>