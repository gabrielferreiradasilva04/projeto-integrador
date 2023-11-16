<template>
    <v-card color="indigo-darken-4">
        <div class="flex-row d-flex">
            <v-tabs v-model="tab" direction="vertical" color="primary">
                <v-tab value="option-1">
                    <v-icon start>
                        mdi-account-group
                    </v-icon>
                    Usuários
                </v-tab>
                <v-tab value="option-2">
                    <v-icon start>
                        mdi-currency-usd
                    </v-icon>
                    Financeiro
                </v-tab>
                <v-tab value="option-3">
                    <v-icon start>
                        mdi-access-point
                    </v-icon>
                    Option 3
                </v-tab>
            </v-tabs>
            <v-window v-model="tab">
                <v-window-item value="option-1">
                        <AdministratorUserSearchViewVue />

                </v-window-item>
                <v-window-item value="option-2">
                    <v-card >
                    </v-card>
                </v-window-item>
            </v-window>
        </div>
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